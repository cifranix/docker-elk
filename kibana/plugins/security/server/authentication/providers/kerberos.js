"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KerberosAuthenticationProvider = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _server = require("../../../../../../src/core/server");

var _authentication_result = require("../authentication_result");

var _deauthentication_result = require("../deauthentication_result");

var _http_authentication = require("../http_authentication");

var _tokens = require("../tokens");

var _base = require("./base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Name of the `WWW-Authenticate` we parse out of Elasticsearch responses or/and return to the
 * client to initiate or continue negotiation.
 */
const WWWAuthenticateHeaderName = 'WWW-Authenticate';
/**
 * Checks whether current request can initiate new session.
 * @param request Request instance.
 */

function canStartNewSession(request) {
  // We should try to establish new session only if request requires authentication.
  return request.route.options.authRequired === true;
}
/**
 * Provider that supports Kerberos request authentication.
 */


class KerberosAuthenticationProvider extends _base.BaseAuthenticationProvider {
  /**
   * Type of the provider.
   */

  /**
   * Performs initial login request.
   * @param request Request instance.
   */
  async login(request) {
    var _HTTPAuthorizationHea;

    this.logger.debug('Trying to perform a login.');

    if (((_HTTPAuthorizationHea = _http_authentication.HTTPAuthorizationHeader.parseFromRequest(request)) === null || _HTTPAuthorizationHea === void 0 ? void 0 : _HTTPAuthorizationHea.scheme.toLowerCase()) === 'negotiate') {
      return await this.authenticateWithNegotiateScheme(request);
    }

    return await this.authenticateViaSPNEGO(request);
  }
  /**
   * Performs Kerberos request authentication.
   * @param request Request instance.
   * @param [state] Optional state object associated with the provider.
   */


  async authenticate(request, state) {
    this.logger.debug(`Trying to authenticate user request to ${request.url.path}.`);

    const authorizationHeader = _http_authentication.HTTPAuthorizationHeader.parseFromRequest(request);

    if (authorizationHeader && authorizationHeader.scheme.toLowerCase() !== 'negotiate') {
      this.logger.debug(`Unsupported authentication scheme: ${authorizationHeader.scheme}`);
      return _authentication_result.AuthenticationResult.notHandled();
    }

    let authenticationResult = authorizationHeader ? await this.authenticateWithNegotiateScheme(request) : _authentication_result.AuthenticationResult.notHandled();

    if (state && authenticationResult.notHandled()) {
      authenticationResult = await this.authenticateViaState(request, state);

      if (authenticationResult.failed() && _tokens.Tokens.isAccessTokenExpiredError(authenticationResult.error)) {
        authenticationResult = await this.authenticateViaRefreshToken(request, state);
      }
    } // If we couldn't authenticate by means of all methods above, let's try to check if Elasticsearch can
    // start authentication mechanism negotiation, otherwise just return authentication result we have.


    return authenticationResult.notHandled() && canStartNewSession(request) ? await this.authenticateViaSPNEGO(request, state) : authenticationResult;
  }
  /**
   * Invalidates access token retrieved in exchange for SPNEGO token if it exists.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async logout(request, state) {
    this.logger.debug(`Trying to log user out via ${request.url.path}.`);

    if (!state) {
      this.logger.debug('There is no access token invalidate.');
      return _deauthentication_result.DeauthenticationResult.notHandled();
    }

    try {
      await this.options.tokens.invalidate(state);
    } catch (err) {
      this.logger.debug(`Failed invalidating access and/or refresh tokens: ${err.message}`);
      return _deauthentication_result.DeauthenticationResult.failed(err);
    }

    return _deauthentication_result.DeauthenticationResult.redirectTo(`${this.options.basePath.serverBasePath}/security/logged_out`);
  }
  /**
   * Returns HTTP authentication scheme (`Bearer`) that's used within `Authorization` HTTP header
   * that provider attaches to all successfully authenticated requests to Elasticsearch.
   */


  getHTTPAuthenticationScheme() {
    return 'bearer';
  }
  /**
   * Tries to authenticate request with `Negotiate ***` Authorization header by passing it to the Elasticsearch backend to
   * get an access token in exchange.
   * @param request Request instance.
   */


  async authenticateWithNegotiateScheme(request) {
    this.logger.debug('Trying to authenticate request using "Negotiate" authentication scheme.');
    const [, kerberosTicket] = request.headers.authorization.split(/\s+/); // First attempt to exchange SPNEGO token for an access token.

    let tokens;

    try {
      tokens = await this.options.client.callAsInternalUser('shield.getAccessToken', {
        body: {
          grant_type: '_kerberos',
          kerberos_ticket: kerberosTicket
        }
      });
    } catch (err) {
      this.logger.debug(`Failed to exchange SPNEGO token for an access token: ${err.message}`); // Check if SPNEGO context wasn't established and we have a response token to return to the client.

      const challenge = _server.ElasticsearchErrorHelpers.isNotAuthorizedError(err) ? this.getNegotiateChallenge(err) : undefined;

      if (!challenge) {
        return _authentication_result.AuthenticationResult.failed(err);
      }

      const challengeParts = challenge.split(/\s+/);

      if (challengeParts.length > 2) {
        this.logger.debug('Challenge consists of more than two parts and may be malformed.');
      }

      let responseChallenge;
      const [, responseToken] = challengeParts;

      if (responseToken) {
        this.logger.debug('Returning response token to the client and continuing SPNEGO handshake.');
        responseChallenge = `Negotiate ${responseToken}`;
      } else {
        this.logger.debug('Re-initiating SPNEGO handshake.');
        responseChallenge = 'Negotiate';
      }

      return _authentication_result.AuthenticationResult.failed(_boom.default.unauthorized(), {
        authResponseHeaders: {
          [WWWAuthenticateHeaderName]: responseChallenge
        }
      });
    }

    this.logger.debug('Get token API request to Elasticsearch successful'); // There is a chance we may need to provide an output token for the client (usually for mutual
    // authentication), it should be attached to the response within `WWW-Authenticate` header with
    // the requested payload, no matter what status code it may have.

    let authResponseHeaders;

    if (tokens.kerberos_authentication_response_token) {
      this.logger.debug('There is an output token provided that will be included into response headers.');
      authResponseHeaders = {
        [WWWAuthenticateHeaderName]: `Negotiate ${tokens.kerberos_authentication_response_token}`
      };
    }

    try {
      // Then attempt to query for the user details using the new token
      const authHeaders = {
        authorization: new _http_authentication.HTTPAuthorizationHeader('Bearer', tokens.access_token).toString()
      };
      const user = await this.getUser(request, authHeaders);
      this.logger.debug('User has been authenticated with new access token');
      return _authentication_result.AuthenticationResult.succeeded(user, {
        authHeaders,
        authResponseHeaders,
        state: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token
        }
      });
    } catch (err) {
      this.logger.debug(`Failed to authenticate request via access token: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }
  }
  /**
   * Tries to extract access token from state and adds it to the request before it's
   * forwarded to Elasticsearch backend.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async authenticateViaState(request, {
    accessToken
  }) {
    this.logger.debug('Trying to authenticate via state.');

    if (!accessToken) {
      this.logger.debug('Access token is not found in state.');
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
   * This method is only called when authentication via access token stored in the state failed because of expired
   * token. So we should use refresh token, that is also stored in the state, to extend expired access token and
   * authenticate user with it.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async authenticateViaRefreshToken(request, state) {
    this.logger.debug('Trying to refresh access token.');
    let refreshedTokenPair;

    try {
      refreshedTokenPair = await this.options.tokens.refresh(state.refreshToken);
    } catch (err) {
      return _authentication_result.AuthenticationResult.failed(err);
    } // If refresh token is no longer valid, then we should clear session and renegotiate using SPNEGO.


    if (refreshedTokenPair === null) {
      this.logger.debug('Both access and refresh tokens are expired.');
      return canStartNewSession(request) ? this.authenticateViaSPNEGO(request, state) : _authentication_result.AuthenticationResult.notHandled();
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
   * Tries to query Elasticsearch and see if we can rely on SPNEGO to authenticate user.
   * @param request Request instance.
   * @param [state] Optional state object associated with the provider.
   */


  async authenticateViaSPNEGO(request, state) {
    this.logger.debug('Trying to authenticate request via SPNEGO.'); // Try to authenticate current request with Elasticsearch to see whether it supports SPNEGO.

    let elasticsearchError;

    try {
      await this.getUser(request, {
        // We should send a fake SPNEGO token to Elasticsearch to make sure Kerberos realm is included
        // into authentication chain and adds a `WWW-Authenticate: Negotiate` header to the error
        // response. Otherwise it may not be even consulted if request can be authenticated by other
        // means (e.g. when anonymous access is enabled in Elasticsearch).
        authorization: `Negotiate ${Buffer.from('__fake__').toString('base64')}`
      });
      this.logger.debug('Request was not supposed to be authenticated, ignoring result.');
      return _authentication_result.AuthenticationResult.notHandled();
    } catch (err) {
      // Fail immediately if we get unexpected error (e.g. ES isn't available). We should not touch
      // session cookie in this case.
      if (!_server.ElasticsearchErrorHelpers.isNotAuthorizedError(err)) {
        return _authentication_result.AuthenticationResult.failed(err);
      }

      elasticsearchError = err;
    }

    if (this.getNegotiateChallenge(elasticsearchError)) {
      return _authentication_result.AuthenticationResult.failed(_boom.default.unauthorized(), {
        authResponseHeaders: {
          [WWWAuthenticateHeaderName]: 'Negotiate'
        }
      });
    } // If we failed to do SPNEGO and have a session with expired token that belongs to Kerberos
    // authentication provider then it means Elasticsearch isn't configured to use Kerberos anymore.
    // In this case we should reply with the `401` error and allow Authenticator to clear the cookie.
    // Otherwise give a chance to the next authentication provider to authenticate request.


    return state ? _authentication_result.AuthenticationResult.failed(_boom.default.unauthorized()) : _authentication_result.AuthenticationResult.notHandled();
  }
  /**
   * Extracts `Negotiate` challenge from the list of challenges returned with Elasticsearch error if any.
   * @param error Error to extract challenges from.
   */


  getNegotiateChallenge(error) {
    const challenges = [].concat(error.output.headers[WWWAuthenticateHeaderName]);
    const negotiateChallenge = challenges.find(challenge => challenge.toLowerCase().startsWith('negotiate'));

    if (negotiateChallenge) {
      this.logger.debug(`SPNEGO is supported by the backend, challenges are: [${challenges}].`);
    } else {
      this.logger.debug(`SPNEGO is not supported by the backend, challenges are: [${challenges}].`);
    }

    return negotiateChallenge;
  }

}

exports.KerberosAuthenticationProvider = KerberosAuthenticationProvider;

_defineProperty(KerberosAuthenticationProvider, "type", 'kerberos');