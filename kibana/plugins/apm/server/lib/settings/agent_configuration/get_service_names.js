"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceNames = getServiceNames;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

var _all_option = require("../../../../common/agent_configuration/all_option");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getServiceNames({
  setup
}) {
  var _resp$aggregations;

  const {
    client,
    indices
  } = setup;
  const params = {
    index: [indices['apm_oss.metricsIndices'], indices['apm_oss.errorIndices'], indices['apm_oss.transactionIndices']],
    body: {
      size: 0,
      query: {
        bool: {
          filter: [{
            terms: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: ['transaction', 'error', 'metric']
            }
          }]
        }
      },
      aggs: {
        services: {
          terms: {
            field: _elasticsearch_fieldnames.SERVICE_NAME,
            size: 50
          }
        }
      }
    }
  };
  const resp = await client.search(params);
  const serviceNames = ((_resp$aggregations = resp.aggregations) === null || _resp$aggregations === void 0 ? void 0 : _resp$aggregations.services.buckets.map(bucket => bucket.key).sort()) || [];
  return [_all_option.ALL_OPTION_VALUE, ...serviceNames];
}