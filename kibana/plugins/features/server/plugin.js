"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _utils = require("../../../../src/core/utils");

var _feature_registry = require("./feature_registry");

var _ui_capabilities_for_features = require("./ui_capabilities_for_features");

var _oss_features = require("./oss_features");

var _routes = require("./routes");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents Features Plugin instance that will be managed by the Kibana plugin system.
 */
class Plugin {
  constructor(initializerContext) {
    this.initializerContext = initializerContext;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "featureRegistry", new _feature_registry.FeatureRegistry());

    _defineProperty(this, "legacyAPI", void 0);

    _defineProperty(this, "getLegacyAPI", () => {
      if (!this.legacyAPI) {
        throw new Error('Legacy API is not registered!');
      }

      return this.legacyAPI;
    });

    this.logger = this.initializerContext.logger.get();
  }

  async setup(core, {
    timelion
  }) {
    (0, _routes.defineRoutes)({
      router: core.http.createRouter(),
      featureRegistry: this.featureRegistry,
      getLegacyAPI: this.getLegacyAPI
    });
    return (0, _utils.deepFreeze)({
      registerFeature: this.featureRegistry.register.bind(this.featureRegistry),
      getFeatures: this.featureRegistry.getAll.bind(this.featureRegistry),
      getFeaturesUICapabilities: () => (0, _ui_capabilities_for_features.uiCapabilitiesForFeatures)(this.featureRegistry.getAll()),
      registerLegacyAPI: legacyAPI => {
        this.legacyAPI = legacyAPI; // Register OSS features.

        for (const feature of (0, _oss_features.buildOSSFeatures)({
          savedObjectTypes: this.legacyAPI.savedObjectTypes,
          includeTimelion: timelion !== undefined && timelion.uiEnabled
        })) {
          this.featureRegistry.register(feature);
        }
      }
    });
  }

  start() {
    this.logger.debug('Starting plugin');
    return (0, _utils.deepFreeze)({
      getFeatures: this.featureRegistry.getAll.bind(this.featureRegistry)
    });
  }

  stop() {
    this.logger.debug('Stopping plugin');
  }

}

exports.Plugin = Plugin;