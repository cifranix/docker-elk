"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNonHeapMemoryChart = getNonHeapMemoryChart;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _elasticsearch_fieldnames = require("../../../../../../common/elasticsearch_fieldnames");

var _fetch_and_transform_metrics = require("../../../fetch_and_transform_metrics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const series = {
  nonHeapMemoryUsed: {
    title: _i18n.i18n.translate('xpack.apm.agentMetrics.java.nonHeapMemorySeriesUsed', {
      defaultMessage: 'Avg. used'
    }),
    color: _eui_theme_light.default.euiColorVis0
  },
  nonHeapMemoryCommitted: {
    title: _i18n.i18n.translate('xpack.apm.agentMetrics.java.nonHeapMemorySeriesCommitted', {
      defaultMessage: 'Avg. committed'
    }),
    color: _eui_theme_light.default.euiColorVis1
  }
};
const chartBase = {
  title: _i18n.i18n.translate('xpack.apm.agentMetrics.java.nonHeapMemoryChartTitle', {
    defaultMessage: 'Non-Heap Memory'
  }),
  key: 'non_heap_memory_area_chart',
  type: 'area',
  yUnit: 'bytes',
  series
};

async function getNonHeapMemoryChart(setup, serviceName, serviceNodeName) {
  return (0, _fetch_and_transform_metrics.fetchAndTransformMetrics)({
    setup,
    serviceName,
    serviceNodeName,
    chartBase,
    aggs: {
      nonHeapMemoryMax: {
        avg: {
          field: _elasticsearch_fieldnames.METRIC_JAVA_NON_HEAP_MEMORY_MAX
        }
      },
      nonHeapMemoryCommitted: {
        avg: {
          field: _elasticsearch_fieldnames.METRIC_JAVA_NON_HEAP_MEMORY_COMMITTED
        }
      },
      nonHeapMemoryUsed: {
        avg: {
          field: _elasticsearch_fieldnames.METRIC_JAVA_NON_HEAP_MEMORY_USED
        }
      }
    },
    additionalFilters: [{
      term: {
        [_elasticsearch_fieldnames.AGENT_NAME]: 'java'
      }
    }]
  });
}