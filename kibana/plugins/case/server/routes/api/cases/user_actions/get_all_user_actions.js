"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetAllUserActionsApi = initGetAllUserActionsApi;

var _configSchema = require("@kbn/config-schema");

var _api = require("../../../../../common/api");

var _saved_object_types = require("../../../../saved_object_types");

var _utils = require("../../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetAllUserActionsApi({
  userActionService,
  router
}) {
  router.get({
    path: '/api/cases/{case_id}/user_actions',
    validate: {
      params: _configSchema.schema.object({
        case_id: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const userActions = await userActionService.getUserActions({
        client,
        caseId: request.params.case_id
      });
      return response.ok({
        body: _api.CaseUserActionsResponseRt.encode(userActions.saved_objects.map(ua => {
          var _ref, _ua$references$find, _ref2, _ua$references$find2;

          return { ...ua.attributes,
            action_id: ua.id,
            case_id: (_ref = (_ua$references$find = ua.references.find(r => r.type === _saved_object_types.CASE_SAVED_OBJECT)) === null || _ua$references$find === void 0 ? void 0 : _ua$references$find.id) !== null && _ref !== void 0 ? _ref : '',
            comment_id: (_ref2 = (_ua$references$find2 = ua.references.find(r => r.type === _saved_object_types.CASE_COMMENT_SAVED_OBJECT)) === null || _ua$references$find2 === void 0 ? void 0 : _ua$references$find2.id) !== null && _ref2 !== void 0 ? _ref2 : null
          };
        }))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}