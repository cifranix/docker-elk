"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IService", {
  enumerable: true,
  get: function () {
    return _types.IService;
  }
});
exports.config = exports.plugin = void 0;

var _plugin = require("./plugin");

var _config = require("./config");

var _types = require("./types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin = ctx => new _plugin.AlertingBuiltinsPlugin(ctx);

exports.plugin = plugin;
const config = {
  schema: _config.configSchema
};
exports.config = config;