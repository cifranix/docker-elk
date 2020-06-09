"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineAuthorizationRoutes = defineAuthorizationRoutes;

var _privileges = require("./privileges");

var _roles = require("./roles");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineAuthorizationRoutes(params) {
  (0, _roles.defineRolesRoutes)(params);
  (0, _privileges.definePrivilegesRoutes)(params);
}