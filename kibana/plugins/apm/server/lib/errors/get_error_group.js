"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrorGroup = getErrorGroup;

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _range_filter = require("../helpers/range_filter");

var _get_transaction = require("../transactions/get_transaction");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: rename from "getErrorGroup"  to "getErrorGroupSample" (since a single error is returned, not an errorGroup)
async function getErrorGroup({
  serviceName,
  groupId,
  setup
}) {
  var _resp$hits$hits$, _error$transaction, _error$trace;

  const {
    start,
    end,
    uiFiltersES,
    client,
    indices
  } = setup;
  const params = {
    index: indices['apm_oss.errorIndices'],
    body: {
      size: 1,
      query: {
        bool: {
          filter: [{
            term: {
              [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'error'
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.ERROR_GROUP_ID]: groupId
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }, ...uiFiltersES],
          should: [{
            term: {
              [_elasticsearch_fieldnames.TRANSACTION_SAMPLED]: true
            }
          }]
        }
      },
      sort: [{
        _score: 'desc'
      }, // sort by _score first to ensure that errors with transaction.sampled:true ends up on top
      {
        '@timestamp': {
          order: 'desc'
        }
      }]
    }
  };
  const resp = await client.search(params);
  const error = (_resp$hits$hits$ = resp.hits.hits[0]) === null || _resp$hits$hits$ === void 0 ? void 0 : _resp$hits$hits$._source;
  const transactionId = error === null || error === void 0 ? void 0 : (_error$transaction = error.transaction) === null || _error$transaction === void 0 ? void 0 : _error$transaction.id;
  const traceId = error === null || error === void 0 ? void 0 : (_error$trace = error.trace) === null || _error$trace === void 0 ? void 0 : _error$trace.id;
  let transaction;

  if (transactionId && traceId) {
    transaction = await (0, _get_transaction.getTransaction)({
      transactionId,
      traceId,
      setup
    });
  }

  return {
    transaction,
    error,
    occurrencesCount: resp.hits.total.value
  };
}