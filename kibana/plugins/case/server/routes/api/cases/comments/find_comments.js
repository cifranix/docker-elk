"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFindCaseCommentsApi = initFindCaseCommentsApi;

var _configSchema = require("@kbn/config-schema");

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _api = require("../../../../../common/api");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initFindCaseCommentsApi({
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/{case_id}/comments/_find',
    validate: {
      params: _configSchema.schema.object({
        case_id: _configSchema.schema.string()
      }),
      query: _utils.escapeHatch
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const query = (0, _pipeable.pipe)(_api.SavedObjectFindOptionsRt.decode(request.query), (0, _Either.fold)((0, _api.throwErrors)(_boom.default.badRequest), _function.identity));
      const args = query ? {
        client,
        caseId: request.params.case_id,
        options: { ...query,
          sortField: 'created_at'
        }
      } : {
        client,
        caseId: request.params.case_id
      };
      const theComments = await caseService.getAllCaseComments(args);
      return response.ok({
        body: _api.CommentsResponseRt.encode((0, _utils.transformComments)(theComments))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}