"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineSAMLRoutes = defineSAMLRoutes;

var _configSchema = require("@kbn/config-schema");

var _authentication = require("../../authentication");

var _providers = require("../../authentication/providers");

var _ = require(".");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Defines routes required for SAML authentication.
 */
function defineSAMLRoutes({
  router,
  logger,
  authc,
  csp,
  basePath
}) {
  router.get({
    path: '/internal/security/saml/capture-url-fragment',
    validate: false,
    options: {
      authRequired: false
    }
  }, (context, request, response) => {
    // We're also preventing `favicon.ico` request since it can cause new SAML handshake.
    return response.custom((0, _.createCustomResourceResponse)(`
          <!DOCTYPE html>
          <title>Kibana SAML Login</title>
          <link rel="icon" href="data:,">
          <script src="${basePath.serverBasePath}/internal/security/saml/capture-url-fragment.js"></script>
        `, 'text/html', csp.header));
  });
  router.get({
    path: '/internal/security/saml/capture-url-fragment.js',
    validate: false,
    options: {
      authRequired: false
    }
  }, (context, request, response) => {
    return response.custom((0, _.createCustomResourceResponse)(`
          window.location.replace(
            '${basePath.serverBasePath}/internal/security/saml/start?redirectURLFragment=' + encodeURIComponent(window.location.hash)
          );
        `, 'text/javascript', csp.header));
  });
  router.get({
    path: '/internal/security/saml/start',
    validate: {
      query: _configSchema.schema.object({
        redirectURLFragment: _configSchema.schema.string()
      })
    },
    options: {
      authRequired: false
    }
  }, async (context, request, response) => {
    try {
      const authenticationResult = await authc.login(request, {
        provider: {
          type: _providers.SAMLAuthenticationProvider.type
        },
        value: {
          type: _authentication.SAMLLogin.LoginInitiatedByUser,
          redirectURLFragment: request.query.redirectURLFragment
        }
      }); // When authenticating using SAML we _expect_ to redirect to the SAML Identity provider.

      if (authenticationResult.redirected()) {
        return response.redirected({
          headers: {
            location: authenticationResult.redirectURL
          }
        });
      }

      return response.unauthorized();
    } catch (err) {
      logger.error(err);
      return response.internalError();
    }
  }); // Generate two identical routes with new and deprecated URL and issue a warning if route with
  // deprecated URL is ever used.

  for (const path of ['/api/security/saml/callback', '/api/security/v1/saml']) {
    router.post({
      path,
      validate: {
        body: _configSchema.schema.object({
          SAMLResponse: _configSchema.schema.string(),
          RelayState: _configSchema.schema.maybe(_configSchema.schema.string())
        })
      },
      options: {
        authRequired: false,
        xsrfRequired: false
      }
    }, async (context, request, response) => {
      if (path === '/api/security/v1/saml') {
        const serverBasePath = basePath.serverBasePath;
        logger.warn(`The "${serverBasePath}${path}" URL is deprecated and will stop working in the next major version, please use "${serverBasePath}/api/security/saml/callback" URL instead.`, {
          tags: ['deprecation']
        });
      }

      try {
        // When authenticating using SAML we _expect_ to redirect to the Kibana target location.
        const authenticationResult = await authc.login(request, {
          provider: {
            type: _providers.SAMLAuthenticationProvider.type
          },
          value: {
            type: _authentication.SAMLLogin.LoginWithSAMLResponse,
            samlResponse: request.body.SAMLResponse
          }
        });

        if (authenticationResult.redirected()) {
          return response.redirected({
            headers: {
              location: authenticationResult.redirectURL
            }
          });
        }

        return response.unauthorized({
          body: authenticationResult.error
        });
      } catch (err) {
        logger.error(err);
        return response.internalError();
      }
    });
  }
}