"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupings = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const EMPTY_RESPONSE = {
  series: [{
    id: 'ALL',
    columns: [],
    rows: []
  }],
  pageInfo: {
    total: 0,
    afterKey: null
  }
};

const getGroupings = async (search, options) => {
  if (!options.groupBy) {
    return EMPTY_RESPONSE;
  }

  const limit = options.limit || 9;
  const params = {
    allowNoIndices: true,
    ignoreUnavailable: true,
    index: options.indexPattern,
    body: {
      size: 0,
      query: {
        bool: {
          should: [...options.metrics.filter(m => m.field).map(m => ({
            exists: {
              field: m.field
            }
          }))],
          filter: [{
            range: {
              [options.timerange.field]: {
                gte: options.timerange.from,
                lte: options.timerange.to,
                format: 'epoch_millis'
              }
            }
          }]
        }
      },
      aggs: {
        groupingsCount: {
          cardinality: {
            field: options.groupBy
          }
        },
        groupings: {
          composite: {
            size: limit,
            sources: [{
              groupBy: {
                terms: {
                  field: options.groupBy,
                  order: 'asc'
                }
              }
            }]
          }
        }
      }
    }
  };

  if (params.body.query.bool.should.length !== 0) {
    (0, _lodash.set)(params, 'body.query.bool.minimum_should_match', 1);
  }

  if (options.afterKey) {
    (0, _lodash.set)(params, 'body.aggs.groupings.composite.after', {
      groupBy: options.afterKey
    });
  }

  if (options.filterQuery) {
    try {
      const filterObject = JSON.parse(options.filterQuery);

      if ((0, _lodash.isObject)(filterObject)) {
        params.body.query.bool.filter.push(filterObject);
      }
    } catch (err) {
      params.body.query.bool.filter.push({
        query_string: {
          query: options.filterQuery,
          analyze_wildcard: true
        }
      });
    }
  }

  const response = await search(params);

  if (response.hits.total.value === 0) {
    return { ...EMPTY_RESPONSE,
      series: []
    };
  }

  if (!response.aggregations) {
    throw new Error('Aggregations should be present.');
  }

  const {
    groupings,
    groupingsCount
  } = response.aggregations;
  const {
    after_key: afterKey
  } = groupings;
  return {
    series: groupings.buckets.map(bucket => {
      return {
        id: bucket.key.groupBy,
        rows: [],
        columns: []
      };
    }),
    pageInfo: {
      total: groupingsCount.value,
      afterKey: afterKey && groupings.buckets.length === limit ? afterKey.groupBy : null
    }
  };
};

exports.getGroupings = getGroupings;