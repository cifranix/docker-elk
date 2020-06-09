"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPutSpacesApi = initPutSpacesApi;

var _configSchema = require("@kbn/config-schema");

var _errors = require("../../../lib/errors");

var _space_schema = require("../../../lib/space_schema");

var _lib = require("../../lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initPutSpacesApi(deps) {
  const {
    externalRouter,
    spacesService,
    getSavedObjects
  } = deps;
  externalRouter.put({
    path: '/api/spaces/space/{id}',
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      }),
      body: _space_schema.spaceSchema
    }
  }, (0, _lib.createLicensedRouteHandler)(async (context, request, response) => {
    const {
      SavedObjectsClient
    } = getSavedObjects();
    const spacesClient = await spacesService.scopedClient(request);
    const space = request.body;
    const id = request.params.id;
    let result;

    try {
      result = await spacesClient.update(id, { ...space
      });
    } catch (error) {
      if (SavedObjectsClient.errors.isNotFoundError(error)) {
        return response.notFound();
      }

      return response.customError((0, _errors.wrapError)(error));
    }

    return response.ok({
      body: result
    });
  }));
}