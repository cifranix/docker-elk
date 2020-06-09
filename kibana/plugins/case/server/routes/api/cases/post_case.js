"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPostCaseApi = initPostCaseApi;

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
function initPostCaseApi({
  caseService,
  router,
  userActionService
}) {
  router.post({
    path: '/api/cases',
    validate: {
      body: _utils.escapeHatch
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const query = (0, _pipeable.pipe)((0, _api.excess)(_api.CasePostRequestRt).decode(request.body), (0, _Either.fold)((0, _api.throwErrors)(_boom.default.badRequest), _function.identity));
      const {
        username,
        full_name,
        email
      } = await caseService.getUser({
        request,
        response
      });
      const createdDate = new Date().toISOString();
      const newCase = await caseService.postNewCase({
        client,
        attributes: (0, _utils.transformNewCase)({
          createdDate,
          newCase: query,
          username,
          full_name,
          email
        })
      });
      await userActionService.postUserActions({
        client,
        actions: [(0, _helpers.buildCaseUserActionItem)({
          action: 'create',
          actionAt: createdDate,
          actionBy: {
            username,
            full_name,
            email
          },
          caseId: newCase.id,
          fields: ['description', 'status', 'tags', 'title'],
          newValue: JSON.stringify(query)
        })]
      });
      return response.ok({
        body: _api.CaseResponseRt.encode((0, _utils.flattenCaseSavedObject)(newCase, []))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}