"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Authenticator = void 0;

var _server = require("../../../../../src/core/server");

var _errors = require("../errors");

var _providers = require("./providers");

var _authentication_result = require("./authentication_result");

var _deauthentication_result = require("./deauthentication_result");

var _tokens = require("./tokens");

var _can_redirect_request = require("./can_redirect_request");

var _http_authentication = require("./http_authentication");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Mapping between provider key defined in the config and authentication
// provider class that can handle specific authentication mechanism.
const providerMap = new Map([[_providers.BasicAuthenticationProvider.type, _providers.BasicAuthenticationProvider], [_providers.KerberosAuthenticationProvider.type, _providers.KerberosAuthenticationProvider], [_providers.SAMLAuthenticationProvider.type, _providers.SAMLAuthenticationProvider], [_providers.TokenAuthenticationProvider.type, _providers.TokenAuthenticationProvider], [_providers.OIDCAuthenticationProvider.type, _providers.OIDCAuthenticationProvider], [_providers.PKIAuthenticationProvider.type, _providers.PKIAuthenticationProvider]]);

function assertRequest(request) {
  if (!(request instanceof _server.KibanaRequest)) {
    throw new Error(`Request should be a valid "KibanaRequest" instance, was [${typeof request}].`);
  }
}

function assertLoginAttempt(attempt) {
  if (!isLoginAttemptWithProviderType(attempt) && !isLoginAttemptWithProviderName(attempt)) {
    throw new Error('Login attempt should be an object with non-empty "provider.type" or "provider.name" property.');
  }
}

function isLoginAttemptWithProviderName(attempt) {
  var _ref, _ref$provider, _ref2, _ref2$provider;

  return typeof attempt === 'object' && ((_ref = attempt) === null || _ref === void 0 ? void 0 : (_ref$provider = _ref.provider) === null || _ref$provider === void 0 ? void 0 : _ref$provider.name) && typeof ((_ref2 = attempt) === null || _ref2 === void 0 ? void 0 : (_ref2$provider = _ref2.provider) === null || _ref2$provider === void 0 ? void 0 : _ref2$provider.name) === 'string';
}

function isLoginAttemptWithProviderType(attempt) {
  var _ref3, _ref3$provider, _ref4, _ref4$provider;

  return typeof attempt === 'object' && ((_ref3 = attempt) === null || _ref3 === void 0 ? void 0 : (_ref3$provider = _ref3.provider) === null || _ref3$provider === void 0 ? void 0 : _ref3$provider.type) && typeof ((_ref4 = attempt) === null || _ref4 === void 0 ? void 0 : (_ref4$provider = _ref4.provider) === null || _ref4$provider === void 0 ? void 0 : _ref4$provider.type) === 'string';
}
/**
 * Determines if session value was created by the previous Kibana versions which had a different
 * session value format.
 * @param sessionValue The session value to check.
 */


function isLegacyProviderSession(sessionValue) {
  return typeof (sessionValue === null || sessionValue === void 0 ? void 0 : sessionValue.provider) === 'string';
}
/**
 * Instantiates authentication provider based on the provider key from config.
 * @param providerType Provider type key.
 * @param options Options to pass to provider's constructor.
 * @param providerSpecificOptions Options that are specific to {@param providerType}.
 */


function instantiateProvider(providerType, options, providerSpecificOptions) {
  const ProviderClassName = providerMap.get(providerType);

  if (!ProviderClassName) {
    throw new Error(`Unsupported authentication provider name: ${providerType}.`);
  }

  return new ProviderClassName(options, providerSpecificOptions);
}
/**
 * Authenticator is responsible for authentication of the request using chain of
 * authentication providers. The chain is essentially a prioritized list of configured
 * providers (typically of various types). The order of the list determines the order in
 * which the providers will be consulted. During the authentication process, Authenticator
 * will try to authenticate the request via one provider at a time. Once one of the
 * providers successfully authenticates the request, the authentication is considered
 * to be successful and the authenticated user will be associated with the request.
 * If provider cannot authenticate the request, the next in line provider in the chain
 * will be used. If all providers in the chain could not authenticate the request,
 * the authentication is then considered to be unsuccessful and an authentication error
 * will be returned.
 */


class Authenticator {
  /**
   * List of configured and instantiated authentication providers.
   */

  /**
   * Which base path the HTTP server is hosted on.
   */

  /**
   * Session timeout in ms. If `null` session will stay active until the browser is closed.
   */

