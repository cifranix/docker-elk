"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IEventLogService", {
  enumerable: true,
  get: function () {
    return _types.IEventLogService;
  }
});
Object.defineProperty(exports, "IEventLogger", {
  enumerable: true,
  get: function () {
    return _types.IEventLogger;
  }
});
Object.defineProperty(exports, "IEvent", {
  enumerable: true,
  get: function () {
    return _types.IEvent;
  }
});
exports.plugin = exports.config = void 0;

var _types = require("./types");

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const config = {
  schema: _types.ConfigSchema
};
exports.config = config;

const plugin = context => new _plugin.Plugin(context);

exports.plugin = plugin;