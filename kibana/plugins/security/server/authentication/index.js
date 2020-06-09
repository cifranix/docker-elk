"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupAuthentication = setupAuthentication;
Object.defineProperty(exports, "Authenticator", {
  enumerable: true,
  get: function () {
    return _authenticator.Authenticator;
  }
});
Object.defineProperty(exports, "ProviderLoginAttempt", {
  enumerable: true,
  get: function () {
    return _authenticator.ProviderLoginAttempt;
  }
});
Object.defineProperty(exports, "CreateAPIKeyResult", {
  enumerable: true,
  get: function () {
    return _api_keys.CreateAPIKeyResult;
  }
});
Object.defineProperty(exports, "InvalidateAPIKeyResult", {
  enumerable: true,
  get: function () {
    return _api_keys.InvalidateAPIKeyResult;
  }
});
Object.defineProperty(exports, "CreateAPIKeyParams", {
  enumerable: true,
  get: function () {
    return _api_keys.CreateAPIKeyParams;
  }
});
Object.defineProperty(exports, "InvalidateAPIKeyParams", {
  enumerable: true,
  get: function () {
    return _api_keys.InvalidateAPIKeyParams;
  }
});
Object.defineProperty(exports, "GrantAPIKeyResult", {
  enumerable: true,
  get: function () {
    return _api_keys.GrantAPIKeyResult;
  }
});
Object.defineProperty(exports, "canRedirectRequest", {
  enumerable: true,
  get: function () {
    return _can_redirect_request.canRedirectRequest;
  }
});
Object.defineProperty(exports, "AuthenticationResult", {
  enumerable: true,
  get: function () {
    return _authentication_result.AuthenticationResult;
  }
});
Object.defineProperty(exports, "DeauthenticationResult", {
  enumerable: true,
  get: function () {
    return _deauthentication_result.DeauthenticationResult;
  }
});
Object.defineProperty(exports, "OIDCLogin", {
  enumerable: true,
  get: function () {
    return _providers.OIDCLogin;
  }
});
Object.defineProperty(exports, "SAMLLogin", {
  enumerable: true,
  get: function () {
    return _providers.SAMLLogin;
  }
});
Object.defineProperty(exports, "BasicHTTPAuthorizationHeaderCredentials", {
  enumerable: true,
  get: function () {
    return _http_authentication.BasicHTTPAuthorizationHeaderCredentials;
  }
});
Object.defineProperty(exports, "HTTPAuthorizationHeader", {
  enumerable: true,
  get: function () {
    return _http_authentication.HTTPAuthorizationHeader;
  }
});

var _errors = require("../errors");

var _authenticator = require("./authenticator");

var _api_keys = require("./api_keys");

var _can_redirect_request = require("./can_redirect_request");

var _authentication_result = require("./authentication_result");

var _deauthentication_result = require("./deauthentication_result");

var _providers = require("./providers");

