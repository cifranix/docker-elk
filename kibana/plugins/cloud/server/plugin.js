"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudPlugin = void 0;

var _operators = require("rxjs/operators");

var _collectors = require("./collectors");

var _is_cloud_enabled = require("../common/is_cloud_enabled");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CloudPlugin {
  constructor(context) {
    this.context = context;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "config$", void 0);

    this.logger = this.context.logger.get();
    this.config$ = this.context.config.create();
  }

  async setup(core, {
    usageCollection
  }) {
    var _config$apm, _config$apm2;

    this.logger.debug('Setting up Cloud plugin');
    const config = await this.config$.pipe((0, _operators.first)()).toPromise();
    const isCloudEnabled = (0, _is_cloud_enabled.getIsCloudEnabled)(config.id);
    (0, _collectors.registerCloudUsageCollector)(usageCollection, {
      isCloudEnabled
    });
    return {
      cloudId: config.id,
      isCloudEnabled,
      apm: {
        url: (_config$apm = config.apm) === null || _config$apm === void 0 ? void 0 : _config$apm.url,
        secretToken: (_config$apm2 = config.apm) === null || _config$apm2 === void 0 ? void 0 : _config$apm2.secret_token
      }
    };
  }

  start() {}

}

exports.CloudPlugin = CloudPlugin;