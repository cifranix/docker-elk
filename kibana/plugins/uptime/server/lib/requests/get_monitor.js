"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitor = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Get the monitor meta info regardless of timestamp
const getMonitor = async ({
  callES,
  dynamicSettings,
  monitorId
}) => {
  var _result$hits$hits$;

  const params = {
    index: dynamicSettings.heartbeatIndices,
    body: {
      size: 1,
      _source: ['url', 'monitor', 'observer'],
      query: {
        bool: {
          filter: [{
            term: {
              'monitor.id': monitorId
            }
          }]
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
  return (_result$hits$hits$ = result.hits.hits[0]) === null || _result$hits$hits$ === void 0 ? void 0 : _result$hits$hits$._source;
};

exports.getMonitor = getMonitor;