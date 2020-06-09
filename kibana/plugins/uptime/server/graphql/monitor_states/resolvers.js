"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMonitorStatesResolvers = void 0;

var _constants = require("../../../../../legacy/plugins/uptime/common/constants");

var _saved_objects = require("../../lib/saved_objects");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createMonitorStatesResolvers = libs => {
  return {
    Query: {
      async getMonitorStates(_resolver, {
        dateRangeStart,
        dateRangeEnd,
        filters,
        pagination,
        statusFilter,
        pageSize
      }, {
        APICaller,
        savedObjectsClient
      }) {
        var _ref;

        const dynamicSettings = await _saved_objects.savedObjectsAdapter.getUptimeDynamicSettings(savedObjectsClient);
        const decodedPagination = pagination ? JSON.parse(decodeURIComponent(pagination)) : _constants.CONTEXT_DEFAULTS.CURSOR_PAGINATION;
        const [indexStatus, {
          summaries,
          nextPagePagination,
          prevPagePagination
        }] = await Promise.all([libs.requests.getIndexStatus({
          callES: APICaller,
          dynamicSettings
        }), libs.requests.getMonitorStates({
          callES: APICaller,
          dynamicSettings,
          dateRangeStart,
          dateRangeEnd,
          pagination: decodedPagination,
          pageSize,
          filters,
          // this is added to make typescript happy,
          // this sort of reassignment used to be further downstream but I've moved it here
          // because this code is going to be decomissioned soon
          statusFilter: statusFilter || undefined
        })]);
        const totalSummaryCount = (_ref = indexStatus === null || indexStatus === void 0 ? void 0 : indexStatus.docCount) !== null && _ref !== void 0 ? _ref : 0;
        return {
          summaries,
          nextPagePagination,
          prevPagePagination,
          totalSummaryCount
        };
      }

    }
  };
};

exports.createMonitorStatesResolvers = createMonitorStatesResolvers;