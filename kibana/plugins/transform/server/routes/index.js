"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiRoutes = exports.addBasePath = void 0;

var _privileges = require("./api/privileges");

var _transforms = require("./api/transforms");

var _constants = require("../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const addBasePath = uri => `${_constants.API_BASE_PATH}${uri}`;

exports.addBasePath = addBasePath;

class ApiRoutes {
  setup(dependencies) {
    (0, _privileges.registerPrivilegesRoute)(dependencies);
    (0, _transforms.registerTransformsRoutes)(dependencies);
  }

  start() {}

  stop() {}

}

exports.ApiRoutes = ApiRoutes;