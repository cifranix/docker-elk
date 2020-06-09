"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServiceMapServiceNodeInfo = getServiceMapServiceNodeInfo;

var _range_filter = require("../helpers/range_filter");

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _memory = require("../metrics/by_agent/shared/memory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getServiceMapServiceNodeInfo({
  serviceName,
  environment,
  setup
}) {
  const {
    start,
    end
  } = setup;
  const filter = [{
    range: (0, _range_filter.rangeFilter)(start, end)
  }, {
    term: {
      [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
    }
  }, ...(environment ? [{
    term: {
      [_elasticsearch_fieldnames.SERVICE_ENVIRONMENT]: environment
    }
  }] : [])];
  const minutes = Math.abs((end - start) / (1000 * 60));
  const taskParams = {
    setup,
    minutes,
    filter
  };
  const [errorMetrics, transactionMetrics, cpuMetrics, memoryMetrics, instanceMetrics] = await Promise.all([getErrorMetrics(taskParams), getTransactionMetrics(taskParams), getCpuMetrics(taskParams), getMemoryMetrics(taskParams), getNumInstances(taskParams)]);
  return { ...errorMetrics,
    ...transactionMetrics,
    ...cpuMetrics,
    ...memoryMetrics,
    ...instanceMetrics
  };
}

async function getErrorMetrics({
  setup,
  minutes,
  filter
}) {
  const {
    client,
    indices
  } = setup;
  const response = await client.search({
    index: indices['apm_oss.errorIndices'],
    body: {
      size: 0,
      query: {
        bool: {
          filter: filter.concat({
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'error'
            }
          })
        }
      },
      track_total_hits: true
    }
  });
  return {
    avgErrorsPerMinute: response.hits.total.value > 0 ? response.hits.total.value / minutes : null
  };
}

async function getTransactionMetrics({
  setup,
  filter,
  minutes
}) {
  var _ref, _response$aggregation;

  const {
    indices,
    client
  } = setup;
  const response = await client.search({
    index: indices['apm_oss.transactionIndices'],
    body: {
      size: 1,
      query: {
        bool: {
          filter: filter.concat({
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
            }
          })
        }
      },
      track_total_hits: true,
      aggs: {
        duration: {
          avg: {
            field: _elasticsearch_fieldnames.TRANSACTION_DURATION
          }
        }
      }
    }
  });
  return {
    avgTransactionDuration: (_ref = (_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : _response$aggregation.duration.value) !== null && _ref !== void 0 ? _ref : null,
    avgRequestsPerMinute: response.hits.total.value > 0 ? response.hits.total.value / minutes : null
  };
}

async function getCpuMetrics({
  setup,
  filter
}) {
  var _ref2, _response$aggregation2;

  const {
    indices,
    client
  } = setup;
  const response = await client.search({
    index: indices['apm_oss.metricsIndices'],
    body: {
      size: 0,
      query: {
        bool: {
          filter: filter.concat([{
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'metric'
            }
          }, {
            exists: {
              field: _elasticsearch_fieldnames.METRIC_SYSTEM_CPU_PERCENT
            }
          }])
        }
      },
      aggs: {
        avgCpuUsage: {
          avg: {
            field: _elasticsearch_fieldnames.METRIC_SYSTEM_CPU_PERCENT
          }
        }
      }
    }
  });
  return {
    avgCpuUsage: (_ref2 = (_response$aggregation2 = response.aggregations) === null || _response$aggregation2 === void 0 ? void 0 : _response$aggregation2.avgCpuUsage.value) !== null && _ref2 !== void 0 ? _ref2 : null
  };
}

async function getMemoryMetrics({
  setup,
  filter
}) {
  var _ref3, _response$aggregation3;

  const {
    client,
    indices
  } = setup;
  const response = await client.search({
    index: indices['apm_oss.metricsIndices'],
    body: {
      query: {
        bool: {
          filter: filter.concat([{
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'metric'
            }
          }, {
            exists: {
              field: _elasticsearch_fieldnames.METRIC_SYSTEM_FREE_MEMORY
            }
          }, {
            exists: {
              field: _elasticsearch_fieldnames.METRIC_SYSTEM_TOTAL_MEMORY
            }
          }])
        }
      },
      aggs: {
        avgMemoryUsage: {
          avg: {
            script: _memory.percentMemoryUsedScript
          }
        }
      }
    }
  });
  return {
    avgMemoryUsage: (_ref3 = (_response$aggregation3 = response.aggregations) === null || _response$aggregation3 === void 0 ? void 0 : _response$aggregation3.avgMemoryUsage.value) !== null && _ref3 !== void 0 ? _ref3 : null
  };
}

async function getNumInstances({
  setup,
  filter
}) {
  var _response$aggregation4;

  const {
    client,
    indices
  } = setup;
  const response = await client.search({
    index: indices['apm_oss.transactionIndices'],
    body: {
      query: {
        bool: {
          filter: filter.concat([{
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
            }
          }, {
            exists: {
              field: _elasticsearch_fieldnames.SERVICE_NODE_NAME
            }
          }, {
            exists: {
              field: _elasticsearch_fieldnames.METRIC_SYSTEM_TOTAL_MEMORY
            }
          }])
        }
      },
      aggs: {
        instances: {
          cardinality: {
            field: _elasticsearch_fieldnames.SERVICE_NODE_NAME
          }
        }
      }
    }
  });
  return {
    numInstances: ((_response$aggregation4 = response.aggregations) === null || _response$aggregation4 === void 0 ? void 0 : _response$aggregation4.instances.value) || 1
  };
}