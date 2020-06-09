"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetcher = fetcher;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

var _range_filter = require("../../helpers/range_filter");

var _get_bucket_size = require("../../helpers/get_bucket_size");

var _transaction_types = require("../../../../common/transaction_types");

var _processor_event = require("../../../../common/processor_event");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function fetcher(options) {
  const {
    end,
    client,
    indices,
    start,
    uiFiltersES
  } = options.setup;
  const {
    serviceName
  } = options;
  const {
    intervalString
  } = (0, _get_bucket_size.getBucketSize)(start, end, 'auto');
  const filter = [{
    term: {
      [_elasticsearch_fieldnames.PROCESSOR_EVENT]: _processor_event.ProcessorEvent.transaction
    }
  }, {
    term: {
      [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
    }
  }, {
    term: {
      [_elasticsearch_fieldnames.TRANSACTION_TYPE]: _transaction_types.TRANSACTION_PAGE_LOAD
    }
  }, {
    range: (0, _range_filter.rangeFilter)(start, end)
  }, ...uiFiltersES];
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
        user_agent_keys: {
          terms: {
            field: _elasticsearch_fieldnames.USER_AGENT_NAME
          }
        },
        browsers: {
          date_histogram: {
            extended_bounds: {
              max: end,
              min: start
            },
            field: '@timestamp',
            fixed_interval: intervalString,
            min_doc_count: 0
          },
          aggs: {
            user_agent: {
              terms: {
                field: _elasticsearch_fieldnames.USER_AGENT_NAME
              },
              aggs: {
                avg_duration: {
                  avg: {
                    field: _elasticsearch_fieldnames.TRANSACTION_DURATION
                  }
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