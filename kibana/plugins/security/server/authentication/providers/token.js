"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenAuthenticationProvider = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _authentication_result = require("../authentication_result");

var _deauthentication_result = require("../deauthentication_result");

var _can_redirect_request = require("../can_redirect_request");

var _http_authentication = require("../http_authentication");

var _tokens = require("../tokens");

var _base = require("./base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Checks whether current request can initiate new session.
 * @param request Request instance.
 */
function canStartNewSession(request) {
  // We should try to establish new session only if request requires authentication and client
  // can be redirected to the login page where they can enter username and password.
  return (0, _can_redirect_request.canRedirectRequest)(request) && request.route.options.authRequired === true;
}
/**
 * Provider that supports token-based request authentication.
 */


class TokenAuthenticationProvider extends _base.BaseAuthenticationProvider {
  /**
   * Type of the provider.
   */

  /**
   * Performs initial login request using username and password.
   * @param request Request instance.
   * @param attempt User credentials.
   * @param [state] Optional state object associated with the provider.
   */
  async login(request, {
    username,
    password
  }, state) {
    this.logger.debug('Trying to perform a login.');

    try {
      // First attempt to exchange login credentials for an access token
      const {
        access_token: accessToken,
        refresh_token: refreshToken
      } = await this.options.client.callAsInternalUser('shield.getAccessToken', {
        body: {
          grant_type: 'password',
          username,
          password
        }
      });
      this.logger.debug('Get token API request to Elasticsearch successful'); // Then attempt to query for the user details using the new token

      const authHeaders = {
        authorization: new _http_authentication.HTTPAuthorizationHeader('Bearer', accessToken).toString()
      };
      const user = await this.getUser(request, authHeaders);
      this.logger.debug('Login has been successfully performed.');
      return _authentication_result.AuthenticationResult.succeeded(user, {
        authHeaders,
        state: {
          accessToken,
          refreshToken
        }
      });
    } catch (err) {
      this.logger.debug(`Failed to perform a login: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }
  }
  /**
   * Performs token-based request authentication
   * @param request Request instance.
   * @param [state] Optional state object associated with the provider.
   */


  async authenticate(request, state) {
    this.logger.debug(`Trying to authenticate user request to ${request.url.path}.`);

    if (_http_authentication.HTTPAuthorizationHeader.parseFromRequest(request) != null) {
      this.logger.debug('Cannot authenticate requests with `Authorization` header.');
      return _authentication_result.AuthenticationResult.notHandled();
    }

    let authenticationResult = _authentication_result.AuthenticationResult.notHandled();

    if (state) {
      authenticationResult = await this.authenticateViaState(request, state);

      if (authenticationResult.failed() && _tokens.Tokens.isAccessTokenExpiredError(authenticationResult.error)) {
        authenticationResult = await this.authenticateViaRefreshToken(request, state);
      }
    } // finally, if authentication still can not be handled for this
    // request/state combination, redirect to the login page if appropriate


    if (authenticationResult.notHandled() && canStartNewSession(request)) {
      this.logger.debug('Redirecting request to Login page.');
      authenticationResult = _authentication_result.AuthenticationResult.redirectTo(this.getLoginPageURL(request));
    }

    return authenticationResult;
  }
  /**
   * Redirects user to the login page preserving query string parameters.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async logout(request, state) {
    this.logger.debug(`Trying to log user out via ${request.url.path}.`);

    if (!state) {
      this.logger.debug('There are no access and refresh tokens to invalidate.');
      return _deauthentication_result.DeauthenticationResult.notHandled();
    }

    this.logger.debug('Token-based logout has been initiated by the user.');

    try {
      await this.options.tokens.invalidate(state);
    } catch (err) {
      this.logger.debug(`Failed invalidating user's access token: ${err.message}`);
      return _deauthentication_result.DeauthenticationResult.failed(err);
    }

    const queryString = request.url.search || `?msg=LOGGED_OUT`;
    return _deauthentication_result.DeauthenticationResult.redirectTo(`${this.options.basePath.get(request)}/login${queryString}`);
  }
  /**
   * Returns HTTP authentication scheme (`Bearer`) that's used within `Authorization` HTTP header
   * that provider attaches to all successfully authenticated requests to Elasticsearch.
   */


  getHTTPAuthenticationScheme() {
    return 'bearer';
  }
  /**
   * Tries to extract authorization header from the state and adds it to the request before
   * it's forwarded to Elasticsearch backend.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async authenticateViaState(request, {
    accessToken
  }) {
    this.logger.debug('Trying to authenticate via state.');

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
   * This method is only called when authentication via access token stored in the state failed because of expired
   * token. So we should use refresh token, that is also stored in the state, to extend expired access token and
   * authenticate user with it.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async authenticateViaRefreshToken(request, {
    refreshToken
  }) {
    this.logger.debug('Trying to refresh access token.');
    let refreshedTokenPair;

    try {
      refreshedTokenPair = await this.options.tokens.refresh(refreshToken);
    } catch (err) {
      return _authentication_result.AuthenticationResult.failed(err);
    } // If refresh token is no longer valid, then we should clear session and redirect user to the
    // login page to re-authenticate, or fail if redirect isn't possible.


    if (refreshedTokenPair === null) {
      if (canStartNewSession(request)) {
        this.logger.debug('Clearing session since both access and refresh tokens are expired.'); // Set state to `null` to let `Authenticator` know that we want to clear current session.

        return _authentication_result.AuthenticationResult.redirectTo(this.getLoginPageURL(request), {
          state: null
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
        state: refreshedTokenPair
      });
    } catch (err) {
      this.logger.debug(`Failed to authenticate user using newly refreshed access token: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }
  }
  /**
   * Constructs login page URL using current url path as `next` query string parameter.
   * @param request Request instance.
   */


  getLoginPageURL(request) {
    const nextURL = encodeURIComponent(`${this.options.basePath.get(request)}${request.url.path}`);
    return `${this.options.basePath.get(request)}/login?next=${nextURL}`;
  }

}

exports.TokenAuthenticationProvider = TokenAuthenticationProvider;

_defineProperty(TokenAuthenticationProvider, "type", 'token');