"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPatchCommentApi = initPatchCommentApi;

var _configSchema = require("@kbn/config-schema");

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _api = require("../../../../../common/api");

var _saved_object_types = require("../../../../saved_object_types");

var _helpers = require("../../../../services/user_actions/helpers");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initPatchCommentApi({
  caseService,
  router,
  userActionService
}) {
  router.patch({
    path: '/api/cases/{case_id}/comments',
    validate: {
      params: _configSchema.schema.object({
        case_id: _configSchema.schema.string()
      }),
      body: _utils.escapeHatch
    }
  }, async (context, request, response) => {
    try {
      var _updatedCase$version;

      const client = context.core.savedObjects.client;
      const caseId = request.params.case_id;
      const query = (0, _pipeable.pipe)(_api.CommentPatchRequestRt.decode(request.body), (0, _Either.fold)((0, _api.throwErrors)(_boom.default.badRequest), _function.identity));
      const myCase = await caseService.getCase({
        client,
        caseId
      });
      const myComment = await caseService.getComment({
        client,
        commentId: query.id
      });

      if (myComment == null) {
        throw _boom.default.notFound(`This comment ${query.id} does not exist anymore.`);
      }

      const caseRef = myComment.references.find(c => c.type === _saved_object_types.CASE_SAVED_OBJECT);

      if (caseRef == null || caseRef != null && caseRef.id !== caseId) {
        throw _boom.default.notFound(`This comment ${query.id} does not exist in ${caseId}).`);
      }

      if (query.version !== myComment.version) {
        throw _boom.default.conflict('This case has been updated. Please refresh before saving additional updates.');
      }

      const {
        username,
        full_name,
        email
      } = await caseService.getUser({
        request,
        response
      });
      const updatedDate = new Date().toISOString();
      const [updatedComment, updatedCase] = await Promise.all([caseService.patchComment({
        client,
        commentId: query.id,
        updatedAttributes: {
          comment: query.comment,
          updated_at: updatedDate,
          updated_by: {
            email,
            full_name,
            username
          }
        },
        version: query.version
      }), caseService.patchCase({
        client,
        caseId,
        updatedAttributes: {
          updated_at: updatedDate,
          updated_by: {
            username,
            full_name,
            email
          }
        },
        version: myCase.version
      })]);
      const totalCommentsFindByCases = await caseService.getAllCaseComments({
        client,
        caseId,
        options: {
          fields: [],
          page: 1,
          perPage: 1
        }
      });
      const [comments] = await Promise.all([caseService.getAllCaseComments({
        client,
        caseId: request.params.case_id,
        options: {
          fields: [],
          page: 1,
          perPage: totalCommentsFindByCases.total
        }
      }), userActionService.postUserActions({
        client,
        actions: [(0, _helpers.buildCommentUserActionItem)({
          action: 'update',
          actionAt: updatedDate,
          actionBy: {
            username,
            full_name,
            email
          },
          caseId: request.params.case_id,
          commentId: updatedComment.id,
          fields: ['comment'],
          newValue: query.comment,
          oldValue: myComment.attributes.comment
        })]
      })]);
      return response.ok({
        body: _api.CaseResponseRt.encode((0, _utils.flattenCaseSavedObject)({ ...myCase,
          ...updatedCase,
          attributes: { ...myCase.attributes,
            ...updatedCase.attributes
          },
          version: (_updatedCase$version = updatedCase.version) !== null && _updatedCase$version !== void 0 ? _updatedCase$version : myCase.version,
          references: myCase.references
        }, comments.saved_objects))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}