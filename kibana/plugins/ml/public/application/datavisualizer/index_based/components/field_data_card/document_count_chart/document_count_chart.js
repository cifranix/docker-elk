"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentCountChart = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _charts = require("@elastic/charts");

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _use_ui_settings_context = require("../../../../../contexts/kibana/use_ui_settings_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SPEC_ID = 'document_count';

var DocumentCountChart = function DocumentCountChart(_ref) {
  var width = _ref.width,
      height = _ref.height,
      chartPoints = _ref.chartPoints,
      timeRangeEarliest = _ref.timeRangeEarliest,
      timeRangeLatest = _ref.timeRangeLatest;

  var seriesName = _i18n.i18n.translate('xpack.ml.fieldDataCard.documentCountChart.seriesLabel', {
    defaultMessage: 'document count'
  });

  var xDomain = {
    min: timeRangeEarliest,
    max: timeRangeLatest
  };
  var dateFormatter = (0, _charts.niceTimeFormatter)([timeRangeEarliest, timeRangeLatest]);
  var IS_DARK_THEME = (0, _use_ui_settings_context.useUiSettings)().get('theme:darkMode');
  var themeName = IS_DARK_THEME ? _eui_theme_dark.default : _eui_theme_light.default;
  var EVENT_RATE_COLOR = themeName.euiColorVis2;
  return _react.default.createElement("div", {
    style: {
      width: width,
      height: height
    }
  }, _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, {
    xDomain: xDomain,
    theme: {
      colors: {
        vizColors: [EVENT_RATE_COLOR]
      }
    }
  }), _react.default.createElement(_charts.Axis, {
    id: "bottom",
    position: _charts.Position.Bottom,
    showOverlappingTicks: true,
    tickFormat: dateFormatter
  }), _react.default.createElement(_charts.Axis, {
    id: "left",
    position: _charts.Position.Left
  }), _react.default.createElement(_charts.BarSeries, {
    id: SPEC_ID,
    name: seriesName,
    xScaleType: _charts.ScaleType.Time,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: "time",
    yAccessors: ['value'] // Display empty chart when no data in range
    ,
    data: chartPoints.length > 0 ? chartPoints : [{
      time: timeRangeEarliest,
      value: 0
    }]
  })));
};

exports.DocumentCountChart = DocumentCountChart;