"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobStoppedCallout = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JobStoppedCallout = function JobStoppedCallout() {
  return _react.default.createElement(_eui.EuiCallOut, {
    color: "primary",
    title: jobStoppedTitle
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.logs.analysis.jobStoppedCalloutMessage",
    defaultMessage: "The ML job has been stopped manually or due to a lack of resources. New log entries will not be processed until the job has been restarted.",
    tagName: "p"
  }));
};

exports.JobStoppedCallout = JobStoppedCallout;

var jobStoppedTitle = _i18n.i18n.translate('xpack.infra.logs.analysis.jobStoppedCalloutTitle', {
  defaultMessage: 'ML job stopped'
});