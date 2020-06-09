"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerBarChart = exports.MetricsExplorerAreaChart = exports.MetricExplorerSeriesChart = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

var _color_palette = require("../../../common/color_palette");

var _create_metric_label = require("./helpers/create_metric_label");

var _use_metrics_explorer_options = require("../../containers/metrics_explorer/use_metrics_explorer_options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetricExplorerSeriesChart = function MetricExplorerSeriesChart(props) {
  if (_use_metrics_explorer_options.MetricsExplorerChartType.bar === props.type) {
    return _react.default.createElement(MetricsExplorerBarChart, props);
  }

  return _react.default.createElement(MetricsExplorerAreaChart, props);
};

exports.MetricExplorerSeriesChart = MetricExplorerSeriesChart;

var MetricsExplorerAreaChart = function MetricsExplorerAreaChart(_ref) {
  var metric = _ref.metric,
      id = _ref.id,
      series = _ref.series,
      type = _ref.type,
      stack = _ref.stack;
  var color = metric.color && (0, _color_palette.colorTransformer)(metric.color) || (0, _color_palette.colorTransformer)(_color_palette.MetricsExplorerColor.color0);
  var yAccessor = "metric_".concat(id);
  var chartId = "series-".concat(series.id, "-").concat(yAccessor);
  var seriesAreaStyle = {
    line: {
      strokeWidth: 2,
      visible: true
    },
    area: {
      opacity: 0.5,
      visible: type === _use_metrics_explorer_options.MetricsExplorerChartType.area
    }
  };
  return _react.default.createElement(_charts.AreaSeries, {
    id: yAccessor,
    key: chartId,
    name: (0, _create_metric_label.createMetricLabel)(metric),
    xScaleType: _charts.ScaleType.Time,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: "timestamp",
    yAccessors: [yAccessor],
    data: series.rows,
    stackAccessors: stack ? ['timestamp'] : void 0,
    areaSeriesStyle: seriesAreaStyle,
    color: color
  });
};

exports.MetricsExplorerAreaChart = MetricsExplorerAreaChart;

var MetricsExplorerBarChart = function MetricsExplorerBarChart(_ref2) {
  var metric = _ref2.metric,
      id = _ref2.id,
      series = _ref2.series,
      stack = _ref2.stack;
  var color = metric.color && (0, _color_palette.colorTransformer)(metric.color) || (0, _color_palette.colorTransformer)(_color_palette.MetricsExplorerColor.color0);
  var yAccessor = "metric_".concat(id);
  var chartId = "series-".concat(series.id, "-").concat(yAccessor);
  var seriesBarStyle = {
    rectBorder: {
      stroke: color,
      strokeWidth: 1,
      visible: true
    },
    rect: {
      opacity: 1
    }
  };
  return _react.default.createElement(_charts.BarSeries, {
    id: yAccessor,
    key: chartId,
    name: (0, _create_metric_label.createMetricLabel)(metric),
    xScaleType: _charts.ScaleType.Time,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: "timestamp",
    yAccessors: [yAccessor],
    data: series.rows,
    stackAccessors: stack ? ['timestamp'] : void 0,
    barSeriesStyle: seriesBarStyle,
    color: color
  });
};

exports.MetricsExplorerBarChart = MetricsExplorerBarChart;