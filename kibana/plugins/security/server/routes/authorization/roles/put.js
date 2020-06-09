"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.definePutRolesRoutes = definePutRolesRoutes;

var _configSchema = require("@kbn/config-schema");

var _licensed_route_handler = require("../../licensed_route_handler");

var _errors = require("../../../errors");

var _model = require("./model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function definePutRolesRoutes({
  router,
  authz,
  clusterClient
}) {
  router.put({
    path: '/api/security/role/{name}',
    validate: {
      params: _configSchema.schema.object({
        name: _configSchema.schema.string({
          minLength: 1,
          maxLength: 1024
        })
      }),
      body: (0, _model.getPutPayloadSchema)(() => {
        const privileges = authz.privileges.get();
        return {
          global: Object.keys(privileges.global),
          space: Object.keys(privileges.space)
        };
      })
    }
  }, (0, _licensed_route_handler.createLicensedRouteHandler)(async (context, request, response) => {
    const {
      name
    } = request.params;

    try {
      const rawRoles = await clusterClient.asScoped(request).callAsCurrentUser('shield.getRole', {
        name: request.params.name,
        ignore: [404]
      });
      const body = (0, _model.transformPutPayloadToElasticsearchRole)(request.body, authz.applicationName, rawRoles[name] ? rawRoles[name].applications : []);
      await clusterClient.asScoped(request).callAsCurrentUser('shield.putRole', {
        name: request.params.name,
        body
      });
      return response.noContent();
    } catch (error) {
      return response.customError((0, _errors.wrapIntoCustomErrorResponse)(error));
    }
  }));
}