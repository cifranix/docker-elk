"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnvironments = getEnvironments;

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _range_filter = require("../helpers/range_filter");

var _environment_filter_values = require("../../../common/environment_filter_values");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getEnvironments(setup, serviceName) {
  const {
    start,
    end,
    client,
    indices
  } = setup;
  const filter = [{
    terms: {
      [_elasticsearch_fieldnames.PROCESSOR_EVENT]: ['transaction', 'error', 'metric']
    }
  }, {
    range: (0, _range_filter.rangeFilter)(start, end)
  }];

  if (serviceName) {
    filter.push({
      term: {
        [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
      }
    });
  }

  const params = {
    index: [indices['apm_oss.metricsIndices'], indices['apm_oss.errorIndices'], indices['apm_oss.transactionIndices']],
    body: {
      size: 0,
      query: {
        bool: {
          filter
        }
      },
      aggs: {
        environments: {
          terms: {
            field: _elasticsearch_fieldnames.SERVICE_ENVIRONMENT,
            missing: _environment_filter_values.ENVIRONMENT_NOT_DEFINED
          }
        }
      }
    }
  };
  const resp = await client.search(params);
  const aggs = resp.aggregations;
  const environmentsBuckets = (aggs === null || aggs === void 0 ? void 0 : aggs.environments.buckets) || [];
  const environments = environmentsBuckets.map(environmentBucket => environmentBucket.key);
  return environments;
}