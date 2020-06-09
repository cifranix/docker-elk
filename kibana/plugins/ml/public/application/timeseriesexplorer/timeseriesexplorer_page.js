"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeSeriesExplorerPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _job_selector = require("../components/job_selector");

var _navigation_menu = require("../components/navigation_menu");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TimeSeriesExplorerPage = function TimeSeriesExplorerPage(_ref) {
  var children = _ref.children,
      dateFormatTz = _ref.dateFormatTz,
      loading = _ref.loading,
      resizeRef = _ref.resizeRef;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "timeseriesexplorer"
  }), loading === true && _react.default.createElement(_eui.EuiProgress, {
    className: "mlTimeSeriesExplorerProgress",
    color: "primary",
    size: "xs"
  }), loading === false && _react.default.createElement(_eui.EuiProgress, {
    className: "mlTimeSeriesExplorerProgress",
    value: 0,
    max: 100,
    color: "primary",
    size: "xs"
  }), _react.default.createElement(_job_selector.JobSelector, {
    dateFormatTz: dateFormatTz,
    singleSelection: true,
    timeseriesOnly: true
  }), _react.default.createElement("div", {
    className: "ml-time-series-explorer",
    ref: resizeRef,
    "data-test-subj": "mlPageSingleMetricViewer"
  }, _react.default.createElement(_eui.EuiPage, {
    style: {
      padding: '0px',
      background: 'none'
    }
  }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.timeSeriesExplorer.pageTitle",
    defaultMessage: "Single Metric Viewer"
  }))), children))));
};

exports.TimeSeriesExplorerPage = TimeSeriesExplorerPage;