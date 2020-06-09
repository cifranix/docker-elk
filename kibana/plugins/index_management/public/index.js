"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IndexMgmtSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.IndexMgmtSetup;
  }
});
Object.defineProperty(exports, "getIndexListUri", {
  enumerable: true,
  get: function get() {
    return _navigation.getIndexListUri;
  }
});
exports.plugin = void 0;

require("./index.scss");

var _plugin = require("./plugin");

var _navigation = require("./application/services/navigation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** @public */
var plugin = function plugin() {
  return new _plugin.IndexMgmtUIPlugin();
};

exports.plugin = plugin;