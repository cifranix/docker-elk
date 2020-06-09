"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = plugin;
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function () {
    return _plugin.config;
  }
});
Object.defineProperty(exports, "InfraConfig", {
  enumerable: true,
  get: function () {
    return _plugin.InfraConfig;
  }
});
Object.defineProperty(exports, "InfraPluginSetup", {
  enumerable: true,
  get: function () {
    return _plugin.InfraPluginSetup;
  }
});
Object.defineProperty(exports, "savedObjectMappings", {
  enumerable: true,
  get: function () {
    return _saved_objects.savedObjectMappings;
  }
});

var _plugin = require("./plugin");

var _saved_objects = require("./saved_objects");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function plugin(context) {
  return new _plugin.InfraServerPlugin(context);
}