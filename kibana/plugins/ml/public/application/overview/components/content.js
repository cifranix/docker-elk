"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverviewContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _anomaly_detection_panel = require("./anomaly_detection_panel");

var _analytics_panel = require("./analytics_panel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Fetch jobs and determine what to show
var OverviewContent = function OverviewContent(_ref) {
  var createAnomalyDetectionJobDisabled = _ref.createAnomalyDetectionJobDisabled,
      createAnalyticsJobDisabled = _ref.createAnalyticsJobDisabled;
  return _react.default.createElement(_eui.EuiFlexItem, {
    grow: 3
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_anomaly_detection_panel.AnomalyDetectionPanel, {
    jobCreationDisabled: createAnomalyDetectionJobDisabled
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_analytics_panel.AnalyticsPanel, {
    jobCreationDisabled: createAnalyticsJobDisabled
  }))));
};

exports.OverviewContent = OverviewContent;