var _http_authentication = require("./http_authentication");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function setupAuthentication({
  http,
  clusterClient,
  config,
  license,
  loggers
}) {
  const authLogger = loggers.get('authentication');
  /**
   * Retrieves server protocol name/host name/port and merges it with `xpack.security.public` config
   * to construct a server base URL (deprecated, used by the SAML provider only).
   */

  const getServerBaseURL = () => {
    const {
      protocol,
      host: hostname,
      port
    } = http.getServerInfo();
    const serverConfig = {
      protocol,
      hostname,
      port,
      ...config.public
    };
    return `${serverConfig.protocol}://${serverConfig.hostname}:${serverConfig.port}`;
  };
  /**
   * Retrieves currently authenticated user associated with the specified request.
   * @param request
   */


  const getCurrentUser = request => {
    var _http$auth$get$state;

    if (!license.isEnabled()) {
      return null;
    }

    return (_http$auth$get$state = http.auth.get(request).state) !== null && _http$auth$get$state !== void 0 ? _http$auth$get$state : null;
  };

  const isValid = sessionValue => {
    // ensure that this cookie was created with the current Kibana configuration
    const {
      path,
      idleTimeoutExpiration,
      lifespanExpiration
    } = sessionValue;

    if (path !== undefined && path !== (http.basePath.serverBasePath || '/')) {
      authLogger.debug(`Outdated session value with path "${sessionValue.path}"`);
      return false;
    } // ensure that this cookie is not expired


    if (idleTimeoutExpiration && idleTimeoutExpiration < Date.now()) {
      return false;
    } else if (lifespanExpiration && lifespanExpiration < Date.now()) {
      return false;
    }

    return true;
  };

  const authenticator = new _authenticator.Authenticator({
    clusterClient,
    basePath: http.basePath,
    config: {
      session: config.session,
      authc: config.authc
    },
    getServerBaseURL,
    loggers,
    sessionStorageFactory: await http.createCookieSessionStorageFactory({
      encryptionKey: config.encryptionKey,
      isSecure: config.secureCookies,
      name: config.cookieName,
      validate: session => {
        const array = Array.isArray(session) ? session : [session];

        for (const sess of array) {
          if (!isValid(sess)) {
            return {
              isValid: false,
              path: sess.path
            };
          }
        }

        return {
          isValid: true
        };
      }
    })
  });
  authLogger.debug('Successfully initialized authenticator.');
  http.registerAuth(async (request, response, t) => {
    // If security is disabled continue with no user credentials and delete the client cookie as well.
    if (!license.isEnabled()) {
      return t.authenticated();
    }

    let authenticationResult;

    try {
      authenticationResult = await authenticator.authenticate(request);
    } catch (err) {
      authLogger.error(err);
      return response.internalError();
    }

    if (authenticationResult.succeeded()) {
      return t.authenticated({
        state: authenticationResult.user,
        requestHeaders: authenticationResult.authHeaders,
        responseHeaders: authenticationResult.authResponseHeaders
      });
    }

    if (authenticationResult.redirected()) {
      // Some authentication mechanisms may require user to be redirected to another location to
      // initiate or complete authentication flow. It can be Kibana own login page for basic
      // authentication (username and password) or arbitrary external page managed by 3rd party
      // Identity Provider for SSO authentication mechanisms. Authentication provider is the one who
      // decides what location user should be redirected to.
      return t.redirected({
        location: authenticationResult.redirectURL
      });
    }

    if (authenticationResult.failed()) {
      authLogger.info(`Authentication attempt failed: ${authenticationResult.error.message}`);
      const error = authenticationResult.error; // proxy Elasticsearch "native" errors

      const statusCode = (0, _errors.getErrorStatusCode)(error);

      if (typeof statusCode === 'number') {
        return response.customError({
          body: error,
          statusCode,
          headers: authenticationResult.authResponseHeaders
        });
      }

      return response.unauthorized({
        headers: authenticationResult.authResponseHeaders
      });
    }

    authLogger.debug('Could not handle authentication attempt');
    return t.notHandled();
  });
  authLogger.debug('Successfully registered core authentication handler.');
  const apiKeys = new _api_keys.APIKeys({
    clusterClient,
    logger: loggers.get('api-key'),
    license
  });
  return {
    login: authenticator.login.bind(authenticator),
    logout: authenticator.logout.bind(authenticator),
    getSessionInfo: authenticator.getSessionInfo.bind(authenticator),
    isProviderTypeEnabled: authenticator.isProviderTypeEnabled.bind(authenticator),
    getCurrentUser,
    createAPIKey: (request, params) => apiKeys.create(request, params),
    grantAPIKeyAsInternalUser: request => apiKeys.grantAsInternalUser(request),
    invalidateAPIKey: (request, params) => apiKeys.invalidate(request, params),
    invalidateAPIKeyAsInternalUser: params => apiKeys.invalidateAsInternalUser(params),
    isAuthenticated: request => http.auth.isAuthenticated(request)
  };
}