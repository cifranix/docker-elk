"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resp = exports.createSeries = exports.timeRange = exports.derivedIndexPattern = exports.chartOptions = exports.source = exports.options = void 0;

var _use_metrics_explorer_options = require("../../containers/metrics_explorer/use_metrics_explorer_options");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var options = {
  limit: 3,
  groupBy: 'host.name',
  aggregation: 'avg',
  metrics: [{
    aggregation: 'avg',
    field: 'system.cpu.user.pct'
  }]
};
exports.options = options;
var source = {
  name: 'default',
  description: '',
  logAlias: 'filebeat-*',
  metricAlias: 'metricbeat-*',
  logColumns: [],
  fields: {
    host: 'host.name',
    container: 'container.id',
    pod: 'kubernetes.pod.uid',
    timestamp: '@timestamp',
    message: ['message'],
    tiebreaker: '@timestamp'
  }
};
exports.source = source;
var chartOptions = {
  type: _use_metrics_explorer_options.MetricsExplorerChartType.line,
  yAxisMode: _use_metrics_explorer_options.MetricsExplorerYAxisMode.fromZero,
  stack: false
};
exports.chartOptions = chartOptions;
var derivedIndexPattern = {
  title: 'metricbeat-*',
  fields: []
};
exports.derivedIndexPattern = derivedIndexPattern;
var timeRange = {
  from: 'now-1h',
  to: 'now',
  interval: '>=10s'
};
exports.timeRange = timeRange;

var createSeries = function createSeries(id) {
  return {
    id: id,
    columns: [{
      name: 'timestamp',
      type: 'date'
    }, {
      name: 'metric_0',
      type: 'number'
    }, {
      name: 'groupBy',
      type: 'string'
    }],
    rows: [{
      timestamp: 1,
      metric_0: 0.5,
      groupBy: id
    }, {
      timestamp: 2,
      metric_0: 0.5,
      groupBy: id
    }, {
      timestamp: 3,
      metric_0: 0.5,
      groupBy: id
    }]
  };
};

exports.createSeries = createSeries;
var resp = {
  pageInfo: {
    total: 10,
    afterKey: 'host-04'
  },
  series: [createSeries('host-01'), createSeries('host-02'), createSeries('host-03')]
};
exports.resp = resp;