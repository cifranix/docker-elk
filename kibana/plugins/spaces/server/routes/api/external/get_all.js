"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetAllSpacesApi = initGetAllSpacesApi;

var _configSchema = require("@kbn/config-schema");

var _errors = require("../../../lib/errors");

var _lib = require("../../lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetAllSpacesApi(deps) {
  const {
    externalRouter,
    log,
    spacesService
  } = deps;
  externalRouter.get({
    path: '/api/spaces/space',
    validate: {
      query: _configSchema.schema.object({
        purpose: _configSchema.schema.oneOf([_configSchema.schema.literal('any'), _configSchema.schema.literal('copySavedObjectsIntoSpace')], {
          defaultValue: 'any'
        })
      })
    }
  }, (0, _lib.createLicensedRouteHandler)(async (context, request, response) => {
    log.debug(`Inside GET /api/spaces/space`);
    const purpose = request.query.purpose;
    const spacesClient = await spacesService.scopedClient(request);
    let spaces;

    try {
      log.debug(`Attempting to retrieve all spaces for ${purpose} purpose`);
      spaces = await spacesClient.getAll(purpose);
      log.debug(`Retrieved ${spaces.length} spaces for ${purpose} purpose`);
    } catch (error) {
      log.debug(`Error retrieving spaces for ${purpose} purpose: ${error}`);
      return response.customError((0, _errors.wrapError)(error));
    }

    return response.ok({
      body: spaces
    });
  }));
}