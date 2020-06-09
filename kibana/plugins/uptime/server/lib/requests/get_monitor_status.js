"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonitorStatus = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const formatBuckets = async (buckets, numTimes) => {
  return buckets.filter(monitor => (monitor === null || monitor === void 0 ? void 0 : monitor.doc_count) > numTimes).map(({
    key,
    doc_count
  }) => ({ ...key,
    count: doc_count
  }));
};

const getLocationClause = locations => ({
  bool: {
    should: [...locations.map(location => ({
      term: {
        'observer.geo.name': location
      }
    }))]
  }
});

const getMonitorStatus = async ({
  callES,
  dynamicSettings,
  filters,
  locations,
  numTimes,
  timerange: {
    from,
    to
  }
}) => {
  const queryResults = [];
  let afterKey;

  do {
    var _result$aggregations, _result$aggregations$, _result$aggregations2, _result$aggregations3;

    // today this value is hardcoded. In the future we may support
    // multiple status types for this alert, and this will become a parameter
    const STATUS = 'down';
    const esParams = {
      index: dynamicSettings.heartbeatIndices,
      body: {
        query: {
          bool: {
            filter: [{
              term: {
                'monitor.status': STATUS
              }
            }, {
              range: {
                '@timestamp': {
                  gte: from,
                  lte: to
                }
              }
            }]
          }
        },
        size: 0,
        aggs: {
          monitors: {
            composite: {
              size: 2000,
              sources: [{
                monitor_id: {
                  terms: {
                    field: 'monitor.id'
                  }
                }
              }, {
                status: {
                  terms: {
                    field: 'monitor.status'
                  }
                }
              }, {
                location: {
                  terms: {
                    field: 'observer.geo.name',
                    missing_bucket: true
                  }
                }
              }]
            }
          }
        }
      }
    };
    /**
     * `filters` are an unparsed JSON string. We parse them and append the bool fields of the query
     * to the bool of the parsed filters.
     */

    if (filters) {
      const parsedFilters = JSON.parse(filters);
      esParams.body.query.bool = Object.assign({}, esParams.body.query.bool, parsedFilters.bool);
    }
    /**
     * Perform a logical `and` against the selected location filters.
     */


    if (locations.length) {
      esParams.body.query.bool.filter.push(getLocationClause(locations));
    }
    /**
     * We "paginate" results by utilizing the `afterKey` field
     * to tell Elasticsearch where it should start on subsequent queries.
     */


    if (afterKey) {
      esParams.body.aggs.monitors.composite.after = afterKey;
    }

    const result = await callES('search', esParams);
    afterKey = result === null || result === void 0 ? void 0 : (_result$aggregations = result.aggregations) === null || _result$aggregations === void 0 ? void 0 : (_result$aggregations$ = _result$aggregations.monitors) === null || _result$aggregations$ === void 0 ? void 0 : _result$aggregations$.after_key;
    queryResults.push(formatBuckets((result === null || result === void 0 ? void 0 : (_result$aggregations2 = result.aggregations) === null || _result$aggregations2 === void 0 ? void 0 : (_result$aggregations3 = _result$aggregations2.monitors) === null || _result$aggregations3 === void 0 ? void 0 : _result$aggregations3.buckets) || [], numTimes));
  } while (afterKey !== undefined);

  return (await Promise.all(queryResults)).reduce((acc, cur) => acc.concat(cur), []);
};

exports.getMonitorStatus = getMonitorStatus;