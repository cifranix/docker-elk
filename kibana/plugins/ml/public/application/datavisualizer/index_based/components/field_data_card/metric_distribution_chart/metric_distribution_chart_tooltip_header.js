"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricDistributionChartTooltipHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _kibana_field_format = require("../../../../../formatters/kibana_field_format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetricDistributionChartTooltipHeader = function MetricDistributionChartTooltipHeader(_ref) {
  var chartPoint = _ref.chartPoint,
      maxWidth = _ref.maxWidth,
      fieldFormat = _ref.fieldFormat;

  if (chartPoint === undefined) {
    return null;
  }

  return _react.default.createElement("div", {
    style: {
      maxWidth: maxWidth
    }
  }, chartPoint.dataMax > chartPoint.dataMin ? _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.metricDistributionChart.tooltipValueBetweenLabel",
    defaultMessage: "{percent}% of documents have values between {minValFormatted} and {maxValFormatted}",
    values: {
      percent: chartPoint.percent,
      minValFormatted: (0, _kibana_field_format.kibanaFieldFormat)(chartPoint.dataMin, fieldFormat),
      maxValFormatted: (0, _kibana_field_format.kibanaFieldFormat)(chartPoint.dataMax, fieldFormat)
    }
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.metricDistributionChart.tooltipValueEqualLabel",
    defaultMessage: "{percent}% of documents have a value of {valFormatted}",
    values: {
      percent: chartPoint.percent,
      valFormatted: (0, _kibana_field_format.kibanaFieldFormat)(chartPoint.dataMin, fieldFormat)
    }
  }));
};

exports.MetricDistributionChartTooltipHeader = MetricDistributionChartTooltipHeader;