  /**
   * Session max lifespan in ms. If `null` session may live indefinitely.
   */

  /**
   * Internal authenticator logger.
   */

  /**
   * Instantiates Authenticator and bootstrap configured providers.
   * @param options Authenticator options.
   */
  constructor(options) {
    this.options = options;

    _defineProperty(this, "providers", void 0);

    _defineProperty(this, "serverBasePath", void 0);

    _defineProperty(this, "idleTimeout", null);

    _defineProperty(this, "lifespan", null);

    _defineProperty(this, "logger", void 0);

    this.logger = options.loggers.get('authenticator');
    const providerCommonOptions = {
      client: this.options.clusterClient,
      basePath: this.options.basePath,
      tokens: new _tokens.Tokens({
        client: this.options.clusterClient,
        logger: this.options.loggers.get('tokens')
      }),
      getServerBaseURL: this.options.getServerBaseURL
    };
    this.providers = new Map(this.options.config.authc.sortedProviders.map(({
      type,
      name
    }) => {
      var _this$options$config$;

      this.logger.debug(`Enabling "${name}" (${type}) authentication provider.`);
      return [name, instantiateProvider(type, Object.freeze({ ...providerCommonOptions,
        name,
        logger: options.loggers.get(type, name)
      }), (_this$options$config$ = this.options.config.authc.providers[type]) === null || _this$options$config$ === void 0 ? void 0 : _this$options$config$[name])];
    })); // For the BWC reasons we always include HTTP authentication provider unless it's explicitly disabled.

    if (this.options.config.authc.http.enabled) {
      this.setupHTTPAuthenticationProvider(Object.freeze({ ...providerCommonOptions,
        name: '__http__',
        logger: options.loggers.get(_providers.HTTPAuthenticationProvider.type)
      }));
    }

    if (this.providers.size === 0) {
      throw new Error('No authentication provider is configured. Verify `xpack.security.authc.*` config value.');
    }

    this.serverBasePath = this.options.basePath.serverBasePath || '/';
    this.idleTimeout = this.options.config.session.idleTimeout;
    this.lifespan = this.options.config.session.lifespan;
  }
  /**
   * Performs the initial login request using the provider login attempt description.
   * @param request Request instance.
   * @param attempt Login attempt description.
   */


  async login(request, attempt) {
    assertRequest(request);
    assertLoginAttempt(attempt);
    const sessionStorage = this.options.sessionStorageFactory.asScoped(request);
    const existingSession = await this.getSessionValue(sessionStorage); // Login attempt can target specific provider by its name (e.g. chosen at the Login Selector UI)
    // or a group of providers with the specified type (e.g. in case of 3rd-party initiated login
    // attempts we may not know what provider exactly can handle that attempt and we have to try
    // every enabled provider of the specified type).

    const providers = isLoginAttemptWithProviderName(attempt) && this.providers.has(attempt.provider.name) ? [[attempt.provider.name, this.providers.get(attempt.provider.name)]] : isLoginAttemptWithProviderType(attempt) ? [...this.providerIterator(existingSession)].filter(([, {
      type
    }]) => type === attempt.provider.type) : [];

    if (providers.length === 0) {
      this.logger.debug(`Login attempt for provider with ${isLoginAttemptWithProviderName(attempt) ? `name ${attempt.provider.name}` : `type "${attempt.provider.type}"`} is detected, but it isn't enabled.`);
      return _authentication_result.AuthenticationResult.notHandled();
    }

    for (const [providerName, provider] of providers) {
      // Check if current session has been set by this provider.
      const ownsSession = (existingSession === null || existingSession === void 0 ? void 0 : existingSession.provider.name) === providerName && (existingSession === null || existingSession === void 0 ? void 0 : existingSession.provider.type) === provider.type;
      const authenticationResult = await provider.login(request, attempt.value, ownsSession ? existingSession.state : null);
      this.updateSessionValue(sessionStorage, {
        provider: {
          type: provider.type,
          name: providerName
        },
        isSystemRequest: request.isSystemRequest,
        authenticationResult,
        existingSession: ownsSession ? existingSession : null
      });

      if (!authenticationResult.notHandled()) {
        return authenticationResult;
      }
    }

    return _authentication_result.AuthenticationResult.notHandled();
  }
  /**
   * Performs request authentication using configured chain of authentication providers.
   * @param request Request instance.
   */


