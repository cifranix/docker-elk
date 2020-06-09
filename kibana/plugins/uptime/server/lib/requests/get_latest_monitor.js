"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLatestMonitor = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Get The monitor latest state sorted by timestamp with date range
const getLatestMonitor = async ({
  callES,
  dynamicSettings,
  dateStart,
  dateEnd,
  monitorId
}) => {
  var _ref, _result$aggregations, _result$aggregations$, _result$aggregations$2, _result$aggregations$3, _result$aggregations$4, _ping$_source;

  // TODO: Write tests for this function
  const params = {
    index: dynamicSettings.heartbeatIndices,
    body: {
      query: {
        bool: {
          filter: [{
            range: {
              '@timestamp': {
                gte: dateStart,
                lte: dateEnd
              }
            }
          }, ...(monitorId ? [{
            term: {
              'monitor.id': monitorId
            }
          }] : [])]
        }
      },
      size: 0,
      aggs: {
        by_id: {
          terms: {
            field: 'monitor.id',
            size: 1000
          },
          aggs: {
            latest: {
              top_hits: {
                size: 1,
                sort: {
                  '@timestamp': {
                    order: 'desc'
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const result = await callES('search', params);
  const ping = (_ref = (_result$aggregations = result.aggregations) === null || _result$aggregations === void 0 ? void 0 : (_result$aggregations$ = _result$aggregations.by_id.buckets) === null || _result$aggregations$ === void 0 ? void 0 : (_result$aggregations$2 = _result$aggregations$[0]) === null || _result$aggregations$2 === void 0 ? void 0 : (_result$aggregations$3 = _result$aggregations$2.latest.hits) === null || _result$aggregations$3 === void 0 ? void 0 : (_result$aggregations$4 = _result$aggregations$3.hits) === null || _result$aggregations$4 === void 0 ? void 0 : _result$aggregations$4[0]) !== null && _ref !== void 0 ? _ref : {};
  return { ...(ping === null || ping === void 0 ? void 0 : ping._source),
    timestamp: ping === null || ping === void 0 ? void 0 : (_ping$_source = ping._source) === null || _ping$_source === void 0 ? void 0 : _ping$_source['@timestamp']
  };
};

exports.getLatestMonitor = getLatestMonitor;