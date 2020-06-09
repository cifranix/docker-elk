"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MlPluginSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.MlPluginSetup;
  }
});
Object.defineProperty(exports, "MlPluginStart", {
  enumerable: true,
  get: function get() {
    return _plugin.MlPluginStart;
  }
});
exports.plugin = void 0;

require("./index.scss");

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin() {
  return new _plugin.MlPlugin();
};

exports.plugin = plugin;