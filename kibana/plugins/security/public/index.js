"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SecurityPluginSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.SecurityPluginSetup;
  }
});
Object.defineProperty(exports, "SecurityPluginStart", {
  enumerable: true,
  get: function get() {
    return _plugin.SecurityPluginStart;
  }
});
Object.defineProperty(exports, "SessionInfo", {
  enumerable: true,
  get: function get() {
    return _types.SessionInfo;
  }
});
Object.defineProperty(exports, "AuthenticatedUser", {
  enumerable: true,
  get: function get() {
    return _model.AuthenticatedUser;
  }
});
Object.defineProperty(exports, "SecurityLicense", {
  enumerable: true,
  get: function get() {
    return _licensing.SecurityLicense;
  }
});
Object.defineProperty(exports, "SecurityLicenseFeatures", {
  enumerable: true,
  get: function get() {
    return _licensing.SecurityLicenseFeatures;
  }
});
exports.plugin = void 0;

require("./index.scss");

var _plugin = require("./plugin");

var _types = require("./types");

var _model = require("../common/model");

var _licensing = require("../common/licensing");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin(initializerContext) {
  return new _plugin.SecurityPlugin(initializerContext);
};

exports.plugin = plugin;