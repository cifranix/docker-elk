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
Object.defineProperty(exports, "uiCapabilitiesRegex", {
  enumerable: true,
  get: function () {
    return _feature_schema.uiCapabilitiesRegex;
  }
});
Object.defineProperty(exports, "Feature", {
  enumerable: true,
  get: function () {
    return _common.Feature;
  }
});
Object.defineProperty(exports, "FeatureConfig", {
  enumerable: true,
  get: function () {
    return _common.FeatureConfig;
  }
});
Object.defineProperty(exports, "FeatureKibanaPrivileges", {
  enumerable: true,
  get: function () {
    return _common.FeatureKibanaPrivileges;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _feature_schema = require("./feature_schema");

var _common = require("../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// These exports are part of public Features plugin contract, any change in signature of exported
// functions or removal of exports should be considered as a breaking change. Ideally we should
// reduce number of such exports to zero and provide everything we want to expose via Setup/Start
// run-time contracts.
const plugin = initializerContext => new _plugin.Plugin(initializerContext);

exports.plugin = plugin;