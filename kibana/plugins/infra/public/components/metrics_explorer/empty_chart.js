"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerEmptyChart = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetricsExplorerEmptyChart = function MetricsExplorerEmptyChart() {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "stats",
    title: _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.metricsExplorer.emptyChart.title",
      defaultMessage: "Chart Data Missing"
    })),
    body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.metricsExplorer.emptyChart.body",
      defaultMessage: "Unable to render chart."
    }))
  });
};

exports.MetricsExplorerEmptyChart = MetricsExplorerEmptyChart;