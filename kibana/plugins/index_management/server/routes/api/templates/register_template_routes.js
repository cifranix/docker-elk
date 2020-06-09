"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTemplateRoutes = registerTemplateRoutes;

var _register_get_routes = require("./register_get_routes");

var _register_delete_route = require("./register_delete_route");

var _register_create_route = require("./register_create_route");

var _register_update_route = require("./register_update_route");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerTemplateRoutes(dependencies) {
  (0, _register_get_routes.registerGetAllRoute)(dependencies);
  (0, _register_get_routes.registerGetOneRoute)(dependencies);
  (0, _register_delete_route.registerDeleteRoute)(dependencies);
  (0, _register_create_route.registerCreateRoute)(dependencies);
  (0, _register_update_route.registerUpdateRoute)(dependencies);
}