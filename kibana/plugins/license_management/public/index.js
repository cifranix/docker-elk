"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LicenseManagementUIPluginSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.LicenseManagementUIPluginSetup;
  }
});
Object.defineProperty(exports, "LicenseManagementUIPluginStart", {
  enumerable: true,
  get: function get() {
    return _plugin.LicenseManagementUIPluginStart;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

require("./application/index.scss");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin(ctx) {
  return new _plugin.LicenseManagementUIPlugin(ctx);
};

exports.plugin = plugin;