"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineGetRolesRoutes = defineGetRolesRoutes;

var _configSchema = require("@kbn/config-schema");

var _licensed_route_handler = require("../../licensed_route_handler");

var _errors = require("../../../errors");

var _model = require("./model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineGetRolesRoutes({
  router,
  authz,
  clusterClient
}) {
  router.get({
    path: '/api/security/role/{name}',
    validate: {
      params: _configSchema.schema.object({
        name: _configSchema.schema.string({
          minLength: 1
        })
      })
    }
  }, (0, _licensed_route_handler.createLicensedRouteHandler)(async (context, request, response) => {
    try {
      const elasticsearchRoles = await clusterClient.asScoped(request).callAsCurrentUser('shield.getRole', {
        name: request.params.name
      });
      const elasticsearchRole = elasticsearchRoles[request.params.name];

      if (elasticsearchRole) {
        return response.ok({
          body: (0, _model.transformElasticsearchRoleToRole)(elasticsearchRole, request.params.name, authz.applicationName)
        });
      }

      return response.notFound();
    } catch (error) {
      return response.customError((0, _errors.wrapIntoCustomErrorResponse)(error));
    }
  }));
}