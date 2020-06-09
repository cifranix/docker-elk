"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricDistributionChart = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _charts = require("@elastic/charts");

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _metric_distribution_chart_tooltip_header = require("./metric_distribution_chart_tooltip_header");

var _use_ui_settings_context = require("../../../../../contexts/kibana/use_ui_settings_context");

var _kibana_field_format = require("../../../../../formatters/kibana_field_format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SPEC_ID = 'metric_distribution';

var MetricDistributionChart = function MetricDistributionChart(_ref) {
  var width = _ref.width,
      height = _ref.height,
      chartData = _ref.chartData,
      fieldFormat = _ref.fieldFormat;

  // This value is shown to label the y axis values in the tooltip.
  // Ideally we wouldn't show these values at all in the tooltip,
  // but this is not yet possible with Elastic charts.
  var seriesName = _i18n.i18n.translate('xpack.ml.fieldDataCard.metricDistributionChart.seriesName', {
    defaultMessage: 'distribution'
  });

  var IS_DARK_THEME = (0, _use_ui_settings_context.useUiSettings)().get('theme:darkMode');
  var themeName = IS_DARK_THEME ? _eui_theme_dark.default : _eui_theme_light.default;
  var AREA_SERIES_COLOR = themeName.euiColorVis1;

  var headerFormatter = function headerFormatter(tooltipData) {
    var xValue = tooltipData.value;
    var chartPoint = chartData.find(function (data) {
      return data.x === xValue;
    });
    return _react.default.createElement(_metric_distribution_chart_tooltip_header.MetricDistributionChartTooltipHeader, {
      chartPoint: chartPoint,
      maxWidth: width / 2,
      fieldFormat: fieldFormat
    });
  };

  return _react.default.createElement("div", {
    style: {
      width: width,
      height: height
    }
  }, _react.default.createElement(_charts.Chart, null, _react.default.createElement(_charts.Settings, {
    theme: {
      colors: {
        vizColors: [AREA_SERIES_COLOR]
      },
      areaSeriesStyle: {
        line: {
          strokeWidth: 1,
          visible: true
        },
        point: {
          visible: false,
          radius: 0,
          opacity: 0
        },
        area: {
          visible: true,
          opacity: 1
        }
      }
    },
    tooltip: {
      headerFormatter: headerFormatter
    }
  }), _react.default.createElement(_charts.Axis, {
    id: "bottom",
    position: _charts.Position.Bottom,
    tickFormat: function tickFormat(d) {
      return (0, _kibana_field_format.kibanaFieldFormat)(d, fieldFormat);
    }
  }), _react.default.createElement(_charts.Axis, {
    id: "left",
    position: _charts.Position.Left,
    tickFormat: function tickFormat(d) {
      return d.toFixed(3);
    },
    hide: true
  }), _react.default.createElement(_charts.AreaSeries, {
    id: SPEC_ID,
    name: seriesName,
    xScaleType: _charts.ScaleType.Linear,
    yScaleType: _charts.ScaleType.Linear,
    xAccessor: "x",
    yAccessors: ['y'],
    data: chartData.length > 0 ? chartData : [{
      x: 0,
      y: 0
    }],
    curve: _charts.CurveType.CURVE_STEP_AFTER
  })));
};

exports.MetricDistributionChart = MetricDistributionChart;