  async authenticate(request) {
    assertRequest(request);
    const sessionStorage = this.options.sessionStorageFactory.asScoped(request);
    const existingSession = await this.getSessionValue(sessionStorage); // If request doesn't have any session information, isn't attributed with HTTP Authorization
    // header and Login Selector is enabled, we must redirect user to the login selector.

    const useLoginSelector = !existingSession && this.options.config.authc.selector.enabled && (0, _can_redirect_request.canRedirectRequest)(request) && _http_authentication.HTTPAuthorizationHeader.parseFromRequest(request) == null;

    if (useLoginSelector) {
      this.logger.debug('Redirecting request to Login Selector.');
      return _authentication_result.AuthenticationResult.redirectTo(`${this.options.basePath.serverBasePath}/login?next=${encodeURIComponent(`${this.options.basePath.get(request)}${request.url.path}`)}`);
    }

    for (const [providerName, provider] of this.providerIterator(existingSession)) {
      // Check if current session has been set by this provider.
      const ownsSession = (existingSession === null || existingSession === void 0 ? void 0 : existingSession.provider.name) === providerName && (existingSession === null || existingSession === void 0 ? void 0 : existingSession.provider.type) === provider.type;
      const authenticationResult = await provider.authenticate(request, ownsSession ? existingSession.state : null);
      this.updateSessionValue(sessionStorage, {
        provider: {
          type: provider.type,
          name: providerName
        },
        isSystemRequest: request.isSystemRequest,
        authenticationResult,
        existingSession: ownsSession ? existingSession : null
      });

      if (!authenticationResult.notHandled()) {
        return authenticationResult;
      }
    }

    return _authentication_result.AuthenticationResult.notHandled();
  }
  /**
   * Deauthenticates current request.
   * @param request Request instance.
   */


  async logout(request) {
    assertRequest(request);
    const sessionStorage = this.options.sessionStorageFactory.asScoped(request);
    const sessionValue = await this.getSessionValue(sessionStorage);

    if (sessionValue) {
      sessionStorage.clear();
      return this.providers.get(sessionValue.provider.name).logout(request, sessionValue.state);
    }

    const providerName = this.getProviderName(request.query);

    if (providerName) {
      // provider name is passed in a query param and sourced from the browser's local storage;
      // hence, we can't assume that this provider exists, so we have to check it
      const provider = this.providers.get(providerName);

      if (provider) {
        return provider.logout(request, null);
      }
    } else {
      // In case logout is called and we cannot figure out what provider is supposed to handle it,
      // we should iterate through all providers and let them decide if they can perform a logout.
      // This can be necessary if some 3rd-party initiates logout. And even if user doesn't have an
      // active session already some providers can still properly respond to the 3rd-party logout
      // request. For example SAML provider can process logout request encoded in `SAMLRequest`
      // query string parameter.
      for (const [, provider] of this.providerIterator(null)) {
        const deauthenticationResult = await provider.logout(request);

        if (!deauthenticationResult.notHandled()) {
          return deauthenticationResult;
        }
      }
    }

    return _deauthentication_result.DeauthenticationResult.notHandled();
  }
  /**
   * Returns session information for the current request.
   * @param request Request instance.
   */


  async getSessionInfo(request) {
    assertRequest(request);
    const sessionStorage = this.options.sessionStorageFactory.asScoped(request);
    const sessionValue = await this.getSessionValue(sessionStorage);

    if (sessionValue) {
      // We can't rely on the client's system clock, so in addition to returning expiration timestamps, we also return
      // the current server time -- that way the client can calculate the relative time to expiration.
      return {
        now: Date.now(),
        idleTimeoutExpiration: sessionValue.idleTimeoutExpiration,
        lifespanExpiration: sessionValue.lifespanExpiration,
        provider: sessionValue.provider.name
      };
    }

    return null;
  }
  /**
   * Checks whether specified provider type is currently enabled.
   * @param providerType Type of the provider (`basic`, `saml`, `pki` etc.).
   */


  isProviderTypeEnabled(providerType) {
    return [...this.providers.values()].some(provider => provider.type === providerType);
  }
  /**
   * Initializes HTTP Authentication provider and appends it to the end of the list of enabled
   * authentication providers.
   * @param options Common provider options.
   */


