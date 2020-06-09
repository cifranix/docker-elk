"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerActionRoutes = registerActionRoutes;

var _register_acknowledge_route = require("./register_acknowledge_route");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerActionRoutes(deps) {
  (0, _register_acknowledge_route.registerAcknowledgeRoute)(deps);
}