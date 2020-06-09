"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WatcherContext", {
  enumerable: true,
  get: function () {
    return _plugin.WatcherContext;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin = ctx => new _plugin.WatcherServerPlugin(ctx);

exports.plugin = plugin;