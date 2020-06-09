"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupInterpreter = setupInterpreter;

var _server = require("../../../legacy/plugins/canvas/canvas_plugin_src/functions/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function setupInterpreter(expressions) {
  expressions.__LEGACY.register({
    types: [],
    serverFunctions: _server.functions
  });
}