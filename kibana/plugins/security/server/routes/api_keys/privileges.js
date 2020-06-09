"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineCheckPrivilegesRoutes = defineCheckPrivilegesRoutes;

var _errors = require("../../errors");

var _licensed_route_handler = require("../licensed_route_handler");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineCheckPrivilegesRoutes({
  router,
  clusterClient
}) {
  router.get({
    path: '/internal/security/api_key/privileges',
    validate: false
  }, (0, _licensed_route_handler.createLicensedRouteHandler)(async (context, request, response) => {
    try {
      const scopedClusterClient = clusterClient.asScoped(request);
      const [{
        cluster: {
          manage_security: manageSecurity,
          manage_api_key: manageApiKey
        }
      }, {
        areApiKeysEnabled
      }] = await Promise.all([scopedClusterClient.callAsCurrentUser('shield.hasPrivileges', {
        body: {
          cluster: ['manage_security', 'manage_api_key']
        }
      }), scopedClusterClient.callAsCurrentUser('shield.getAPIKeys', {
        owner: true
      }).then( //  If the API returns a truthy result that means it's enabled.
      result => ({
        areApiKeysEnabled: !!result
      }), // This is a brittle dependency upon message. Tracked by https://github.com/elastic/elasticsearch/issues/47759.
      e => e.message.includes('api keys are not enabled') ? Promise.resolve({
        areApiKeysEnabled: false
      }) : Promise.reject(e))]);
      return response.ok({
        body: {
          areApiKeysEnabled,
          isAdmin: manageSecurity || manageApiKey
        }
      });
    } catch (error) {
      return response.customError((0, _errors.wrapIntoCustomErrorResponse)(error));
    }
  }));
}