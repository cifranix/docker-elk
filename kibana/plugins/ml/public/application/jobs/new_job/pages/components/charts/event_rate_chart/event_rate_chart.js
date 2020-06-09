"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventRateChart = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

var _axes = require("../common/axes");

var _settings = require("../common/settings");

var _loading_wrapper = require("../loading_wrapper");

var _anomalies = require("../common/anomalies");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EventRateChart = function EventRateChart(_ref) {
  var eventRateChartData = _ref.eventRateChartData,
      anomalyData = _ref.anomalyData,
      height = _ref.height,
      width = _ref.width,
      showAxis = _ref.showAxis,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      fadeChart = _ref.fadeChart;

  var _useChartColors = (0, _settings.useChartColors)(),
      EVENT_RATE_COLOR_WITH_ANOMALIES = _useChartColors.EVENT_RATE_COLOR_WITH_ANOMALIES,
      EVENT_RATE_COLOR = _useChartColors.EVENT_RATE_COLOR;

  var barColor = fadeChart ? EVENT_RATE_COLOR_WITH_ANOMALIES : EVENT_RATE_COLOR;
  return _react.default.createElement("div", {
    style: {
      width: width,
      height: height
    },
    "data-test-subj": "mlEventRateChart ".concat(eventRateChartData.length ? 'withData' : 'empty')
  }, _react.default.createElement(_loading_wrapper.LoadingWrapper, {
    height: height,
    hasData: eventRateChartData.length > 0,
    loading: loading
  }, _react.default.createElement(_charts.Chart, null, showAxis === true && _react.default.createElement(_axes.Axes, null), _react.default.createElement(_charts.Settings, {
    tooltip: _charts.TooltipType.None
  }), _react.default.createElement(_anomalies.Anomalies, {
    anomalyData: anomalyData
  }), _react.default.createElement(_charts.BarSeries, {
    id: "event_rate",
    xScaleType: _charts.ScaleType.Time,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: 'time',
    yAccessors: ['value'],
    data: eventRateChartData,
    color: barColor
  }))));
};

exports.EventRateChart = EventRateChart;