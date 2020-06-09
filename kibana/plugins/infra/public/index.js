"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FORMATTERS", {
  enumerable: true,
  get: function get() {
    return _formatters.FORMATTERS;
  }
});
Object.defineProperty(exports, "InfraFormatterType", {
  enumerable: true,
  get: function get() {
    return _lib.InfraFormatterType;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _formatters = require("./utils/formatters");

var _lib = require("./lib/lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin(context) {
  return new _plugin.Plugin(context);
};

exports.plugin = plugin;