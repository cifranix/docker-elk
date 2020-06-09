"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indicesPrivilegesRoute = void 0;

var _create_route = require("./create_route");

var _setup_request = require("../lib/helpers/setup_request");

var _get_indices_privileges = require("../lib/security/get_indices_privileges");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const indicesPrivilegesRoute = (0, _create_route.createRoute)(() => ({
  path: '/api/apm/security/indices_privileges',
  handler: async ({
    context,
    request
  }) => {
    const setup = await (0, _setup_request.setupRequest)(context, request);
    return (0, _get_indices_privileges.getIndicesPrivileges)(setup);
  }
}));
exports.indicesPrivilegesRoute = indicesPrivilegesRoute;