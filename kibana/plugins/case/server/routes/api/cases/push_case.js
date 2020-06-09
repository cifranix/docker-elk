"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPushCaseUserActionApi = initPushCaseUserActionApi;

var _configSchema = require("@kbn/config-schema");

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _utils = require("../utils");

var _api = require("../../../../common/api");

var _helpers = require("../../../services/user_actions/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initPushCaseUserActionApi({
  caseConfigureService,
  caseService,
  router,
  userActionService
}) {
  router.post({
    path: '/api/cases/{case_id}/_push',
    validate: {
      params: _configSchema.schema.object({
        case_id: _configSchema.schema.string()
      }),
      body: _utils.escapeHatch
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const caseId = request.params.case_id;
      const query = (0, _pipeable.pipe)(_api.CaseExternalServiceRequestRt.decode(request.body), (0, _Either.fold)((0, _api.throwErrors)(_boom.default.badRequest), _function.identity));
      const {
        username,
        full_name,
        email
      } = await caseService.getUser({
        request,
        response
      });
      const pushedDate = new Date().toISOString();
      const [myCase, myCaseConfigure, totalCommentsFindByCases] = await Promise.all([caseService.getCase({
        client,
        caseId: request.params.case_id
      }), caseConfigureService.find({
        client
      }), caseService.getAllCaseComments({
        client,
        caseId,
        options: {
          fields: [],
          page: 1,
          perPage: 1
        }
      })]);

      if (myCase.attributes.status === 'closed') {
        throw _boom.default.conflict(`This case ${myCase.attributes.title} is closed. You can not pushed if the case is closed.`);
      }

      const comments = await caseService.getAllCaseComments({
        client,
        caseId,
        options: {
          fields: [],
          page: 1,
          perPage: totalCommentsFindByCases.total
        }
      });
      const externalService = {
        pushed_at: pushedDate,
        pushed_by: {
          username,
          full_name,
          email
        },
        ...query
      };
      const [updatedCase, updatedComments] = await Promise.all([caseService.patchCase({
        client,
        caseId,
        updatedAttributes: { ...(myCaseConfigure.saved_objects[0].attributes.closure_type === 'close-by-pushing' ? {
            status: 'closed',
            closed_at: pushedDate,
            closed_by: {
              email,
              full_name,
              username
            }
          } : {}),
          external_service: externalService,
          updated_at: pushedDate,
          updated_by: {
            username,
            full_name,
            email
          }
        },
        version: myCase.version
      }), caseService.patchComments({
        client,
        comments: comments.saved_objects.filter(comment => comment.attributes.pushed_at == null).map(comment => ({
          commentId: comment.id,
          updatedAttributes: {
            pushed_at: pushedDate,
            pushed_by: {
              username,
              full_name,
              email
            }
          },
          version: comment.version
        }))
      }), userActionService.postUserActions({
        client,
        actions: [...(myCaseConfigure.saved_objects[0].attributes.closure_type === 'close-by-pushing' ? [(0, _helpers.buildCaseUserActionItem)({
          action: 'update',
          actionAt: pushedDate,
          actionBy: {
            username,
            full_name,
            email
          },
          caseId,
          fields: ['status'],
          newValue: 'closed',
          oldValue: myCase.attributes.status
        })] : []), (0, _helpers.buildCaseUserActionItem)({
          action: 'push-to-service',
          actionAt: pushedDate,
          actionBy: {
            username,
            full_name,
            email
          },
          caseId,
          fields: ['pushed'],
          newValue: JSON.stringify(externalService)
        })]
      })]);
      return response.ok({
        body: _api.CaseResponseRt.encode((0, _utils.flattenCaseSavedObject)({ ...myCase,
          ...updatedCase,
          attributes: { ...myCase.attributes,
            ...(updatedCase === null || updatedCase === void 0 ? void 0 : updatedCase.attributes)
          },
          references: myCase.references
        }, comments.saved_objects.map(origComment => {
          var _ref, _ref2;

          const updatedComment = updatedComments.saved_objects.find(c => c.id === origComment.id);
          return { ...origComment,
            ...updatedComment,
            attributes: { ...origComment.attributes,
              ...(updatedComment === null || updatedComment === void 0 ? void 0 : updatedComment.attributes)
            },
            version: (_ref = updatedComment === null || updatedComment === void 0 ? void 0 : updatedComment.version) !== null && _ref !== void 0 ? _ref : origComment.version,
            references: (_ref2 = origComment === null || origComment === void 0 ? void 0 : origComment.references) !== null && _ref2 !== void 0 ? _ref2 : []
          };
        })))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}