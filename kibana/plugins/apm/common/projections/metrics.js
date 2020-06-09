"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMetricsProjection = getMetricsProjection;

var _elasticsearch_fieldnames = require("../elasticsearch_fieldnames");

var _range_filter = require("../../server/lib/helpers/range_filter");

var _service_nodes = require("../service_nodes");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function getServiceNodeNameFilters(serviceNodeName) {
  if (!serviceNodeName) {
    return [];
  }

  if (serviceNodeName === _service_nodes.SERVICE_NODE_NAME_MISSING) {
    return [{
      bool: {
        must_not: [{
          exists: {
            field: _elasticsearch_fieldnames.SERVICE_NODE_NAME
          }
        }]
      }
    }];
  }

  return [{
    term: {
      [_elasticsearch_fieldnames.SERVICE_NODE_NAME]: serviceNodeName
    }
  }];
}

function getMetricsProjection({
  setup,
  serviceName,
  serviceNodeName
}) {
  const {
    start,
    end,
    uiFiltersES,
    indices
  } = setup;
  const filter = [{
    term: {
      [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
    }
  }, {
    term: {
      [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'metric'
    }
  }, {
    range: (0, _range_filter.rangeFilter)(start, end)
  }, ...getServiceNodeNameFilters(serviceNodeName), ...uiFiltersES];
  return {
    index: indices['apm_oss.metricsIndices'],
    body: {
      query: {
        bool: {
          filter
        }
      }
    }
  };
}