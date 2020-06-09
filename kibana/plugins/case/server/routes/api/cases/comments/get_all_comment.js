"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetAllCommentsApi = initGetAllCommentsApi;

var _configSchema = require("@kbn/config-schema");

var _api = require("../../../../../common/api");

var _utils = require("../../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetAllCommentsApi({
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/{case_id}/comments',
    validate: {
      params: _configSchema.schema.object({
        case_id: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const comments = await caseService.getAllCaseComments({
        client,
        caseId: request.params.case_id
      });
      return response.ok({
        body: _api.AllCommentsResponseRt.encode((0, _utils.flattenCommentSavedObjects)(comments.saved_objects))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}