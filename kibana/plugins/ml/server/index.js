"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MlPluginSetup", {
  enumerable: true,
  get: function () {
    return _plugin.MlPluginSetup;
  }
});
Object.defineProperty(exports, "MlPluginStart", {
  enumerable: true,
  get: function () {
    return _plugin.MlPluginStart;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin = ctx => new _plugin.MlServerPlugin(ctx);

exports.plugin = plugin;