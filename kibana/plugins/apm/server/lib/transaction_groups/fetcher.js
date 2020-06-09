"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionGroupsFetcher = transactionGroupsFetcher;

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _transaction_groups = require("../../../common/projections/transaction_groups");

var _merge_projection = require("../../../common/projections/util/merge_projection");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function transactionGroupsFetcher(options, setup) {
  const {
    client
  } = setup;
  const projection = (0, _transaction_groups.getTransactionGroupsProjection)({
    setup,
    options
  });
  const sort = [{
    _score: 'desc'
  }, // sort by _score to ensure that buckets with sampled:true ends up on top
  {
    '@timestamp': {
      order: 'desc'
    }
  }];
  const isTopTraces = options.type === 'top_traces';

  if (isTopTraces) {
    // Delete the projection aggregation when searching for traces, as it should use the combined aggregation instead
    delete projection.body.aggs;
  }

  const params = (0, _merge_projection.mergeProjection)(projection, {
    body: {
      size: 0,
      query: {
        bool: {
          // prefer sampled transactions
          should: [{
            term: {
              [_elasticsearch_fieldnames.TRANSACTION_SAMPLED]: true
            }
          }]
        }
      },
      aggs: {
        transaction_groups: {
          composite: {
            size: 10000,
            sources: [...(isTopTraces ? [{
              service: {
                terms: {
                  field: _elasticsearch_fieldnames.SERVICE_NAME
                }
              }
            }] : []), {
              transaction: {
                terms: {
                  field: _elasticsearch_fieldnames.TRANSACTION_NAME
                }
              }
            }]
          },
          aggs: {
            sample: {
              top_hits: {
                size: 1,
                sort
              }
            },
            avg: {
              avg: {
                field: _elasticsearch_fieldnames.TRANSACTION_DURATION
              }
            },
            p95: {
              percentiles: {
                field: _elasticsearch_fieldnames.TRANSACTION_DURATION,
                percents: [95]
              }
            },
            sum: {
              sum: {
                field: _elasticsearch_fieldnames.TRANSACTION_DURATION
              }
            }
          }
        }
      }
    }
  });
  return client.search(params);
}