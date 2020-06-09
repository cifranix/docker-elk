"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDeleteCommentApi = initDeleteCommentApi;

var _boom = _interopRequireDefault(require("boom"));

var _configSchema = require("@kbn/config-schema");

var _saved_object_types = require("../../../../saved_object_types");

var _helpers = require("../../../../services/user_actions/helpers");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initDeleteCommentApi({
  caseService,
  router,
  userActionService
}) {
  router.delete({
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
      const {
        username,
        full_name,
        email
      } = await caseService.getUser({
        request,
        response
      });
      const deleteDate = new Date().toISOString();
      const myComment = await caseService.getComment({
        client,
        commentId: request.params.comment_id
      });

      if (myComment == null) {
        throw _boom.default.notFound(`This comment ${request.params.comment_id} does not exist anymore.`);
      }

      const caseRef = myComment.references.find(c => c.type === _saved_object_types.CASE_SAVED_OBJECT);

      if (caseRef == null || caseRef != null && caseRef.id !== request.params.case_id) {
        throw _boom.default.notFound(`This comment ${request.params.comment_id} does not exist in ${request.params.case_id}).`);
      }

      await caseService.deleteComment({
        client,
        commentId: request.params.comment_id
      });
      await userActionService.postUserActions({
        client,
        actions: [(0, _helpers.buildCommentUserActionItem)({
          action: 'delete',
          actionAt: deleteDate,
          actionBy: {
            username,
            full_name,
            email
          },
          caseId: request.params.case_id,
          commentId: request.params.comment_id,
          fields: ['comment']
        })]
      });
      return response.noContent();
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}