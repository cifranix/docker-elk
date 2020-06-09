"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scatter = void 0;

var _react = _interopRequireDefault(require("react"));

var _charts = require("@elastic/charts");

var _settings = require("../common/settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SPEC_ID = 'scatter';

var scatterSeriesStyle = _objectSpread({}, _settings.seriesStyle, {
  line: _objectSpread({}, _settings.seriesStyle.line, {
    visible: false
  }),
  point: _objectSpread({}, _settings.seriesStyle.point, {
    visible: true
  })
});

var Scatter = function Scatter(_ref) {
  var chartData = _ref.chartData;

  var _useChartColors = (0, _settings.useChartColors)(),
      LINE_COLOR = _useChartColors.LINE_COLOR;

  return _react.default.createElement(_charts.LineSeries, {
    id: SPEC_ID,
    xScaleType: _charts.ScaleType.Time,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: 'time',
    yAccessors: ['value'],
    data: chartData,
    yScaleToDataExtent: false,
    curve: _charts.CurveType.CURVE_MONOTONE_X,
    lineSeriesStyle: scatterSeriesStyle,
    color: LINE_COLOR
  });
};

exports.Scatter = Scatter;