"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "DrilldownsSetupContract", {
  enumerable: true,
  get: function get() {
    return _plugin.DrilldownsSetupContract;
  }
});
Object.defineProperty(exports, "DrilldownsSetupDependencies", {
  enumerable: true,
  get: function get() {
    return _plugin.DrilldownsSetupDependencies;
  }
});
Object.defineProperty(exports, "DrilldownsStartContract", {
  enumerable: true,
  get: function get() {
    return _plugin.DrilldownsStartContract;
  }
});
Object.defineProperty(exports, "DrilldownsStartDependencies", {
  enumerable: true,
  get: function get() {
    return _plugin.DrilldownsStartDependencies;
  }
});

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function plugin() {
  return new _plugin.DrilldownsPlugin();
}