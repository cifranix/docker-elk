"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTraceItems = getTraceItems;

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _range_filter = require("../helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getTraceItems(traceId, setup) {
  var _ref, _errorResponse$aggreg;

  const {
    start,
    end,
    client,
    config,
    indices
  } = setup;
  const maxTraceItems = config['xpack.apm.ui.maxTraceItems'];
  const excludedLogLevels = ['debug', 'info', 'warning'];
  const errorResponsePromise = client.search({
    index: indices['apm_oss.errorIndices'],
    body: {
      size: maxTraceItems,
      query: {
        bool: {
          filter: [{
            term: {
              [_elasticsearch_fieldnames.TRACE_ID]: traceId
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'error'
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }],
          must_not: {
            terms: {
              [_elasticsearch_fieldnames.ERROR_LOG_LEVEL]: excludedLogLevels
            }
          }
        }
      },
      aggs: {
        by_transaction_id: {
          terms: {
            field: _elasticsearch_fieldnames.TRANSACTION_ID,
            size: maxTraceItems,
            // high cardinality
            execution_hint: 'map'
          }
        }
      }
    }
  });
  const traceResponsePromise = client.search({
    index: [indices['apm_oss.spanIndices'], indices['apm_oss.transactionIndices']],
    body: {
      size: maxTraceItems,
      query: {
        bool: {
          filter: [{
            term: {
              [_elasticsearch_fieldnames.TRACE_ID]: traceId
            }
          }, {
            terms: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: ['span', 'transaction']
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }],
          should: {
            exists: {
              field: _elasticsearch_fieldnames.PARENT_ID
            }
          }
        }
      },
      sort: [{
        _score: {
          order: 'asc'
        }
      }, {
        [_elasticsearch_fieldnames.TRANSACTION_DURATION]: {
          order: 'desc'
        }
      }, {
        [_elasticsearch_fieldnames.SPAN_DURATION]: {
          order: 'desc'
        }
      }],
      track_total_hits: true
    }
  });
  const [errorResponse, traceResponse] = await Promise.all([errorResponsePromise, traceResponsePromise]);
  const exceedsMax = traceResponse.hits.total.value > maxTraceItems;
  const items = traceResponse.hits.hits.map(hit => hit._source);
  const errorFrequencies = {
    errorDocs: errorResponse.hits.hits.map(({
      _source
    }) => _source),
    errorsPerTransaction: (_ref = (_errorResponse$aggreg = errorResponse.aggregations) === null || _errorResponse$aggreg === void 0 ? void 0 : _errorResponse$aggreg.by_transaction_id.buckets.reduce((acc, current) => {
      return { ...acc,
        [current.key]: current.doc_count
      };
    }, {})) !== null && _ref !== void 0 ? _ref : {}
  };
  return {
    items,
    exceedsMax,
    ...errorFrequencies
  };
}