"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OIDCAuthenticationProvider = exports.OIDCLogin = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _typeDetect = _interopRequireDefault(require("type-detect"));

var _authentication_result = require("../authentication_result");

var _can_redirect_request = require("../can_redirect_request");

var _deauthentication_result = require("../deauthentication_result");

var _http_authentication = require("../http_authentication");

var _tokens = require("../tokens");

var _base = require("./base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Describes possible OpenID Connect login flows.
 */
let OIDCLogin;
/**
 * Describes the parameters that are required by the provider to process the initial login request.
 */

exports.OIDCLogin = OIDCLogin;

(function (OIDCLogin) {
  OIDCLogin["LoginInitiatedByUser"] = "login-by-user";
  OIDCLogin["LoginWithImplicitFlow"] = "login-implicit";
  OIDCLogin["LoginWithAuthorizationCodeFlow"] = "login-authorization-code";
  OIDCLogin["LoginInitiatedBy3rdParty"] = "login-initiated-by-3rd-party";
})(OIDCLogin || (exports.OIDCLogin = OIDCLogin = {}));

/**
 * Checks whether current request can initiate new session.
 * @param request Request instance.
 */
function canStartNewSession(request) {
  // We should try to establish new session only if request requires authentication and client
  // can be redirected to the Identity Provider where they can authenticate.
  return (0, _can_redirect_request.canRedirectRequest)(request) && request.route.options.authRequired === true;
}
/**
 * Provider that supports authentication using an OpenID Connect realm in Elasticsearch.
 */


class OIDCAuthenticationProvider extends _base.BaseAuthenticationProvider {
  /**
   * Type of the provider.
   */

  /**
   * Specifies Elasticsearch OIDC realm name that Kibana should use.
   */
  constructor(options, oidcOptions) {
    super(options);
    this.options = options;

    _defineProperty(this, "realm", void 0);

    if (!oidcOptions || !oidcOptions.realm) {
      throw new Error('Realm name must be specified');
    }

    if ((0, _typeDetect.default)(oidcOptions.realm) !== 'string') {
      throw new Error('Realm must be a string');
    }

    this.realm = oidcOptions.realm;
  }
  /**
   * Performs OpenID Connect request authentication.
   * @param request Request instance.
   * @param attempt Login attempt description.
   * @param [state] Optional state object associated with the provider.
   */


  async login(request, attempt, state) {
    this.logger.debug('Trying to perform a login.'); // It may happen that Kibana is re-configured to use different realm for the same provider name,
    // we should clear such session an log user out.

    if ((state === null || state === void 0 ? void 0 : state.realm) && state.realm !== this.realm) {
      const message = `State based on realm "${state.realm}", but provider with the name "${this.options.name}" is configured to use realm "${this.realm}".`;
      this.logger.debug(message);
      return _authentication_result.AuthenticationResult.failed(_boom.default.unauthorized(message));
    }

    if (attempt.type === OIDCLogin.LoginInitiatedBy3rdParty) {
      this.logger.debug('Login has been initiated by a Third Party.'); // We might already have a state and nonce generated by Elasticsearch (from an unfinished authentication in
      // another tab)

      const oidcPrepareParams = attempt.loginHint ? {
        iss: attempt.iss,
        login_hint: attempt.loginHint
      } : {
        iss: attempt.iss
      };
      return this.initiateOIDCAuthentication(request, oidcPrepareParams, `${this.options.basePath.serverBasePath}/`);
    }

    if (attempt.type === OIDCLogin.LoginInitiatedByUser) {
      this.logger.debug(`Login has been initiated by a user.`);
      return this.initiateOIDCAuthentication(request, {
        realm: this.realm
      }, attempt.redirectURLPath);
    }

    if (attempt.type === OIDCLogin.LoginWithImplicitFlow) {
      this.logger.debug('OpenID Connect Implicit Authentication flow is used.');
    } else {
      this.logger.debug('OpenID Connect Authorization Code Authentication flow is used.');
    }

    return await this.loginWithAuthenticationResponse(request, attempt.authenticationResponseURI, state);
  }
  /**
   * Performs OpenID Connect request authentication.
   * @param request Request instance.
   * @param [state] Optional state object associated with the provider.
   */


  async authenticate(request, state) {
    this.logger.debug(`Trying to authenticate user request to ${request.url.path}.`);

    if (_http_authentication.HTTPAuthorizationHeader.parseFromRequest(request) != null) {
      this.logger.debug('Cannot authenticate requests with `Authorization` header.');
      return _authentication_result.AuthenticationResult.notHandled();
    } // It may happen that Kibana is re-configured to use different realm for the same provider name,
    // we should clear such session an log user out.


    if ((state === null || state === void 0 ? void 0 : state.realm) && state.realm !== this.realm) {
      const message = `State based on realm "${state.realm}", but provider with the name "${this.options.name}" is configured to use realm "${this.realm}".`;
      this.logger.debug(message);
      return _authentication_result.AuthenticationResult.failed(_boom.default.unauthorized(message));
    }

    let authenticationResult = _authentication_result.AuthenticationResult.notHandled();

    if (state) {
      authenticationResult = await this.authenticateViaState(request, state);

      if (authenticationResult.failed() && _tokens.Tokens.isAccessTokenExpiredError(authenticationResult.error)) {
        authenticationResult = await this.authenticateViaRefreshToken(request, state);
      }
    } // If we couldn't authenticate by means of all methods above, let's try to
    // initiate an OpenID Connect based authentication, otherwise just return the authentication result we have.
    // We might already have a state and nonce generated by Elasticsearch (from an unfinished authentication in
    // another tab)


    return authenticationResult.notHandled() && canStartNewSession(request) ? await this.initiateOIDCAuthentication(request, {
      realm: this.realm
    }) : authenticationResult;
  }
  /**
   * Attempts to handle a request that might be a third party initiated OpenID connect authentication attempt or the
   * OpenID Connect Provider redirecting back the UA after an authentication success/failure. In the former case which
   * is signified by the existence of an iss parameter (either in the query of a GET request or the body of a POST
   * request) it attempts to start the authentication flow by calling initiateOIDCAuthentication.
   *
   * In the latter case, it attempts to exchange the authentication response to an elasticsearch access token, passing
   * along to Elasticsearch the state and nonce parameters from the user's session.
   *
   * When login succeeds the elasticsearch access token and refresh token are stored in the state and user is redirected
   * to the URL that was requested before authentication flow started or to default Kibana location in case of a third
   * party initiated login
   * @param request Request instance.
   * @param authenticationResponseURI This URI contains the authentication response returned from the OP and may contain
   * authorization code that es will exchange for an ID Token in case of Authorization Code authentication flow. Or
   * id/access tokens in case of Implicit authentication flow. Elasticsearch will do all the required validation and
   * parsing for both successful and failed responses.
   * @param [sessionState] Optional state object associated with the provider.
   */


  async loginWithAuthenticationResponse(request, authenticationResponseURI, sessionState) {
    // If it is an authentication response and the users' session state doesn't contain all the necessary information,
    // then something unexpected happened and we should fail because Elasticsearch won't be able to validate the
    // response.
    const {
      nonce: stateNonce = '',
      state: stateOIDCState = '',
      nextURL: stateRedirectURL = ''
    } = sessionState || {};

    if (!stateNonce || !stateOIDCState || !stateRedirectURL) {
      const message = 'Response session state does not have corresponding state or nonce parameters or redirect URL.';
      this.logger.debug(message);
      return _authentication_result.AuthenticationResult.failed(_boom.default.badRequest(message));
    } // We have all the necessary parameters, so attempt to complete the OpenID Connect Authentication


    try {
      // This operation should be performed on behalf of the user with a privilege that normal
      // user usually doesn't have `cluster:admin/xpack/security/oidc/authenticate`.
      const {
        access_token: accessToken,
        refresh_token: refreshToken
      } = await this.options.client.callAsInternalUser('shield.oidcAuthenticate', {
        body: {
          state: stateOIDCState,
          nonce: stateNonce,
          redirect_uri: authenticationResponseURI,
          realm: this.realm
        }
      });
      this.logger.debug('Request has been authenticated via OpenID Connect.');
      return _authentication_result.AuthenticationResult.redirectTo(stateRedirectURL, {
        state: {
          accessToken,
          refreshToken,
          realm: this.realm
        }
      });
    } catch (err) {
      this.logger.debug(`Failed to authenticate request via OpenID Connect: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }
  }
  /**
   * Initiates an authentication attempt by either providing the realm name or the issuer to Elasticsearch
   *
   * @param request Request instance.
   * @param params OIDC authentication parameters.
   * @param [redirectURLPath] Optional URL user is supposed to be redirected to after successful
   * login. If not provided the URL of the specified request is used.
   */


  async initiateOIDCAuthentication(request, params, redirectURLPath = `${this.options.basePath.get(request)}${request.url.path}`) {
    this.logger.debug('Trying to initiate OpenID Connect authentication.');

    try {
      // This operation should be performed on behalf of the user with a privilege that normal
      // user usually doesn't have `cluster:admin/xpack/security/oidc/prepare`.
      const {
        state,
        nonce,
        redirect
      } = await this.options.client.callAsInternalUser('shield.oidcPrepare', {
        body: params
      });
      this.logger.debug('Redirecting to OpenID Connect Provider with authentication request.');
      return _authentication_result.AuthenticationResult.redirectTo(redirect, // Store the state and nonce parameters in the session state of the user
      {
        state: {
          state,
          nonce,
          nextURL: redirectURLPath,
          realm: this.realm
        }
      });
    } catch (err) {
      this.logger.debug(`Failed to initiate OpenID Connect authentication: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }
  }
  /**
   * Tries to extract an elasticsearch access token from state and adds it to the request before it's
   * forwarded to Elasticsearch backend.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async authenticateViaState(request, {
    accessToken
  }) {
    this.logger.debug('Trying to authenticate via state.');

    if (!accessToken) {
      this.logger.debug('Elasticsearch access token is not found in state.');
      return _authentication_result.AuthenticationResult.notHandled();
    }

    try {
      const authHeaders = {
        authorization: new _http_authentication.HTTPAuthorizationHeader('Bearer', accessToken).toString()
      };
      const user = await this.getUser(request, authHeaders);
      this.logger.debug('Request has been authenticated via state.');
      return _authentication_result.AuthenticationResult.succeeded(user, {
        authHeaders
      });
    } catch (err) {
      this.logger.debug(`Failed to authenticate request via state: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }
  }
  /**
   * This method is only called when authentication via an elasticsearch access token stored in the state failed because
   * of expired token. So we should use the elasticsearch refresh token, that is also stored in the state, to extend
   * expired elasticsearch access token and authenticate user with it.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async authenticateViaRefreshToken(request, {
    refreshToken
  }) {
    this.logger.debug('Trying to refresh elasticsearch access token.');

    if (!refreshToken) {
      this.logger.debug('Refresh token is not found in state.');
      return _authentication_result.AuthenticationResult.notHandled();
    }

    let refreshedTokenPair;

    try {
      refreshedTokenPair = await this.options.tokens.refresh(refreshToken);
    } catch (err) {
      return _authentication_result.AuthenticationResult.failed(err);
    } // When user has neither valid access nor refresh token, the only way to resolve this issue is to redirect
    // user to OpenID Connect provider, re-initiate the authentication flow and get a new access/refresh token
    // pair as result. Obviously we can't do that for AJAX requests, so we just reply with `400` and clear error
    // message. There are two reasons for `400` and not `401`: Elasticsearch search responds with `400` so it
    // seems logical to do the same on Kibana side and `401` would force user to logout and do full SLO if it's
    // supported.


    if (refreshedTokenPair === null) {
      if (canStartNewSession(request)) {
        this.logger.debug('Both elasticsearch access and refresh tokens are expired. Re-initiating OpenID Connect authentication.');
        return this.initiateOIDCAuthentication(request, {
          realm: this.realm
        });
      }

      return _authentication_result.AuthenticationResult.failed(_boom.default.badRequest('Both access and refresh tokens are expired.'));
    }

    try {
      const authHeaders = {
        authorization: new _http_authentication.HTTPAuthorizationHeader('Bearer', refreshedTokenPair.accessToken).toString()
      };
      const user = await this.getUser(request, authHeaders);
      this.logger.debug('Request has been authenticated via refreshed token.');
      return _authentication_result.AuthenticationResult.succeeded(user, {
        authHeaders,
        state: { ...refreshedTokenPair,
          realm: this.realm
        }
      });
    } catch (err) {
      this.logger.debug(`Failed to refresh elasticsearch access token: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }
  }
  /**
   * Invalidates an elasticsearch access token and refresh token that were originally created as a successful response
   * to an OpenID Connect based authentication. This does not handle OP initiated Single Logout
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async logout(request, state) {
    this.logger.debug(`Trying to log user out via ${request.url.path}.`);

    if (!state || !state.accessToken) {
      this.logger.debug('There is no elasticsearch access token to invalidate.');
      return _deauthentication_result.DeauthenticationResult.notHandled();
    }

    try {
      const logoutBody = {
        body: {
          token: state.accessToken,
          refresh_token: state.refreshToken
        }
      }; // This operation should be performed on behalf of the user with a privilege that normal
      // user usually doesn't have `cluster:admin/xpack/security/oidc/logout`.

      const {
        redirect
      } = await this.options.client.callAsInternalUser('shield.oidcLogout', logoutBody);
      this.logger.debug('User session has been successfully invalidated.'); // Having non-null `redirect` field within logout response means that the OpenID Connect realm configuration
      // supports RP initiated Single Logout and we should redirect user to the specified location in the OpenID Connect
      // Provider to properly complete logout.

      if (redirect != null) {
        this.logger.debug('Redirecting user to the OpenID Connect Provider to complete logout.');
        return _deauthentication_result.DeauthenticationResult.redirectTo(redirect);
      }

      return _deauthentication_result.DeauthenticationResult.redirectTo(`${this.options.basePath.serverBasePath}/security/logged_out`);
    } catch (err) {
      this.logger.debug(`Failed to deauthenticate user: ${err.message}`);
      return _deauthentication_result.DeauthenticationResult.failed(err);
    }
  }
  /**
   * Returns HTTP authentication scheme (`Bearer`) that's used within `Authorization` HTTP header
   * that provider attaches to all successfully authenticated requests to Elasticsearch.
   */


  getHTTPAuthenticationScheme() {
    return 'bearer';
  }

}

exports.OIDCAuthenticationProvider = OIDCAuthenticationProvider;

_defineProperty(OIDCAuthenticationProvider, "type", 'oidc');