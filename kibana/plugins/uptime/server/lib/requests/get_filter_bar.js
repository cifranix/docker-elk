"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilterBar = exports.extractFilterAggsResults = exports.combineRangeWithFilters = void 0;

var _generate_filter_aggs = require("./generate_filter_aggs");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const combineRangeWithFilters = (dateRangeStart, dateRangeEnd, filters) => {
  var _ref, _filters$bool, _ref2, _filters$bool2;

  const range = {
    range: {
      '@timestamp': {
        gte: dateRangeStart,
        lte: dateRangeEnd
      }
    }
  };
  if (!filters) return range;
  const clientFiltersList = Array.isArray((_ref = filters === null || filters === void 0 ? void 0 : (_filters$bool = filters.bool) === null || _filters$bool === void 0 ? void 0 : _filters$bool.filter) !== null && _ref !== void 0 ? _ref : {}) ? // i.e. {"bool":{"filter":{ ...some nested filter objects }}}
  filters.bool.filter : // i.e. {"bool":{"filter":[ ...some listed filter objects ]}}
  Object.keys((_ref2 = filters === null || filters === void 0 ? void 0 : (_filters$bool2 = filters.bool) === null || _filters$bool2 === void 0 ? void 0 : _filters$bool2.filter) !== null && _ref2 !== void 0 ? _ref2 : {}).map(key => {
    var _filters$bool3, _filters$bool3$filter;

    return { ...(filters === null || filters === void 0 ? void 0 : (_filters$bool3 = filters.bool) === null || _filters$bool3 === void 0 ? void 0 : (_filters$bool3$filter = _filters$bool3.filter) === null || _filters$bool3$filter === void 0 ? void 0 : _filters$bool3$filter[key])
    };
  });
  filters.bool.filter = [...clientFiltersList, range];
  return filters;
};

exports.combineRangeWithFilters = combineRangeWithFilters;

const extractFilterAggsResults = (responseAggregations, keys) => {
  const values = {
    locations: [],
    ports: [],
    schemes: [],
    tags: []
  };
  keys.forEach(key => {
    var _ref3, _responseAggregations, _responseAggregations2;

    const buckets = (_ref3 = responseAggregations === null || responseAggregations === void 0 ? void 0 : (_responseAggregations = responseAggregations[key]) === null || _responseAggregations === void 0 ? void 0 : (_responseAggregations2 = _responseAggregations.term) === null || _responseAggregations2 === void 0 ? void 0 : _responseAggregations2.buckets) !== null && _ref3 !== void 0 ? _ref3 : [];
    values[key] = buckets.map(item => item.key);
  });
  return values;
};

exports.extractFilterAggsResults = extractFilterAggsResults;

const getFilterBar = async ({
  callES,
  dynamicSettings,
  dateRangeStart,
  dateRangeEnd,
  search,
  filterOptions
}) => {
  const aggs = (0, _generate_filter_aggs.generateFilterAggs)([{
    aggName: 'locations',
    filterName: 'locations',
    field: 'observer.geo.name'
  }, {
    aggName: 'ports',
    filterName: 'ports',
    field: 'url.port'
  }, {
    aggName: 'schemes',
    filterName: 'schemes',
    field: 'monitor.type'
  }, {
    aggName: 'tags',
    filterName: 'tags',
    field: 'tags'
  }], filterOptions);
  const filters = combineRangeWithFilters(dateRangeStart, dateRangeEnd, search);
  const params = {
    index: dynamicSettings.heartbeatIndices,
    body: {
      size: 0,
      query: { ...filters
      },
      aggs
    }
  };
  const {
    aggregations
  } = await callES('search', params);
  return extractFilterAggsResults(aggregations, ['tags', 'locations', 'ports', 'schemes']);
};

exports.getFilterBar = getFilterBar;