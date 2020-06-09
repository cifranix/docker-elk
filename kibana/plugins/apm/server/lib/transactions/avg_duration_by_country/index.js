"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionAvgDurationByCountry = getTransactionAvgDurationByCountry;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

var _range_filter = require("../../helpers/range_filter");

var _transaction_types = require("../../../../common/transaction_types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getTransactionAvgDurationByCountry({
  setup,
  serviceName,
  transactionName
}) {
  const {
    uiFiltersES,
    client,
    start,
    end,
    indices
  } = setup;
  const transactionNameFilter = transactionName ? [{
    term: {
      [_elasticsearch_fieldnames.TRANSACTION_NAME]: transactionName
    }
  }] : [];
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
          }, ...transactionNameFilter, {
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.TRANSACTION_TYPE]: _transaction_types.TRANSACTION_PAGE_LOAD
            }
          }, {
            exists: {
              field: _elasticsearch_fieldnames.CLIENT_GEO_COUNTRY_ISO_CODE
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }, ...uiFiltersES]
        }
      },
      aggs: {
        country_code: {
          terms: {
            field: _elasticsearch_fieldnames.CLIENT_GEO_COUNTRY_ISO_CODE,
            size: 500
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
  };
  const resp = await client.search(params);

  if (!resp.aggregations) {
    return [];
  }

  const buckets = resp.aggregations.country_code.buckets;
  const avgDurationsByCountry = buckets.map(({
    key,
    doc_count,
    avg_duration: {
      value
    }
  }) => ({
    key: key,
    docCount: doc_count,
    value: value === null ? 0 : value
  }));
  return avgDurationsByCountry;
}