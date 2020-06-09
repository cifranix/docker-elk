"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPostSpacesApi = initPostSpacesApi;

var _boom = _interopRequireDefault(require("boom"));

var _errors = require("../../../lib/errors");

var _space_schema = require("../../../lib/space_schema");

var _lib = require("../../lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initPostSpacesApi(deps) {
  const {
    externalRouter,
    log,
    spacesService,
    getSavedObjects
  } = deps;
  externalRouter.post({
    path: '/api/spaces/space',
    validate: {
      body: _space_schema.spaceSchema
    }
  }, (0, _lib.createLicensedRouteHandler)(async (context, request, response) => {
    log.debug(`Inside POST /api/spaces/space`);
    const {
      SavedObjectsClient
    } = getSavedObjects();
    const spacesClient = await spacesService.scopedClient(request);
    const space = request.body;

    try {
      log.debug(`Attempting to create space`);
      const createdSpace = await spacesClient.create(space);
      return response.ok({
        body: createdSpace
      });
    } catch (error) {
      if (SavedObjectsClient.errors.isConflictError(error)) {
        const {
          body
        } = (0, _errors.wrapError)(_boom.default.conflict(`A space with the identifier ${space.id} already exists.`));
        return response.conflict({
          body
        });
      }

      log.debug(`Error creating space: ${error}`);
      return response.customError((0, _errors.wrapError)(error));
    }
  }));
}