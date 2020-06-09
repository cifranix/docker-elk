"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitorStates = void 0;

var _constants = require("../../../../../legacy/plugins/uptime/common/constants");

var _search = require("./search");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// To simplify the handling of the group of pagination vars they're passed back to the client as a string
const jsonifyPagination = p => {
  if (!p) {
    return null;
  }

  return JSON.stringify(p);
}; // Gets a page of monitor states.


const getMonitorStates = async ({
  callES,
  dynamicSettings,
  dateRangeStart,
  dateRangeEnd,
  pagination,
  pageSize,
  filters,
  statusFilter
}) => {
  pagination = pagination || _constants.CONTEXT_DEFAULTS.CURSOR_PAGINATION;
  statusFilter = statusFilter === null ? undefined : statusFilter;
  const queryContext = new _search.QueryContext(callES, dynamicSettings.heartbeatIndices, dateRangeStart, dateRangeEnd, pagination, filters && filters !== '' ? JSON.parse(filters) : null, pageSize, statusFilter);
  const page = await (0, _search.fetchPage)(queryContext);
  return {
    summaries: page.items,
    nextPagePagination: jsonifyPagination(page.nextPagePagination),
    prevPagePagination: jsonifyPagination(page.prevPagePagination)
  };
};

exports.getMonitorStates = getMonitorStates;