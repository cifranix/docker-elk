"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDistributionMax = getDistributionMax;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getDistributionMax(serviceName, transactionName, transactionType, setup) {
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
            range: {
              '@timestamp': {
                gte: start,
                lte: end,
                format: 'epoch_millis'
              }
            }
          }, ...uiFiltersES]
        }
      },
      aggs: {
        stats: {
          extended_stats: {
            field: _elasticsearch_fieldnames.TRANSACTION_DURATION
          }
        }
      }
    }
  };
  const resp = await client.search(params);
  return resp.aggregations ? resp.aggregations.stats.max : null;
}