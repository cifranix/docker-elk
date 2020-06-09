"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineBasicRoutes = defineBasicRoutes;

var _configSchema = require("@kbn/config-schema");

var _errors = require("../../errors");

var _licensed_route_handler = require("../licensed_route_handler");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Defines routes required for Basic/Token authentication.
 */
function defineBasicRoutes({
  router,
  authc,
  config
}) {
  router.post({
    path: '/internal/security/login',
    validate: {
      body: _configSchema.schema.object({
        username: _configSchema.schema.string({
          minLength: 1
        }),
        password: _configSchema.schema.string({
          minLength: 1
        })
      })
    },
    options: {
      authRequired: false
    }
  }, (0, _licensed_route_handler.createLicensedRouteHandler)(async (context, request, response) => {
    // We should prefer `token` over `basic` if possible.
    const loginAttempt = {
      provider: {
        type: authc.isProviderTypeEnabled('token') ? 'token' : 'basic'
      },
      value: request.body
    };

    try {
      const authenticationResult = await authc.login(request, loginAttempt);

      if (!authenticationResult.succeeded()) {
        return response.unauthorized({
          body: authenticationResult.error
        });
      }

      return response.noContent();
    } catch (error) {
      return response.customError((0, _errors.wrapIntoCustomErrorResponse)(error));
    }
  }));
}