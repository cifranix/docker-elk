"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LensServerPlugin = void 0;

var _routes = require("./routes");

var _usage = require("./usage");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LensServerPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "kibanaIndexConfig", void 0);

    _defineProperty(this, "telemetryLogger", void 0);

    this.kibanaIndexConfig = initializerContext.config.legacy.globalConfig$;
    this.telemetryLogger = initializerContext.logger.get('telemetry');
  }

  setup(core, plugins) {
    (0, _routes.setupRoutes)(core);

    if (plugins.usageCollection && plugins.taskManager) {
      (0, _usage.registerLensUsageCollector)(plugins.usageCollection, core.getStartServices().then(([_, {
        taskManager
      }]) => taskManager));
      (0, _usage.initializeLensTelemetry)(this.telemetryLogger, core, this.kibanaIndexConfig, plugins.taskManager);
    }

    return {};
  }

  start(core, plugins) {
    if (plugins.taskManager) {
      (0, _usage.scheduleLensTelemetry)(this.telemetryLogger, plugins.taskManager);
    }

    return {};
  }

  stop() {}

}

exports.LensServerPlugin = LensServerPlugin;