"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataEnhancedSetup", {
  enumerable: true,
  get: function get() {
    return _plugin.DataEnhancedSetup;
  }
});
Object.defineProperty(exports, "DataEnhancedStart", {
  enumerable: true,
  get: function get() {
    return _plugin.DataEnhancedStart;
  }
});
Object.defineProperty(exports, "ASYNC_SEARCH_STRATEGY", {
  enumerable: true,
  get: function get() {
    return _search.ASYNC_SEARCH_STRATEGY;
  }
});
Object.defineProperty(exports, "IAsyncSearchRequest", {
  enumerable: true,
  get: function get() {
    return _search.IAsyncSearchRequest;
  }
});
Object.defineProperty(exports, "IAsyncSearchOptions", {
  enumerable: true,
  get: function get() {
    return _search.IAsyncSearchOptions;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _search = require("./search");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var plugin = function plugin() {
  return new _plugin.DataEnhancedPlugin();
};

exports.plugin = plugin;