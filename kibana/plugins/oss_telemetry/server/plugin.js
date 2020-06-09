"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OssTelemetryPlugin = void 0;

var _collectors = require("./lib/collectors");

var _tasks = require("./lib/tasks");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class OssTelemetryPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "config", void 0);

    this.logger = initializerContext.logger.get('oss_telemetry');
    this.config = initializerContext.config.legacy.globalConfig$;
  }

  setup(core, deps) {
    (0, _tasks.registerTasks)({
      taskManager: deps.taskManager,
      logger: this.logger,
      elasticsearch: core.elasticsearch,
      config: this.config
    });
    (0, _collectors.registerCollectors)(deps.usageCollection, core.getStartServices().then(([_, {
      taskManager
    }]) => taskManager));
  }

  start(core, deps) {
    (0, _tasks.scheduleTasks)({
      taskManager: deps.taskManager,
      logger: this.logger
    });
  }

}

exports.OssTelemetryPlugin = OssTelemetryPlugin;