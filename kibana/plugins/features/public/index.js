"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FeaturesPluginSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.FeaturesPluginSetup;
  }
});
Object.defineProperty(exports, "FeaturesPluginStart", {
  enumerable: true,
  get: function get() {
    return _plugin.FeaturesPluginStart;
  }
});
Object.defineProperty(exports, "Feature", {
  enumerable: true,
  get: function get() {
    return _common.Feature;
  }
});
Object.defineProperty(exports, "FeatureConfig", {
  enumerable: true,
  get: function get() {
    return _common.FeatureConfig;
  }
});
Object.defineProperty(exports, "FeatureKibanaPrivileges", {
  enumerable: true,
  get: function get() {
    return _common.FeatureKibanaPrivileges;
  }
});
Object.defineProperty(exports, "SubFeatureConfig", {
  enumerable: true,
  get: function get() {
    return _common.SubFeatureConfig;
  }
});
Object.defineProperty(exports, "SubFeaturePrivilegeConfig", {
  enumerable: true,
  get: function get() {
    return _common.SubFeaturePrivilegeConfig;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _common = require("../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin() {
  return new _plugin.FeaturesPlugin();
};

exports.plugin = plugin;