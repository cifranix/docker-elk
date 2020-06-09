"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetSpaceApi = initGetSpaceApi;

var _configSchema = require("@kbn/config-schema");

var _errors = require("../../../lib/errors");

var _lib = require("../../lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetSpaceApi(deps) {
  const {
    externalRouter,
    spacesService,
    getSavedObjects
  } = deps;
  externalRouter.get({
    path: '/api/spaces/space/{id}',
    validate: {
      params: _configSchema.schema.object({
        id: _configSchema.schema.string()
      })
    }
  }, (0, _lib.createLicensedRouteHandler)(async (context, request, response) => {
    const spaceId = request.params.id;
    const {
      SavedObjectsClient
    } = getSavedObjects();
    const spacesClient = await spacesService.scopedClient(request);

    try {
      const space = await spacesClient.get(spaceId);
      return response.ok({
        body: space
      });
    } catch (error) {
      if (SavedObjectsClient.errors.isNotFoundError(error)) {
        return response.notFound();
      }

      return response.customError((0, _errors.wrapError)(error));
    }
  }));
}