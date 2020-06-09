"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceTransactionTypes = getServiceTransactionTypes;

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _range_filter = require("../helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getServiceTransactionTypes(serviceName, setup) {
  const {
    start,
    end,
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
            terms: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: ['transaction']
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }]
        }
      },
      aggs: {
        types: {
          terms: {
            field: _elasticsearch_fieldnames.TRANSACTION_TYPE,
            size: 100
          }
        }
      }
    }
  };
  const {
    aggregations
  } = await client.search(params);
  const transactionTypes = (aggregations === null || aggregations === void 0 ? void 0 : aggregations.types.buckets.map(bucket => bucket.key)) || [];
  return {
    transactionTypes
  };
}