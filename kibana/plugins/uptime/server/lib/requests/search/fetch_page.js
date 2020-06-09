"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPage = void 0;

var _lodash = require("lodash");

var _constants = require("../../../../../../legacy/plugins/uptime/common/constants");

var _types = require("../../../../../../legacy/plugins/uptime/common/graphql/types");

var _enrich_monitor_groups = require("./enrich_monitor_groups");

var _monitor_group_iterator = require("./monitor_group_iterator");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 *
 * Gets a single page of results per the settings in the provided queryContext. These results are very minimal,
 * just monitor IDs and check groups. This takes an optional `MonitorGroupEnricher` that post-processes the minimal
 * data, decorating it appropriately. The function also takes a fetcher, which does all the actual fetching.
 * @param queryContext defines the criteria for the data on the current page
 * @param monitorGroupFetcher performs paginated monitor fetching
 * @param monitorEnricher decorates check group results with additional data
 */
// just monitor IDs and check groups. This takes an optional `MonitorGroupEnricher` that post-processes the minimal
// data, decorating it appropriately. The function also takes a fetcher, which does all the actual fetching.
const fetchPage = async (queryContext, monitorGroupFetcher = fetchPageMonitorGroups, monitorEnricher = _enrich_monitor_groups.enrichMonitorGroups) => {
  const size = Math.min(queryContext.size, _constants.QUERY.DEFAULT_AGGS_CAP);
  const monitorPage = await monitorGroupFetcher(queryContext, size);
  const checkGroups = (0, _lodash.flatten)(monitorPage.monitorGroups.map(monitorGroups => monitorGroups.groups.map(g => g.checkGroup)));
  const enrichedMonitors = await monitorEnricher(queryContext, checkGroups);
  return {
    items: enrichedMonitors,
    nextPagePagination: monitorPage.nextPagePagination,
    prevPagePagination: monitorPage.prevPagePagination
  };
}; // Fetches the most recent monitor groups for the given page,
// in the manner demanded by the `queryContext` and return at most `size` results.


exports.fetchPage = fetchPage;

const fetchPageMonitorGroups = async (queryContext, size) => {
  const monitorGroups = [];
  const iterator = new _monitor_group_iterator.MonitorGroupIterator(queryContext);
  let paginationBefore = null;

  while (monitorGroups.length < size) {
    const monitor = await iterator.next();

    if (!monitor) {
      break; // No more items to fetch
    }

    monitorGroups.push(monitor); // We want the before pagination to be before the first item we encounter

    if (monitorGroups.length === 1) {
      paginationBefore = await iterator.paginationBeforeCurrent();
    }
  } // We have to create these objects before checking if we can navigate backward


  const paginationAfter = await iterator.paginationAfterCurrent();
  const ssAligned = searchSortAligned(queryContext.pagination);

  if (!ssAligned) {
    monitorGroups.reverse();
  }

  return {
    monitorGroups,
    nextPagePagination: ssAligned ? paginationAfter : paginationBefore,
    prevPagePagination: ssAligned ? paginationBefore : paginationAfter
  };
}; // Returns true if the order returned by the ES query matches the requested sort order.
// This useful to determine if the results need to be reversed from their ES results order.
// I.E. when navigating backwards using prevPagePagination (CursorDirection.Before) yet using a SortOrder.ASC.


const searchSortAligned = pagination => {
  if (pagination.cursorDirection === _types.CursorDirection.AFTER) {
    return pagination.sortOrder === _types.SortOrder.ASC;
  } else {
    return pagination.sortOrder === _types.SortOrder.DESC;
  }
}; // Minimal interface representing the most recent set of groups accompanying a MonitorId in a given context.