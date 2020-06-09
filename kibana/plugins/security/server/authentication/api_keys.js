"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIKeys = void 0;

var _http_authentication = require("./http_authentication");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Class responsible for managing Elasticsearch API keys.
 */
class APIKeys {
  constructor({
    logger,
    clusterClient,
    license
  }) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "clusterClient", void 0);

    _defineProperty(this, "license", void 0);

    this.logger = logger;
    this.clusterClient = clusterClient;
    this.license = license;
  }
  /**
   * Tries to create an API key for the current user.
   * @param request Request instance.
   * @param params The params to create an API key
   */


  async create(request, params) {
    if (!this.license.isEnabled()) {
      return null;
    }

    this.logger.debug('Trying to create an API key'); // User needs `manage_api_key` privilege to use this API

    let result;

    try {
      result = await this.clusterClient.asScoped(request).callAsCurrentUser('shield.createAPIKey', {
        body: params
      });
      this.logger.debug('API key was created successfully');
    } catch (e) {
      this.logger.error(`Failed to create API key: ${e.message}`);
      throw e;
    }

    return result;
  }
  /**
   * Tries to grant an API key for the current user.
   * @param request Request instance.
   */


  async grantAsInternalUser(request) {
    if (!this.license.isEnabled()) {
      return null;
    }

    this.logger.debug('Trying to grant an API key');

    const authorizationHeader = _http_authentication.HTTPAuthorizationHeader.parseFromRequest(request);

    if (authorizationHeader == null) {
      throw new Error(`Unable to grant an API Key, request does not contain an authorization header`);
    }

    const params = this.getGrantParams(authorizationHeader); // User needs `manage_api_key` or `grant_api_key` privilege to use this API

    let result;

    try {
      result = await this.clusterClient.callAsInternalUser('shield.grantAPIKey', {
        body: params
      });
      this.logger.debug('API key was granted successfully');
    } catch (e) {
      this.logger.error(`Failed to grant API key: ${e.message}`);
      throw e;
    }

    return result;
  }
  /**
   * Tries to invalidate an API key.
   * @param request Request instance.
   * @param params The params to invalidate an API key.
   */


  async invalidate(request, params) {
    if (!this.license.isEnabled()) {
      return null;
    }

    this.logger.debug('Trying to invalidate an API key as current user');
    let result;

    try {
      // User needs `manage_api_key` privilege to use this API
      result = await this.clusterClient.asScoped(request).callAsCurrentUser('shield.invalidateAPIKey', {
        body: {
          id: params.id
        }
      });
      this.logger.debug('API key was invalidated successfully as current user');
    } catch (e) {
      this.logger.error(`Failed to invalidate API key as current user: ${e.message}`);
      throw e;
    }

    return result;
  }
  /**
   * Tries to invalidate an API key by using the internal user.
   * @param params The params to invalidate an API key.
   */


  async invalidateAsInternalUser(params) {
    if (!this.license.isEnabled()) {
      return null;
    }

    this.logger.debug('Trying to invalidate an API key');
    let result;

    try {
      // Internal user needs `cluster:admin/xpack/security/api_key/invalidate` privilege to use this API
      result = await this.clusterClient.callAsInternalUser('shield.invalidateAPIKey', {
        body: {
          id: params.id
        }
      });
      this.logger.debug('API key was invalidated successfully');
    } catch (e) {
      this.logger.error(`Failed to invalidate API key: ${e.message}`);
      throw e;
    }

    return result;
  }

  getGrantParams(authorizationHeader) {
    if (authorizationHeader.scheme.toLowerCase() === 'bearer') {
      return {
        grant_type: 'access_token',
        access_token: authorizationHeader.credentials
      };
    }

    if (authorizationHeader.scheme.toLowerCase() === 'basic') {
      const basicCredentials = _http_authentication.BasicHTTPAuthorizationHeaderCredentials.parseFromCredentials(authorizationHeader.credentials);

      return {
        grant_type: 'password',
        username: basicCredentials.username,
        password: basicCredentials.password
      };
    }

    throw new Error(`Unsupported scheme "${authorizationHeader.scheme}" for granting API Key`);
  }

}

exports.APIKeys = APIKeys;