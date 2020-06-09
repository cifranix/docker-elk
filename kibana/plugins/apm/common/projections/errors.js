"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrorGroupsProjection = getErrorGroupsProjection;

var _elasticsearch_fieldnames = require("../elasticsearch_fieldnames");

var _range_filter = require("../../server/lib/helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function getErrorGroupsProjection({
  setup,
  serviceName
}) {
  const {
    start,
    end,
    uiFiltersES,
    indices
  } = setup;
  return {
    index: indices['apm_oss.errorIndices'],
    body: {
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
            range: (0, _range_filter.rangeFilter)(start, end)
          }, ...uiFiltersES]
        }
      },
      aggs: {
        error_groups: {
          terms: {
            field: _elasticsearch_fieldnames.ERROR_GROUP_ID
          }
        }
      }
    }
  };
}