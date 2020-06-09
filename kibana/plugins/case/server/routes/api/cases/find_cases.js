"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFindCasesApi = initFindCasesApi;

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _lodash = require("lodash");

var _api = require("../../../../common/api");

var _utils = require("../utils");

var _saved_object_types = require("../../../saved_object_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const combineFilters = (filters, operator) => filters === null || filters === void 0 ? void 0 : filters.filter(i => i !== '').join(` ${operator} `);

const getStatusFilter = (status, appendFilter) => `${_saved_object_types.CASE_SAVED_OBJECT}.attributes.status: ${status}${!(0, _lodash.isEmpty)(appendFilter) ? ` AND ${appendFilter}` : ''}`;

const buildFilter = (filters, field, operator) => {
  var _filters$map;

  return filters != null && filters.length > 0 ? Array.isArray(filters) ? // Be aware of the surrounding parenthesis (as string inside literal) around filters.
  `(${(_filters$map = filters.map(filter => `${_saved_object_types.CASE_SAVED_OBJECT}.attributes.${field}: ${filter}`)) === null || _filters$map === void 0 ? void 0 : _filters$map.join(` ${operator} `)})` : `${_saved_object_types.CASE_SAVED_OBJECT}.attributes.${field}: ${filters}` : '';
};

function initFindCasesApi({
  caseService,
  router
}) {
  router.get({
    path: '/api/cases/_find',
    validate: {
      query: _utils.escapeHatch
    }
  }, async (context, request, response) => {
    try {
      var _query$sortField, _openCases$total, _closesCases$total;

      const client = context.core.savedObjects.client;
      const queryParams = (0, _pipeable.pipe)(_api.CasesFindRequestRt.decode(request.query), (0, _Either.fold)((0, _api.throwErrors)(_boom.default.badRequest), _function.identity));
      const {
        tags,
        reporters,
        status,
        ...query
      } = queryParams;
      const tagsFilter = buildFilter(tags, 'tags', 'OR');
      const reportersFilters = buildFilter(reporters, 'created_by.username', 'OR');
      const myFilters = combineFilters([tagsFilter, reportersFilters], 'AND');
      const filter = status != null ? getStatusFilter(status, myFilters) : myFilters;
      const args = queryParams ? {
        client,
        options: { ...query,
          filter,
          sortField: (0, _utils.sortToSnake)((_query$sortField = query.sortField) !== null && _query$sortField !== void 0 ? _query$sortField : '')
        }
      } : {
        client
      };
      const argsOpenCases = {
        client,
        options: {
          fields: [],
          page: 1,
          perPage: 1,
          filter: getStatusFilter('open', myFilters)
        }
      };
      const argsClosedCases = {
        client,
        options: {
          fields: [],
          page: 1,
          perPage: 1,
          filter: getStatusFilter('closed', myFilters)
        }
      };
      const [cases, openCases, closesCases] = await Promise.all([caseService.findCases(args), caseService.findCases(argsOpenCases), caseService.findCases(argsClosedCases)]);
      const totalCommentsFindByCases = await Promise.all(cases.saved_objects.map(c => caseService.getAllCaseComments({
        client,
        caseId: c.id,
        options: {
          fields: [],
          page: 1,
          perPage: 1
        }
      })));
      const totalCommentsByCases = totalCommentsFindByCases.reduce((acc, itemFind) => {
        if (itemFind.saved_objects.length > 0) {
          var _ref, _itemFind$saved_objec;

          const caseId = (_ref = (_itemFind$saved_objec = itemFind.saved_objects[0].references.find(r => r.type === _saved_object_types.CASE_SAVED_OBJECT)) === null || _itemFind$saved_objec === void 0 ? void 0 : _itemFind$saved_objec.id) !== null && _ref !== void 0 ? _ref : null;

          if (caseId != null) {
            return [...acc, {
              caseId,
              totalComments: itemFind.total
            }];
          }
        }

        return [...acc];
      }, []);
      return response.ok({
        body: _api.CasesFindResponseRt.encode((0, _utils.transformCases)(cases, (_openCases$total = openCases.total) !== null && _openCases$total !== void 0 ? _openCases$total : 0, (_closesCases$total = closesCases.total) !== null && _closesCases$total !== void 0 ? _closesCases$total : 0, totalCommentsByCases))
      });
    } catch (error) {
      return response.customError((0, _utils.wrapError)(error));
    }
  });
}