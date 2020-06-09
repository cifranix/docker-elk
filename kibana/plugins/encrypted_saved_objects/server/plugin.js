"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _operators = require("rxjs/operators");

var _config = require("./config");

var _crypto = require("./crypto");

var _audit = require("./audit");

var _saved_objects = require("./saved_objects");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents EncryptedSavedObjects Plugin instance that will be managed by the Kibana plugin system.
 */
class Plugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "savedObjectsSetup", void 0);

    _defineProperty(this, "legacyAPI", void 0);

    _defineProperty(this, "getLegacyAPI", () => {
      if (!this.legacyAPI) {
        throw new Error('Legacy API is not registered!');
      }

      return this.legacyAPI;
    });

    this.logger = this.initializerContext.logger.get();
  }

  async setup(core) {
    const {
      config,
      usingEphemeralEncryptionKey
    } = await (0, _config.createConfig$)(this.initializerContext).pipe((0, _operators.first)()).toPromise();
    const service = Object.freeze(new _crypto.EncryptedSavedObjectsService(config.encryptionKey, this.logger, new _audit.EncryptedSavedObjectsAuditLogger(() => this.getLegacyAPI().auditLogger)));
    this.savedObjectsSetup = (0, _saved_objects.setupSavedObjects)({
      service,
      savedObjects: core.savedObjects,
      getStartServices: core.getStartServices
    });
    return {
      registerType: typeRegistration => service.registerType(typeRegistration),
      __legacyCompat: {
        registerLegacyAPI: legacyAPI => this.legacyAPI = legacyAPI
      },
      usingEphemeralEncryptionKey
    };
  }

  start() {
    this.logger.debug('Starting plugin');
    return {
      isEncryptionError: error => error instanceof _crypto.EncryptionError,
      getDecryptedAsInternalUser: (type, id, options) => {
        return this.savedObjectsSetup.getDecryptedAsInternalUser(type, id, options);
      }
    };
  }

  stop() {
    this.logger.debug('Stopping plugin');
  }

}

exports.Plugin = Plugin;