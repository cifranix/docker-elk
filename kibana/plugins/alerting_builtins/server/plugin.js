"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertingBuiltinsPlugin = void 0;

var _index_threshold = require("./alert_types/index_threshold");

var _alert_types = require("./alert_types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AlertingBuiltinsPlugin {
  constructor(ctx) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "service", void 0);

    this.logger = ctx.logger.get();
    this.service = {
      indexThreshold: (0, _index_threshold.getService)(),
      logger: this.logger
    };
  }

  async setup(core, {
    alerting
  }) {
    (0, _alert_types.registerBuiltInAlertTypes)({
      service: this.service,
      router: core.http.createRouter(),
      alerting,
      baseRoute: '/api/alerting_builtins'
    });
    return this.service;
  }

  async start(core) {
    return this.service;
  }

  async stop() {}

}

exports.AlertingBuiltinsPlugin = AlertingBuiltinsPlugin;