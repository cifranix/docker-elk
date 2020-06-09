"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PluginSetupContract", {
  enumerable: true,
  get: function () {
    return _plugin.PluginSetupContract;
  }
});
Object.defineProperty(exports, "PluginStartContract", {
  enumerable: true,
  get: function () {
    return _plugin.PluginStartContract;
  }
});
Object.defineProperty(exports, "ActionsPlugin", {
  enumerable: true,
  get: function () {
    return _types.ActionsPlugin;
  }
});
Object.defineProperty(exports, "ActionResult", {
  enumerable: true,
  get: function () {
    return _types.ActionResult;
  }
});
Object.defineProperty(exports, "ActionTypeExecutorOptions", {
  enumerable: true,
  get: function () {
    return _types.ActionTypeExecutorOptions;
  }
});
Object.defineProperty(exports, "ActionType", {
  enumerable: true,
  get: function () {
    return _types.ActionType;
  }
});
exports.config = exports.plugin = void 0;

var _plugin = require("./plugin");

var _config = require("./config");

var _types = require("./types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin = initContext => new _plugin.ActionsPlugin(initContext);

exports.plugin = plugin;
const config = {
  schema: _config.configSchema
};
exports.config = config;