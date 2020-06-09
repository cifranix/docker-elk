"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCaseConfigureGetActionConnector = initCaseConfigureGetActionConnector;

var _boom = _interopRequireDefault(require("boom"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Be aware that this api will only return 20 connectors
 */
const CASE_SERVICE_NOW_ACTION = '.servicenow';

function initCaseConfigureGetActionConnector({
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/configure/connectors/_find',
    validate: false
  }, async (context, request, response) => {
    try {
      var _context$actions;

      const actionsClient = await ((_context$actions = context.actions) === null || _context$actions === void 0 ? void 0 : _context$actions.getActionsClient());

      if (actionsClient == null) {
        throw _boom.default.notFound('Action client have not been found');
      }

      const results = await actionsClient.find({
        options: {
          filter: `action.attributes.actionTypeId: ${CASE_SERVICE_NOW_ACTION}`
        }
      });
      return response.ok({
        body: { ...results
        }
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}