"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetActiveSpaceApi = initGetActiveSpaceApi;

var _errors = require("../../../lib/errors");

var _lib = require("../../lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetActiveSpaceApi(deps) {
  const {
    internalRouter,
    spacesService
  } = deps;
  internalRouter.get({
    path: '/internal/spaces/_active_space',
    validate: false
  }, (0, _lib.createLicensedRouteHandler)(async (context, request, response) => {
    try {
      const space = await spacesService.getActiveSpace(request);
      return response.ok({
        body: space
      });
    } catch (error) {
      return response.customError((0, _errors.wrapError)(error));
    }
  }));
}