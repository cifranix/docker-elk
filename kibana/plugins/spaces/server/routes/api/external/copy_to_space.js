"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCopyToSpacesApi = initCopyToSpacesApi;

var _configSchema = require("@kbn/config-schema");

var _lodash = _interopRequireDefault(require("lodash"));

var _copy_to_spaces = require("../../../lib/copy_to_spaces");

var _copy_to_spaces2 = require("../../../lib/copy_to_spaces/copy_to_spaces");

var _space_schema = require("../../../lib/space_schema");

var _lib = require("../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const areObjectsUnique = objects => _lodash.default.uniq(objects, o => `${o.type}:${o.id}`).length === objects.length;

function initCopyToSpacesApi(deps) {
  const {
    externalRouter,
    spacesService,
    getSavedObjects
  } = deps;
  externalRouter.post({
    path: '/api/spaces/_copy_saved_objects',
    options: {
      tags: ['access:copySavedObjectsToSpaces']
    },
    validate: {
      body: _configSchema.schema.object({
        spaces: _configSchema.schema.arrayOf(_configSchema.schema.string({
          validate: value => {
            if (!_space_schema.SPACE_ID_REGEX.test(value)) {
              return `lower case, a-z, 0-9, "_", and "-" are allowed`;
            }
          }
        }), {
          validate: spaceIds => {
            if (_lodash.default.uniq(spaceIds).length !== spaceIds.length) {
              return 'duplicate space ids are not allowed';
            }
          }
        }),
        objects: _configSchema.schema.arrayOf(_configSchema.schema.object({
          type: _configSchema.schema.string(),
          id: _configSchema.schema.string()
        }), {
          validate: objects => {
            if (!areObjectsUnique(objects)) {
              return 'duplicate objects are not allowed';
            }
          }
        }),
        includeReferences: _configSchema.schema.boolean({
          defaultValue: false
        }),
        overwrite: _configSchema.schema.boolean({
          defaultValue: false
        })
      })
    }
  }, (0, _lib.createLicensedRouteHandler)(async (context, request, response) => {
    const savedObjectsClient = getSavedObjects().getScopedSavedObjectsClient(request, _copy_to_spaces2.COPY_TO_SPACES_SAVED_OBJECTS_CLIENT_OPTS);
    const copySavedObjectsToSpaces = (0, _copy_to_spaces.copySavedObjectsToSpacesFactory)(savedObjectsClient, getSavedObjects());
    const {
      spaces: destinationSpaceIds,
      objects,
      includeReferences,
      overwrite
    } = request.body;
    const sourceSpaceId = spacesService.getSpaceId(request);
    const copyResponse = await copySavedObjectsToSpaces(sourceSpaceId, destinationSpaceIds, {
      objects,
      includeReferences,
      overwrite
    });
    return response.ok({
      body: copyResponse
    });
  }));
  externalRouter.post({
    path: '/api/spaces/_resolve_copy_saved_objects_errors',
    options: {
      tags: ['access:copySavedObjectsToSpaces']
    },
    validate: {
      body: _configSchema.schema.object({
        retries: _configSchema.schema.recordOf(_configSchema.schema.string({
          validate: spaceId => {
            if (!_space_schema.SPACE_ID_REGEX.test(spaceId)) {
              return `Invalid space id: ${spaceId}`;
            }
          }
        }), _configSchema.schema.arrayOf(_configSchema.schema.object({
          type: _configSchema.schema.string(),
          id: _configSchema.schema.string(),
          overwrite: _configSchema.schema.boolean({
            defaultValue: false
          })
        }))),
        objects: _configSchema.schema.arrayOf(_configSchema.schema.object({
          type: _configSchema.schema.string(),
          id: _configSchema.schema.string()
        }), {
          validate: objects => {
            if (!areObjectsUnique(objects)) {
              return 'duplicate objects are not allowed';
            }
          }
        }),
        includeReferences: _configSchema.schema.boolean({
          defaultValue: false
        })
      })
    }
  }, (0, _lib.createLicensedRouteHandler)(async (context, request, response) => {
    const savedObjectsClient = getSavedObjects().getScopedSavedObjectsClient(request, _copy_to_spaces2.COPY_TO_SPACES_SAVED_OBJECTS_CLIENT_OPTS);
    const resolveCopySavedObjectsToSpacesConflicts = (0, _copy_to_spaces.resolveCopySavedObjectsToSpacesConflictsFactory)(savedObjectsClient, getSavedObjects());
    const {
      objects,
      includeReferences,
      retries
    } = request.body;
    const sourceSpaceId = spacesService.getSpaceId(request);
    const resolveConflictsResponse = await resolveCopySavedObjectsToSpacesConflicts(sourceSpaceId, {
      objects,
      includeReferences,
      retries
    });
    return response.ok({
      body: resolveConflictsResponse
    });
  }));
}