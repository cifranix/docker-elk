"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDeleteAllCommentsApi = initDeleteAllCommentsApi;

var _configSchema = require("@kbn/config-schema");

var _helpers = require("../../../../services/user_actions/helpers");

var _utils = require("../../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initDeleteAllCommentsApi({
  caseService,
  router,
  userActionService
}) {
  router.delete({
    path: '/api/cases/{case_id}/comments',
    validate: {
      params: _configSchema.schema.object({
        case_id: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const {
        username,
        full_name,
        email
      } = await caseService.getUser({
        request,
        response
      });
      const deleteDate = new Date().toISOString();
      const comments = await caseService.getAllCaseComments({
        client,
        caseId: request.params.case_id
      });
      await Promise.all(comments.saved_objects.map(comment => caseService.deleteComment({
        client,
        commentId: comment.id
      })));
      await userActionService.postUserActions({
        client,
        actions: comments.saved_objects.map(comment => (0, _helpers.buildCommentUserActionItem)({
          action: 'delete',
          actionAt: deleteDate,
          actionBy: {
            username,
            full_name,
            email
          },
          caseId: request.params.case_id,
          commentId: comment.id,
          fields: ['comment']
        }))
      });
      return response.noContent();
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}