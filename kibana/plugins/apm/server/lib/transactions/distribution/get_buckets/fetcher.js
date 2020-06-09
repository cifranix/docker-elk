"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bucketFetcher = bucketFetcher;

var _elasticsearch_fieldnames = require("../../../../../common/elasticsearch_fieldnames");

var _range_filter = require("../../../helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function bucketFetcher(serviceName, transactionName, transactionType, transactionId, traceId, distributionMax, bucketSize, setup) {
  const {
    start,
    end,
    uiFiltersES,
    client,
    indices
  } = setup;
  const params = {
    index: indices['apm_oss.transactionIndices'],
    body: {
      size: 0,
      query: {
        bool: {
          filter: [{
            term: {
              [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.TRANSACTION_TYPE]: transactionType
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.TRANSACTION_NAME]: transactionName
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }, ...uiFiltersES],
          should: [{
            term: {
              [_elasticsearch_fieldnames.TRACE_ID]: traceId
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.TRANSACTION_ID]: transactionId
            }
          }]
        }
      },
      aggs: {
        distribution: {
          histogram: {
            field: _elasticsearch_fieldnames.TRANSACTION_DURATION,
            interval: bucketSize,
            min_doc_count: 0,
            extended_bounds: {
              min: 0,
              max: distributionMax
            }
          },
          aggs: {
            samples: {
              filter: {
                term: {
                  [_elasticsearch_fieldnames.TRANSACTION_SAMPLED]: true
                }
              },
              aggs: {
                items: {
                  top_hits: {
                    _source: [_elasticsearch_fieldnames.TRANSACTION_ID, _elasticsearch_fieldnames.TRACE_ID],
                    size: 10
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const response = await client.search(params);
  return response;
}