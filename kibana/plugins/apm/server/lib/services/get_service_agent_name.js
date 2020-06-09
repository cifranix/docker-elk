"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceAgentName = getServiceAgentName;

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _range_filter = require("../helpers/range_filter");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getServiceAgentName(serviceName, setup) {
  var _aggregations$agents$;

  const {
    start,
    end,
    client,
    indices
  } = setup;
  const params = {
    terminateAfter: 1,
    index: [indices['apm_oss.errorIndices'], indices['apm_oss.transactionIndices'], indices['apm_oss.metricsIndices']],
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
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: ['error', 'transaction', 'metric']
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }]
        }
      },
      aggs: {
        agents: {
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
  const agentName = aggregations === null || aggregations === void 0 ? void 0 : (_aggregations$agents$ = aggregations.agents.buckets[0]) === null || _aggregations$agents$ === void 0 ? void 0 : _aggregations$agents$.key;
  return {
    agentName
  };
}