"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarChart = exports.AreaChart = exports.SeriesChart = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SeriesChart = function SeriesChart(props) {
  if (props.type === 'bar') {
    return _react.default.createElement(BarChart, props);
  }

  return _react.default.createElement(AreaChart, props);
};

exports.SeriesChart = SeriesChart;

var AreaChart = function AreaChart(_ref) {
  var id = _ref.id,
      color = _ref.color,
      series = _ref.series,
      name = _ref.name,
      type = _ref.type,
      stack = _ref.stack;
  var style = {
    area: {
      opacity: 1,
      visible: 'area' === type
    },
    line: {
      strokeWidth: 'area' === type ? 1 : 2,
      visible: true
    }
  };
  return _react.default.createElement(_charts.AreaSeries, {
    id: id,
    name: name,
    xScaleType: _charts.ScaleType.Time,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: "timestamp",
    yAccessors: ['value'],
    data: series.data,
    areaSeriesStyle: style,
    color: color ? color : void 0,
    stackAccessors: stack ? ['timestamp'] : void 0
  });
};

exports.AreaChart = AreaChart;

var BarChart = function BarChart(_ref2) {
  var id = _ref2.id,
      color = _ref2.color,
      series = _ref2.series,
      name = _ref2.name,
      type = _ref2.type,
      stack = _ref2.stack;
  var style = {
    rectBorder: {
      stroke: color || void 0,
      strokeWidth: 1,
      visible: true
    },
    rect: {
      opacity: 1
    }
  };
  return _react.default.createElement(_charts.BarSeries, {
    id: id,
    name: name,
    xScaleType: _charts.ScaleType.Time,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: "timestamp",
    yAccessors: ['value'],
    data: series.data,
    barSeriesStyle: style,
    color: color ? color : void 0,
    stackAccessors: stack ? ['timestamp'] : void 0
  });
};

exports.BarChart = BarChart;