"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetCaseApi = initGetCaseApi;

var _configSchema = require("@kbn/config-schema");

var _api = require("../../../../common/api");

var _utils = require("../utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initGetCaseApi({
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/{case_id}',
    validate: {
      params: _configSchema.schema.object({
        case_id: _configSchema.schema.string()
      }),
      query: _configSchema.schema.object({
        includeComments: _configSchema.schema.string({
          defaultValue: 'true'
        })
      })
    }
  }, async (context, request, response) => {
    try {
      const client = context.core.savedObjects.client;
      const includeComments = JSON.parse(request.query.includeComments);
      const theCase = await caseService.getCase({
        client,
        caseId: request.params.case_id
      });

      if (!includeComments) {
        return response.ok({
          body: _api.CaseResponseRt.encode((0, _utils.flattenCaseSavedObject)(theCase, []))
        });
      }

      const theComments = await caseService.getAllCaseComments({
        client,
        caseId: request.params.case_id,
        options: {
          sortField: 'created_at',
          sortOrder: 'asc'
        }
      });
      return response.ok({
        body: _api.CaseResponseRt.encode((0, _utils.flattenCaseSavedObject)(theCase, theComments.saved_objects))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}