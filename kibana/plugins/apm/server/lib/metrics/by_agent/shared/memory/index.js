"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMemoryChartData = getMemoryChartData;
exports.percentMemoryUsedScript = void 0;

var _i18n = require("@kbn/i18n");

var _elasticsearch_fieldnames = require("../../../../../../common/elasticsearch_fieldnames");

var _fetch_and_transform_metrics = require("../../../fetch_and_transform_metrics");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const series = {
  memoryUsedMax: {
    title: _i18n.i18n.translate('xpack.apm.chart.memorySeries.systemMaxLabel', {
      defaultMessage: 'Max'
    })
  },
  memoryUsedAvg: {
    title: _i18n.i18n.translate('xpack.apm.chart.memorySeries.systemAverageLabel', {
      defaultMessage: 'Average'
    })
  }
};
const chartBase = {
  title: _i18n.i18n.translate('xpack.apm.serviceDetails.metrics.memoryUsageChartTitle', {
    defaultMessage: 'System memory usage'
  }),
  key: 'memory_usage_chart',
  type: 'linemark',
  yUnit: 'percent',
  series
};
const percentMemoryUsedScript = {
  lang: 'expression',
  source: `1 - doc['${_elasticsearch_fieldnames.METRIC_SYSTEM_FREE_MEMORY}'] / doc['${_elasticsearch_fieldnames.METRIC_SYSTEM_TOTAL_MEMORY}']`
};
exports.percentMemoryUsedScript = percentMemoryUsedScript;

async function getMemoryChartData(setup, serviceName, serviceNodeName) {
  return (0, _fetch_and_transform_metrics.fetchAndTransformMetrics)({
    setup,
    serviceName,
    serviceNodeName,
    chartBase,
    aggs: {
      memoryUsedAvg: {
        avg: {
          script: percentMemoryUsedScript
        }
      },
      memoryUsedMax: {
        max: {
          script: percentMemoryUsedScript
        }
      }
    },
    additionalFilters: [{
      exists: {
        field: _elasticsearch_fieldnames.METRIC_SYSTEM_FREE_MEMORY
      }
    }, {
      exists: {
        field: _elasticsearch_fieldnames.METRIC_SYSTEM_TOTAL_MEMORY
      }
    }]
  });
}