"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServicesProjection = getServicesProjection;

var _elasticsearch_fieldnames = require("../elasticsearch_fieldnames");

var _range_filter = require("../../server/lib/helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function getServicesProjection({
  setup
}) {
  const {
    start,
    end,
    uiFiltersES,
    indices
  } = setup;
  return {
    index: [indices['apm_oss.metricsIndices'], indices['apm_oss.errorIndices'], indices['apm_oss.transactionIndices']],
    body: {
      size: 0,
      query: {
        bool: {
          filter: [{
            terms: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: ['transaction', 'error', 'metric']
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }, ...uiFiltersES]
        }
      },
      aggs: {
        services: {
          terms: {
            field: _elasticsearch_fieldnames.SERVICE_NAME
          }
        }
      }
    }
  };
}