"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "PluginSetupContract", {
  enumerable: true,
  get: function get() {
    return _plugin.PluginSetupContract;
  }
});
Object.defineProperty(exports, "PluginStartContract", {
  enumerable: true,
  get: function get() {
    return _plugin.PluginStartContract;
  }
});

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function plugin() {
  return new _plugin.AlertingPublicPlugin();
}