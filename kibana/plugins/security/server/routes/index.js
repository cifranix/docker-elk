"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineRoutes = defineRoutes;

var _authentication = require("./authentication");

var _authorization = require("./authorization");

var _api_keys = require("./api_keys");

var _indices = require("./indices");

var _users = require("./users");

var _role_mapping = require("./role_mapping");

var _views = require("./views");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineRoutes(params) {
  (0, _authentication.defineAuthenticationRoutes)(params);
  (0, _authorization.defineAuthorizationRoutes)(params);
  (0, _api_keys.defineApiKeysRoutes)(params);
  (0, _indices.defineIndicesRoutes)(params);
  (0, _users.defineUsersRoutes)(params);
  (0, _role_mapping.defineRoleMappingRoutes)(params);
  (0, _views.defineViewRoutes)(params);
}