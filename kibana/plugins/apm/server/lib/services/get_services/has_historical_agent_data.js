"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasHistoricalAgentData = hasHistoricalAgentData;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Note: this logic is duplicated in tutorials/apm/envs/on_prem
async function hasHistoricalAgentData(setup) {
  const {
    client,
    indices
  } = setup;
  const params = {
    terminateAfter: 1,
    index: [indices['apm_oss.errorIndices'], indices['apm_oss.metricsIndices'], indices['apm_oss.sourcemapIndices'], indices['apm_oss.transactionIndices']],
    body: {
      size: 0,
      query: {
        bool: {
          filter: [{
            terms: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: ['error', 'metric', 'sourcemap', 'transaction']
            }
          }]
        }
      }
    }
  };
  const resp = await client.search(params);
  const hasHistorialAgentData = resp.hits.total.value > 0;
  return hasHistorialAgentData;
}