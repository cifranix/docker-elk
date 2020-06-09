"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobConfigurationOutdatedCallout = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _recreate_job_callout = require("./recreate_job_callout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JobConfigurationOutdatedCallout = function JobConfigurationOutdatedCallout(_ref) {
  var onRecreateMlJob = _ref.onRecreateMlJob;
  return _react2.default.createElement(_recreate_job_callout.RecreateJobCallout, {
    title: jobConfigurationOutdatedTitle,
    onRecreateMlJob: onRecreateMlJob
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.analysis.jobConfigurationOutdatedCalloutMessage",
    defaultMessage: "The ML job was created using a different source configuration. Recreate the job to apply the current configuration. This removes previously detected anomalies."
  }));
};

exports.JobConfigurationOutdatedCallout = JobConfigurationOutdatedCallout;

var jobConfigurationOutdatedTitle = _i18n.i18n.translate('xpack.infra.logs.analysis.jobConfigurationOutdatedCalloutTitle', {
  defaultMessage: 'ML job configuration outdated'
});