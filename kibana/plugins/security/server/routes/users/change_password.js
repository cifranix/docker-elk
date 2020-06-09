"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineChangeUserPasswordRoutes = defineChangeUserPasswordRoutes;

var _configSchema = require("@kbn/config-schema");

var _model = require("../../../common/model");

var _errors = require("../../errors");

var _licensed_route_handler = require("../licensed_route_handler");

var _authentication = require("../../authentication");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineChangeUserPasswordRoutes({
  authc,
  router,
  clusterClient
}) {
  router.post({
    path: '/internal/security/users/{username}/password',
    validate: {
      params: _configSchema.schema.object({
        username: _configSchema.schema.string({
          minLength: 1,
          maxLength: 1024
        })
      }),
      body: _configSchema.schema.object({
        password: _configSchema.schema.maybe(_configSchema.schema.string({
          minLength: 1
        })),
        newPassword: _configSchema.schema.string({
          minLength: 1
        })
      })
    }
  }, (0, _licensed_route_handler.createLicensedRouteHandler)(async (context, request, response) => {
    const {
      username
    } = request.params;
    const {
      password: currentPassword,
      newPassword
    } = request.body;
    const currentUser = authc.getCurrentUser(request);
    const isUserChangingOwnPassword = currentUser && currentUser.username === username && (0, _model.canUserChangePassword)(currentUser);
    const currentSession = isUserChangingOwnPassword ? await authc.getSessionInfo(request) : null; // If user is changing their own password they should provide a proof of knowledge their
    // current password via sending it in `Authorization: Basic base64(username:current password)`
    // HTTP header no matter how they logged in to Kibana.

    const scopedClusterClient = clusterClient.asScoped(isUserChangingOwnPassword ? {
      headers: { ...request.headers,
        authorization: new _authentication.HTTPAuthorizationHeader('Basic', new _authentication.BasicHTTPAuthorizationHeaderCredentials(username, currentPassword || '').toString()).toString()
      }
    } : request);

    try {
      await scopedClusterClient.callAsCurrentUser('shield.changePassword', {
        username,
        body: {
          password: newPassword
        }
      });
    } catch (error) {
      // This may happen only if user's credentials are rejected meaning that current password
      // isn't correct.
      if (isUserChangingOwnPassword && (0, _errors.getErrorStatusCode)(error) === 401) {
        return response.forbidden({
          body: error
        });
      }

      return response.customError((0, _errors.wrapIntoCustomErrorResponse)(error));
    } // If user previously had an active session and changed their own password we should re-login
    // user with the new password and update session. We check this since it's possible to update
    // password even if user is authenticated via HTTP headers and hence doesn't have an active
    // session and in such cases we shouldn't create a new one.


    if (isUserChangingOwnPassword && currentSession) {
      try {
        const authenticationResult = await authc.login(request, {
          provider: {
            name: currentUser.authentication_provider
          },
          value: {
            username,
            password: newPassword
          }
        });

        if (!authenticationResult.succeeded()) {
          return response.unauthorized({
            body: authenticationResult.error
          });
        }
      } catch (error) {
        return response.customError((0, _errors.wrapIntoCustomErrorResponse)(error));
      }
    }

    return response.noContent();
  }));
}