"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTSVBLink = exports.createFilterFromOptions = exports.metricsExplorerMetricToTSVBMetric = void 0;

var _risonNode = require("rison-node");

var _uuid = _interopRequireDefault(require("uuid"));

var _lodash = require("lodash");

var _color_palette = require("../../../../common/color_palette");

var _use_metrics_explorer_options = require("../../../containers/metrics_explorer/use_metrics_explorer_options");

var _metric_to_format = require("./metric_to_format");

var _lib = require("../../../lib/lib");

var _create_metric_label = require("./create_metric_label");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var metricsExplorerMetricToTSVBMetric = function metricsExplorerMetricToTSVBMetric(metric) {
  if (metric.aggregation === 'rate') {
    var metricId = _uuid.default.v1();

    var positiveOnlyId = _uuid.default.v1();

    var derivativeId = _uuid.default.v1();

    return [{
      id: metricId,
      type: 'max',
      field: metric.field || void 0
    }, {
      id: derivativeId,
      type: 'derivative',
      field: metricId,
      unit: '1s'
    }, {
      id: positiveOnlyId,
      type: 'positive_only',
      field: derivativeId
    }];
  } else {
    return [{
      id: _uuid.default.v1(),
      type: metric.aggregation,
      field: metric.field || void 0
    }];
  }
};

exports.metricsExplorerMetricToTSVBMetric = metricsExplorerMetricToTSVBMetric;

var mapMetricToSeries = function mapMetricToSeries(chartOptions) {
  return function (metric) {
    var format = (0, _metric_to_format.metricToFormat)(metric);
    return {
      label: (0, _create_metric_label.createMetricLabel)(metric),
      axis_position: 'right',
      chart_type: 'line',
      color: metric.color && (0, _color_palette.colorTransformer)(metric.color) || (0, _color_palette.colorTransformer)(_color_palette.MetricsExplorerColor.color0),
      fill: chartOptions.type === _use_metrics_explorer_options.MetricsExplorerChartType.area ? 0.5 : 0,
      formatter: format === _lib.InfraFormatterType.bits ? _lib.InfraFormatterType.bytes : format,
      value_template: 'rate' === metric.aggregation ? '{{value}}/s' : '{{value}}',
      id: _uuid.default.v1(),
      line_width: 2,
      metrics: metricsExplorerMetricToTSVBMetric(metric),
      point_size: 0,
      separate_axis: 0,
      split_mode: 'everything',
      stacked: chartOptions.stack ? 'stacked' : 'none'
    };
  };
};

var createFilterFromOptions = function createFilterFromOptions(options, series) {
  var filters = [];

  if (options.filterQuery) {
    filters.push(options.filterQuery);
  }

  if (options.groupBy) {
    var id = series.id.replace('"', '\\"');
    filters.push("".concat(options.groupBy, " : \"").concat(id, "\""));
  }

  return {
    language: 'kuery',
    query: filters.join(' and ')
  };
};

exports.createFilterFromOptions = createFilterFromOptions;

var createTSVBLink = function createTSVBLink(source, options, series, timeRange, chartOptions) {
  var appState = {
    filters: [],
    linked: false,
    query: {
      language: 'kuery',
      query: ''
    },
    uiState: {},
    vis: {
      aggs: [],
      params: {
        axis_formatter: 'number',
        axis_position: 'left',
        axis_scale: 'normal',
        id: _uuid.default.v1(),
        default_index_pattern: source && source.metricAlias || 'metricbeat-*',
        index_pattern: source && source.metricAlias || 'metricbeat-*',
        interval: 'auto',
        series: options.metrics.map(mapMetricToSeries(chartOptions)),
        show_grid: 1,
        show_legend: 1,
        time_field: source && source.fields.timestamp || '@timestamp',
        type: 'timeseries',
        filter: createFilterFromOptions(options, series)
      },
      title: series.id,
      type: 'metrics'
    }
  };

  if (chartOptions.yAxisMode === _use_metrics_explorer_options.MetricsExplorerYAxisMode.fromZero) {
    (0, _lodash.set)(appState, 'vis.params.axis_min', 0);
  }

  var globalState = {
    refreshInterval: {
      pause: true,
      value: 0
    },
    time: {
      from: timeRange.from,
      to: timeRange.to
    }
  };
  return {
    app: 'kibana',
    hash: '/visualize/create',
    search: {
      type: 'metrics',
      _g: (0, _risonNode.encode)(globalState),
      _a: (0, _risonNode.encode)(appState)
    }
  };
};

exports.createTSVBLink = createTSVBLink;