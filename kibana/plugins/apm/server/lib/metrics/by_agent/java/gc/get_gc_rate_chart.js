"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGcRateChart = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _elasticsearch_fieldnames = require("../../../../../../common/elasticsearch_fieldnames");

var _fetch_and_transform_gc_metrics = require("./fetch_and_transform_gc_metrics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const series = {
  [_elasticsearch_fieldnames.METRIC_JAVA_GC_COUNT]: {
    title: _i18n.i18n.translate('xpack.apm.agentMetrics.java.gcRate', {
      defaultMessage: 'GC rate'
    }),
    color: _eui_theme_light.default.euiColorVis0
  }
};
const chartBase = {
  title: _i18n.i18n.translate('xpack.apm.agentMetrics.java.gcRateChartTitle', {
    defaultMessage: 'Garbage collection per minute'
  }),
  key: 'gc_rate_line_chart',
  type: 'linemark',
  yUnit: 'integer',
  series
};

const getGcRateChart = (setup, serviceName, serviceNodeName) => {
  return (0, _fetch_and_transform_gc_metrics.fetchAndTransformGcMetrics)({
    setup,
    serviceName,
    serviceNodeName,
    chartBase,
    fieldName: _elasticsearch_fieldnames.METRIC_JAVA_GC_COUNT
  });
};

exports.getGcRateChart = getGcRateChart;