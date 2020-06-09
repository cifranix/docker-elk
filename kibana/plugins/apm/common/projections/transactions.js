"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionsProjection = getTransactionsProjection;

var _elasticsearch_fieldnames = require("../elasticsearch_fieldnames");

var _range_filter = require("../../server/lib/helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function getTransactionsProjection({
  setup,
  serviceName,
  transactionName,
  transactionType
}) {
  const {
    start,
    end,
    uiFiltersES,
    indices
  } = setup;
  const transactionNameFilter = transactionName ? [{
    term: {
      [_elasticsearch_fieldnames.TRANSACTION_NAME]: transactionName
    }
  }] : [];
  const transactionTypeFilter = transactionType ? [{
    term: {
      [_elasticsearch_fieldnames.TRANSACTION_TYPE]: transactionType
    }
  }] : [];
  const serviceNameFilter = serviceName ? [{
    term: {
      [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
    }
  }] : [];
  const bool = {
    filter: [{
      range: (0, _range_filter.rangeFilter)(start, end)
    }, {
      term: {
        [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
      }
    }, ...transactionNameFilter, ...transactionTypeFilter, ...serviceNameFilter, ...uiFiltersES]
  };
  return {
    index: indices['apm_oss.transactionIndices'],
    body: {
      query: {
        bool
      }
    }
  };
}