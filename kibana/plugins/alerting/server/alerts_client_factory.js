"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertsClientFactory = void 0;

var _alerts_client = require("./alerts_client");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AlertsClientFactory {
  constructor() {
    _defineProperty(this, "isInitialized", false);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "taskManager", void 0);

    _defineProperty(this, "alertTypeRegistry", void 0);

    _defineProperty(this, "securityPluginSetup", void 0);

    _defineProperty(this, "getSpaceId", void 0);

    _defineProperty(this, "spaceIdToNamespace", void 0);

    _defineProperty(this, "encryptedSavedObjectsPlugin", void 0);
  }

  initialize(options) {
    if (this.isInitialized) {
      throw new Error('AlertsClientFactory already initialized');
    }

    this.isInitialized = true;
    this.logger = options.logger;
    this.getSpaceId = options.getSpaceId;
    this.taskManager = options.taskManager;
    this.alertTypeRegistry = options.alertTypeRegistry;
    this.securityPluginSetup = options.securityPluginSetup;
    this.spaceIdToNamespace = options.spaceIdToNamespace;
    this.encryptedSavedObjectsPlugin = options.encryptedSavedObjectsPlugin;
  }

  create(request, savedObjectsClient) {
    const {
      securityPluginSetup
    } = this;
    const spaceId = this.getSpaceId(request);
    return new _alerts_client.AlertsClient({
      spaceId,
      logger: this.logger,
      taskManager: this.taskManager,
      alertTypeRegistry: this.alertTypeRegistry,
      savedObjectsClient,
      namespace: this.spaceIdToNamespace(spaceId),
      encryptedSavedObjectsPlugin: this.encryptedSavedObjectsPlugin,

      async getUserName() {
        if (!securityPluginSetup) {
          return null;
        }

        const user = await securityPluginSetup.authc.getCurrentUser(request);
        return user ? user.username : null;
      },

      async createAPIKey() {
        if (!securityPluginSetup) {
          return {
            apiKeysEnabled: false
          };
        } // Create an API key using the new grant API - in this case the Kibana system user is creating the
        // API key for the user, instead of having the user create it themselves, which requires api_key
        // privileges


        const createAPIKeyResult = await securityPluginSetup.authc.grantAPIKeyAsInternalUser(request);

        if (!createAPIKeyResult) {
          return {
            apiKeysEnabled: false
          };
        }

        return {
          apiKeysEnabled: true,
          result: createAPIKeyResult
        };
      },

      async invalidateAPIKey(params) {
        if (!securityPluginSetup) {
          return {
            apiKeysEnabled: false
          };
        }

        const invalidateAPIKeyResult = await securityPluginSetup.authc.invalidateAPIKeyAsInternalUser(params); // Null when Elasticsearch security is disabled

        if (!invalidateAPIKeyResult) {
          return {
            apiKeysEnabled: false
          };
        }

        return {
          apiKeysEnabled: true,
          result: invalidateAPIKeyResult
        };
      }

    });
  }

}

exports.AlertsClientFactory = AlertsClientFactory;