"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeseriesFetcher = timeseriesFetcher;

var _elasticsearch_fieldnames = require("../../../../../common/elasticsearch_fieldnames");

var _get_bucket_size = require("../../../helpers/get_bucket_size");

var _range_filter = require("../../../helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function timeseriesFetcher({
  serviceName,
  transactionType,
  transactionName,
  setup
}) {
  const {
    start,
    end,
    uiFiltersES,
    client,
    indices
  } = setup;
  const {
    intervalString
  } = (0, _get_bucket_size.getBucketSize)(start, end, 'auto');
  const filter = [{
    term: {
      [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
    }
  }, {
    term: {
      [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
    }
  }, {
    range: (0, _range_filter.rangeFilter)(start, end)
  }, ...uiFiltersES];

  if (transactionName) {
    filter.push({
      term: {
        [_elasticsearch_fieldnames.TRANSACTION_NAME]: transactionName
      }
    });
  } // TODO reimplement these as uiFilters


  if (transactionType) {
    filter.push({
      term: {
        [_elasticsearch_fieldnames.TRANSACTION_TYPE]: transactionType
      }
    });
  }

  const params = {
    index: indices['apm_oss.transactionIndices'],
    body: {
      size: 0,
      query: {
        bool: {
          filter
        }
      },
      aggs: {
        response_times: {
          date_histogram: {
            field: '@timestamp',
            fixed_interval: intervalString,
            min_doc_count: 0,
            extended_bounds: {
              min: start,
              max: end
            }
          },
          aggs: {
            avg: {
              avg: {
                field: _elasticsearch_fieldnames.TRANSACTION_DURATION
              }
            },
            pct: {
              percentiles: {
                field: _elasticsearch_fieldnames.TRANSACTION_DURATION,
                percents: [95, 99]
              }
            }
          }
        },
        overall_avg_duration: {
          avg: {
            field: _elasticsearch_fieldnames.TRANSACTION_DURATION
          }
        },
        transaction_results: {
          terms: {
            field: _elasticsearch_fieldnames.TRANSACTION_RESULT,
            missing: ''
          },
          aggs: {
            timeseries: {
              date_histogram: {
                field: '@timestamp',
                fixed_interval: intervalString,
                min_doc_count: 0,
                extended_bounds: {
                  min: start,
                  max: end
                }
              }
            }
          }
        }
      }
    }
  };
  return client.search(params);
}