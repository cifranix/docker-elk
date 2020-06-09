"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PKIAuthenticationProvider = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _authentication_result = require("../authentication_result");

var _deauthentication_result = require("../deauthentication_result");

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
  // We should try to establish new session only if request requires authentication.
  return request.route.options.authRequired === true;
}
/**
 * Provider that supports PKI request authentication.
 */


class PKIAuthenticationProvider extends _base.BaseAuthenticationProvider {
  /**
   * Type of the provider.
   */

  /**
   * Performs initial login request.
   * @param request Request instance.
   */
  async login(request) {
    this.logger.debug('Trying to perform a login.');
    return await this.authenticateViaPeerCertificate(request);
  }
  /**
   * Performs PKI request authentication.
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
      authenticationResult = await this.authenticateViaState(request, state); // If access token expired or doesn't match to the certificate fingerprint we should try to get
      // a new one in exchange to peer certificate chain assuming request can initiate new session.

      const invalidAccessToken = authenticationResult.notHandled() || authenticationResult.failed() && _tokens.Tokens.isAccessTokenExpiredError(authenticationResult.error);

      if (invalidAccessToken && canStartNewSession(request)) {
        authenticationResult = await this.authenticateViaPeerCertificate(request); // If we have an active session that we couldn't use to authenticate user and at the same time
        // we couldn't use peer's certificate to establish a new one, then we should respond with 401
        // and force authenticator to clear the session.

        if (authenticationResult.notHandled()) {
          return _authentication_result.AuthenticationResult.failed(_boom.default.unauthorized());
        }
      } else if (invalidAccessToken) {
        return _authentication_result.AuthenticationResult.notHandled();
      }
    } // If we couldn't authenticate by means of all methods above, let's try to check if we can authenticate
    // request using its peer certificate chain, otherwise just return authentication result we have.
    // We shouldn't establish new session if authentication isn't required for this particular request.


    return authenticationResult.notHandled() && canStartNewSession(request) ? await this.authenticateViaPeerCertificate(request) : authenticationResult;
  }
  /**
   * Invalidates access token retrieved in exchange for peer certificate chain if it exists.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async logout(request, state) {
    this.logger.debug(`Trying to log user out via ${request.url.path}.`);

    if (!state) {
      this.logger.debug('There is no access token to invalidate.');
      return _deauthentication_result.DeauthenticationResult.notHandled();
    }

    try {
      await this.options.tokens.invalidate({
        accessToken: state.accessToken
      });
    } catch (err) {
      this.logger.debug(`Failed invalidating access token: ${err.message}`);
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
   * Tries to extract access token from state and adds it to the request before it's
   * forwarded to Elasticsearch backend.
   * @param request Request instance.
   * @param state State value previously stored by the provider.
   */


  async authenticateViaState(request, {
    accessToken,
    peerCertificateFingerprint256
  }) {
    this.logger.debug('Trying to authenticate via state.'); // If peer is authorized, but its certificate isn't available, that likely means the connection
    // with the peer is closed already. We shouldn't invalidate peer's access token in this case
    // since we cannot guarantee that there is a mismatch in access token and peer certificate.

    const peerCertificate = request.socket.getPeerCertificate(true);

    if (peerCertificate === null && request.socket.authorized) {
      this.logger.debug('Cannot validate state access token with the peer certificate since it is not available.');
      return _authentication_result.AuthenticationResult.failed(new Error('Peer certificate is not available'));
    }

    if (!request.socket.authorized || peerCertificate === null || peerCertificate.fingerprint256 !== peerCertificateFingerprint256) {
      this.logger.debug('Peer certificate is not present or its fingerprint does not match to the one associated with the access token. Invalidating access token...');

      try {
        await this.options.tokens.invalidate({
          accessToken
        });
      } catch (err) {
        this.logger.debug(`Failed to invalidate access token: ${err.message}`);
        return _authentication_result.AuthenticationResult.failed(err);
      } // Return "Not Handled" result to allow provider to try to exchange new peer certificate chain
      // to the new access token down the line.


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
   * Tries to exchange peer certificate chain to access/refresh token pair.
   * @param request Request instance.
   */


  async authenticateViaPeerCertificate(request) {
    this.logger.debug('Trying to authenticate request via peer certificate chain.');

    if (!request.socket.authorized) {
      this.logger.debug(`Authentication is not possible since peer certificate was not authorized: ${request.socket.authorizationError}.`);
      return _authentication_result.AuthenticationResult.notHandled();
    }

    const peerCertificate = request.socket.getPeerCertificate(true);

    if (peerCertificate === null) {
      this.logger.debug('Authentication is not possible due to missing peer certificate chain.');
      return _authentication_result.AuthenticationResult.notHandled();
    } // We should collect entire certificate chain as an ordered array of certificates encoded as base64 strings.


    const certificateChain = this.getCertificateChain(peerCertificate);
    let accessToken;

    try {
      accessToken = (await this.options.client.callAsInternalUser('shield.delegatePKI', {
        body: {
          x509_certificate_chain: certificateChain
        }
      })).access_token;
    } catch (err) {
      this.logger.debug(`Failed to exchange peer certificate chain to an access token: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }

    this.logger.debug('Successfully retrieved access token in exchange to peer certificate chain.');

    try {
      // Then attempt to query for the user details using the new token
      const authHeaders = {
        authorization: new _http_authentication.HTTPAuthorizationHeader('Bearer', accessToken).toString()
      };
      const user = await this.getUser(request, authHeaders);
      this.logger.debug('User has been authenticated with new access token');
      return _authentication_result.AuthenticationResult.succeeded(user, {
        authHeaders,
        state: {
          accessToken,
          // NodeJS typings don't include `fingerprint256` yet.
          peerCertificateFingerprint256: peerCertificate.fingerprint256
        }
      });
    } catch (err) {
      this.logger.debug(`Failed to authenticate request via access token: ${err.message}`);
      return _authentication_result.AuthenticationResult.failed(err);
    }
  }
  /**
   * Starts from the leaf peer certificate and iterates up to the top-most available certificate
   * authority using `issuerCertificate` certificate property. THe iteration is stopped only when
   * we detect circular reference (root/self-signed certificate) or when `issuerCertificate` isn't
   * available (null or empty object).
   * @param peerCertificate Peer leaf certificate instance.
   */


  getCertificateChain(peerCertificate) {
    const certificateChain = [];
    let certificate = peerCertificate;

    while (certificate !== null && Object.keys(certificate).length > 0) {
      certificateChain.push(certificate.raw.toString('base64')); // For self-signed certificates, `issuerCertificate` may be a circular reference.

      if (certificate === certificate.issuerCertificate) {
        this.logger.debug('Self-signed certificate is detected in certificate chain');
        certificate = null;
      } else {
        certificate = certificate.issuerCertificate;
      }
    }

    this.logger.debug(`Peer certificate chain consists of ${certificateChain.length} certificates.`);
    return certificateChain;
  }

}

exports.PKIAuthenticationProvider = PKIAuthenticationProvider;

_defineProperty(PKIAuthenticationProvider, "type", 'pki');