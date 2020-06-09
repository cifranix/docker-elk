"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineLoginRoutes = defineLoginRoutes;

var _configSchema = require("@kbn/config-schema");

var _parse_next = require("../../../common/parse_next");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Defines routes required for the Login view.
 */
function defineLoginRoutes({
  config,
  router,
  logger,
  csp,
  basePath,
  license
}) {
  router.get({
    path: '/login',
    validate: {
      query: _configSchema.schema.object({
        next: _configSchema.schema.maybe(_configSchema.schema.string()),
        msg: _configSchema.schema.maybe(_configSchema.schema.string())
      }, {
        unknowns: 'allow'
      })
    },
    options: {
      authRequired: 'optional'
    }
  }, async (context, request, response) => {
    // Default to true if license isn't available or it can't be resolved for some reason.
    const shouldShowLogin = license.isEnabled() ? license.getFeatures().showLogin : true;
    const isUserAlreadyLoggedIn = request.auth.isAuthenticated;

    if (isUserAlreadyLoggedIn || !shouldShowLogin) {
      var _ref, _request$url;

      logger.debug('User is already authenticated, redirecting...');
      return response.redirected({
        headers: {
          location: (0, _parse_next.parseNext)((_ref = (_request$url = request.url) === null || _request$url === void 0 ? void 0 : _request$url.href) !== null && _ref !== void 0 ? _ref : '', basePath.serverBasePath)
        }
      });
    }

    return response.ok({
      body: await context.core.rendering.render({
        includeUserSettings: false
      }),
      headers: {
        'content-security-policy': csp.header
      }
    });
  });
  router.get({
    path: '/internal/security/login_state',
    validate: false,
    options: {
      authRequired: false
    }
  }, async (context, request, response) => {
    const {
      allowLogin,
      layout = 'form'
    } = license.getFeatures();
    const {
      sortedProviders,
      selector
    } = config.authc;
    let showLoginForm = false;
    const providers = [];

    for (const {
      type,
      name,
      options
    } of sortedProviders) {
      if (options.showInSelector) {
        if (type === 'basic' || type === 'token') {
          showLoginForm = true;
        } else if (selector.enabled) {
          providers.push({
            type,
            name,
            description: options.description
          });
        }
      }
    }

    const loginState = {
      allowLogin,
      layout,
      requiresSecureConnection: config.secureCookies,
      showLoginForm,
      selector: {
        enabled: selector.enabled,
        providers
      }
    };
    return response.ok({
      body: loginState
    });
  });
}