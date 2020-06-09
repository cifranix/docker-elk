"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetReportersApi = initGetReportersApi;

var _api = require("../../../../../common/api");

var _utils = require("../../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetReportersApi({
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/reporters',
    validate: {}
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const reporters = await caseService.getReporters({
        client
      });
      return response.ok({
        body: _api.UsersRt.encode(reporters)
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}