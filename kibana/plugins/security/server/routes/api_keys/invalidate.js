"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineInvalidateApiKeysRoutes = defineInvalidateApiKeysRoutes;

var _configSchema = require("@kbn/config-schema");

var _licensed_route_handler = require("../licensed_route_handler");

var _errors = require("../../errors");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineInvalidateApiKeysRoutes({
  router,
  clusterClient
}) {
  router.post({
    path: '/internal/security/api_key/invalidate',
    validate: {
      body: _configSchema.schema.object({
        apiKeys: _configSchema.schema.arrayOf(_configSchema.schema.object({
          id: _configSchema.schema.string(),
          name: _configSchema.schema.string()
        })),
        isAdmin: _configSchema.schema.boolean()
      })
    }
  }, (0, _licensed_route_handler.createLicensedRouteHandler)(async (context, request, response) => {
    try {
      const scopedClusterClient = clusterClient.asScoped(request); // Invalidate all API keys in parallel.

      const invalidationResult = (await Promise.all(request.body.apiKeys.map(async key => {
        try {
          const body = {
            id: key.id
          };

          if (!request.body.isAdmin) {
            body.owner = true;
          } // Send the request to invalidate the API key and return an error if it could not be deleted.


          await scopedClusterClient.callAsCurrentUser('shield.invalidateAPIKey', {
            body
          });
          return {
            key,
            error: undefined
          };
        } catch (error) {
          return {
            key,
            error: (0, _errors.wrapError)(error)
          };
        }
      }))).reduce((responseBody, {
        key,
        error
      }) => {
        if (error) {
          responseBody.errors.push({ ...key,
            error
          });
        } else {
          responseBody.itemsInvalidated.push(key);
        }

        return responseBody;
      }, {
        itemsInvalidated: [],
        errors: []
      });
      return response.ok({
        body: invalidationResult
      });
    } catch (error) {
      return response.customError((0, _errors.wrapIntoCustomErrorResponse)(error));
    }
  }));
}