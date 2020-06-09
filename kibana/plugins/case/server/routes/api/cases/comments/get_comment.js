"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetCommentApi = initGetCommentApi;

var _configSchema = require("@kbn/config-schema");

var _api = require("../../../../../common/api");

var _utils = require("../../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetCommentApi({
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/{case_id}/comments/{comment_id}',
    validate: {
      params: _configSchema.schema.object({
        case_id: _configSchema.schema.string(),
        comment_id: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const comment = await caseService.getComment({
        client,
        commentId: request.params.comment_id
      });
      return response.ok({
        body: _api.CommentResponseRt.encode((0, _utils.flattenCommentSavedObject)(comment))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}