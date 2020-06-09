"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetCasesStatusApi = initGetCasesStatusApi;

var _utils = require("../../utils");

var _api = require("../../../../../common/api");

var _saved_object_types = require("../../../../saved_object_types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetCasesStatusApi({
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/status',
    validate: {}
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const argsOpenCases = {
        client,
        options: {
          fields: [],
          page: 1,
          perPage: 1,
          filter: `${_saved_object_types.CASE_SAVED_OBJECT}.attributes.status: open`
        }
      };
      const argsClosedCases = {
        client,
        options: {
          fields: [],
          page: 1,
          perPage: 1,
          filter: `${_saved_object_types.CASE_SAVED_OBJECT}.attributes.status: closed`
        }
      };
      const [openCases, closesCases] = await Promise.all([caseService.findCases(argsOpenCases), caseService.findCases(argsClosedCases)]);
      return response.ok({
        body: _api.CasesStatusResponseRt.encode({
          count_open_cases: openCases.total,
          count_closed_cases: closesCases.total
        })
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}