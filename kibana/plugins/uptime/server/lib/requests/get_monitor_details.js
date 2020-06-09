"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitorDetails = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getMonitorDetails = async ({
  callES,
  dynamicSettings,
  monitorId,
  dateStart,
  dateEnd
}) => {
  var _result$hits$hits$;

  const queryFilters = [{
    range: {
      '@timestamp': {
        gte: dateStart,
        lte: dateEnd
      }
    }
  }, {
    term: {
      'monitor.id': monitorId
    }
  }];
  const params = {
    index: dynamicSettings.heartbeatIndices,
    body: {
      size: 1,
      _source: ['error', '@timestamp'],
      query: {
        bool: {
          must: [{
            exists: {
              field: 'error'
            }
          }],
          filter: queryFilters
        }
      },
      sort: [{
        '@timestamp': {
          order: 'desc'
        }
      }]
    }
  };
  const result = await callES('search', params);
  const data = (_result$hits$hits$ = result.hits.hits[0]) === null || _result$hits$hits$ === void 0 ? void 0 : _result$hits$hits$._source;
  const monitorError = data === null || data === void 0 ? void 0 : data.error;
  const errorTimeStamp = data === null || data === void 0 ? void 0 : data['@timestamp'];
  return {
    monitorId,
    error: monitorError,
    timestamp: errorTimeStamp
  };
};

exports.getMonitorDetails = getMonitorDetails;