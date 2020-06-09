"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineApiKeysRoutes = defineApiKeysRoutes;

var _get = require("./get");

var _privileges = require("./privileges");

var _invalidate = require("./invalidate");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function defineApiKeysRoutes(params) {
  (0, _get.defineGetApiKeysRoutes)(params);
  (0, _privileges.defineCheckPrivilegesRoutes)(params);
  (0, _invalidate.defineInvalidateApiKeysRoutes)(params);
}