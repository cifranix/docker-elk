"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAgentNameByService = getAgentNameByService;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getAgentNameByService({
  serviceName,
  setup
}) {
  var _aggregations$agent_n;

  const {
    client,
    indices
  } = setup;
  const params = {
    terminateAfter: 1,
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
            term: {
              [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
            }
          }]
        }
      },
      aggs: {
        agent_names: {
          terms: {
            field: _elasticsearch_fieldnames.AGENT_NAME,
            size: 1
          }
        }
      }
    }
  };
  const {
    aggregations
  } = await client.search(params);
  const agentName = aggregations === null || aggregations === void 0 ? void 0 : (_aggregations$agent_n = aggregations.agent_names.buckets[0]) === null || _aggregations$agent_n === void 0 ? void 0 : _aggregations$agent_n.key;
  return agentName;
}