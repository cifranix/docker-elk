"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPingHistogram = void 0;

var _constants = require("../../../../../legacy/plugins/uptime/common/constants");

var _helper = require("../helper");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getPingHistogram = async ({
  callES,
  dynamicSettings,
  from,
  to,
  filters,
  monitorId,
  statusFilter
}) => {
  var _result$aggregations, _result$aggregations$, _ref, _result$aggregations2, _result$aggregations3;

  const boolFilters = filters ? JSON.parse(filters) : null;
  const additionalFilters = [];

  if (monitorId) {
    additionalFilters.push({
      match: {
        'monitor.id': monitorId
      }
    });
  }

  if (boolFilters) {
    additionalFilters.push(boolFilters);
  }

  const filter = (0, _helper.getFilterClause)(from, to, additionalFilters);
  const params = {
    index: dynamicSettings.heartbeatIndices,
    body: {
      query: {
        bool: {
          filter
        }
      },
      size: 0,
      aggs: {
        timeseries: {
          auto_date_histogram: {
            field: '@timestamp',
            buckets: _constants.QUERY.DEFAULT_BUCKET_COUNT
          },
          aggs: {
            down: {
              filter: {
                term: {
                  'monitor.status': 'down'
                }
              }
            },
            up: {
              filter: {
                term: {
                  'monitor.status': 'up'
                }
              }
            }
          }
        }
      }
    }
  };
  const result = await callES('search', params);
  const interval = (_result$aggregations = result.aggregations) === null || _result$aggregations === void 0 ? void 0 : (_result$aggregations$ = _result$aggregations.timeseries) === null || _result$aggregations$ === void 0 ? void 0 : _result$aggregations$.interval;
  const buckets = (_ref = result === null || result === void 0 ? void 0 : (_result$aggregations2 = result.aggregations) === null || _result$aggregations2 === void 0 ? void 0 : (_result$aggregations3 = _result$aggregations2.timeseries) === null || _result$aggregations3 === void 0 ? void 0 : _result$aggregations3.buckets) !== null && _ref !== void 0 ? _ref : [];
  const histogram = buckets.map(bucket => {
    const x = bucket.key;
    const downCount = bucket.down.doc_count;
    const upCount = bucket.up.doc_count;
    return {
      x,
      downCount: statusFilter && statusFilter !== 'down' ? 0 : downCount,
      upCount: statusFilter && statusFilter !== 'up' ? 0 : upCount,
      y: 1
    };
  });
  return {
    histogram,
    interval
  };
};

exports.getPingHistogram = getPingHistogram;