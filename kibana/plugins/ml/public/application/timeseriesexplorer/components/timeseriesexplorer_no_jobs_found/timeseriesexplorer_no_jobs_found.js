"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeseriesexplorerNoJobsFound = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * React component for rendering EuiEmptyPrompt when no jobs were found.
 */
var TimeseriesexplorerNoJobsFound = function TimeseriesexplorerNoJobsFound() {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    "data-test-subj": "mlNoSingleMetricJobsFound",
    iconType: "alert",
    title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.timeSeriesExplorer.noSingleMetricJobsFoundLabel",
      defaultMessage: "No single metric jobs found"
    })),
    actions: _react.default.createElement(_eui.EuiButton, {
      color: "primary",
      fill: true,
      href: "ml#/jobs"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.timeSeriesExplorer.createNewSingleMetricJobLinkText",
      defaultMessage: "Create new single metric job"
    }))
  });
};

exports.TimeseriesexplorerNoJobsFound = TimeseriesexplorerNoJobsFound;