  setupHTTPAuthenticationProvider(options) {
    const supportedSchemes = new Set(this.options.config.authc.http.schemes.map(scheme => scheme.toLowerCase())); // If `autoSchemesEnabled` is set we should allow schemes that other providers use to
    // authenticate requests with Elasticsearch.

    if (this.options.config.authc.http.autoSchemesEnabled) {
      for (const provider of this.providers.values()) {
        const supportedScheme = provider.getHTTPAuthenticationScheme();

        if (supportedScheme) {
          supportedSchemes.add(supportedScheme.toLowerCase());
        }
      }
    }

    if (this.providers.has(options.name)) {
      throw new Error(`Provider name "${options.name}" is reserved.`);
    }

    this.providers.set(options.name, new _providers.HTTPAuthenticationProvider(options, {
      supportedSchemes
    }));
  }
  /**
   * Returns provider iterator where providers are sorted in the order of priority (based on the session ownership).
   * @param sessionValue Current session value.
   */


  *providerIterator(sessionValue) {
    // If there is no session to predict which provider to use first, let's use the order
    // providers are configured in. Otherwise return provider that owns session first, and only then the rest
    // of providers.
    if (!sessionValue) {
      yield* this.providers;
    } else {
      yield [sessionValue.provider.name, this.providers.get(sessionValue.provider.name)];

      for (const [providerName, provider] of this.providers) {
        if (providerName !== sessionValue.provider.name) {
          yield [providerName, provider];
        }
      }
    }
  }
  /**
   * Extracts session value for the specified request. Under the hood it can
   * clear session if it belongs to the provider that is not available.
   * @param sessionStorage Session storage instance.
   */


  async getSessionValue(sessionStorage) {
    var _this$providers$get;

    const sessionValue = await sessionStorage.get(); // If we detect that session is in incompatible format or for some reason we have a session
    // stored for the provider that is not available anymore (e.g. when user was logged in with one
    // provider, but then configuration has changed and that provider is no longer available), then
    // we should clear session entirely.

    if (sessionValue && (isLegacyProviderSession(sessionValue) || ((_this$providers$get = this.providers.get(sessionValue.provider.name)) === null || _this$providers$get === void 0 ? void 0 : _this$providers$get.type) !== sessionValue.provider.type)) {
      sessionStorage.clear();
      return null;
    }

    return sessionValue;
  }

  updateSessionValue(sessionStorage, {
    provider,
    authenticationResult,
    existingSession,
    isSystemRequest
  }) {
    if (!existingSession && !authenticationResult.shouldUpdateState()) {
      return;
    } // If authentication succeeds or requires redirect we should automatically extend existing user session,
    // unless authentication has been triggered by a system API request. In case provider explicitly returns new
    // state we should store it in the session regardless of whether it's a system API request or not.


    const sessionCanBeUpdated = (authenticationResult.succeeded() || authenticationResult.redirected()) && (authenticationResult.shouldUpdateState() || !isSystemRequest); // If provider owned the session, but failed to authenticate anyway, that likely means that
    // session is not valid and we should clear it. Also provider can specifically ask to clear
    // session by setting it to `null` even if authentication attempt didn't fail.

    if (authenticationResult.shouldClearState() || authenticationResult.failed() && (0, _errors.getErrorStatusCode)(authenticationResult.error) === 401) {
      sessionStorage.clear();
    } else if (sessionCanBeUpdated) {
      const {
        idleTimeoutExpiration,
        lifespanExpiration
      } = this.calculateExpiry(existingSession);
      sessionStorage.set({
        state: authenticationResult.shouldUpdateState() ? authenticationResult.state : existingSession.state,
        provider,
        idleTimeoutExpiration,
        lifespanExpiration,
        path: this.serverBasePath
      });
    }
  }

  getProviderName(query) {
    if (query && query.provider && typeof query.provider === 'string') {
      return query.provider;
    }

    return null;
  }

  calculateExpiry(existingSession) {
    const now = Date.now(); // if we are renewing an existing session, use its `lifespanExpiration` -- otherwise, set this value
    // based on the configured server `lifespan`.
    // note, if the server had a `lifespan` set and then removes it, remove `lifespanExpiration` on renewed sessions
    // also, if the server did not have a `lifespan` set and then adds it, add `lifespanExpiration` on renewed sessions

    const lifespanExpiration = (existingSession === null || existingSession === void 0 ? void 0 : existingSession.lifespanExpiration) && this.lifespan ? existingSession.lifespanExpiration : this.lifespan && now + this.lifespan.asMilliseconds();
    const idleTimeoutExpiration = this.idleTimeout && now + this.idleTimeout.asMilliseconds();
    return {
      idleTimeoutExpiration,
      lifespanExpiration
    };
  }

}

exports.Authenticator = Authenticator;