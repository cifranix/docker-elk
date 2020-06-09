"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobDefinitionOutdatedCallout = void 0;

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
var JobDefinitionOutdatedCallout = function JobDefinitionOutdatedCallout(_ref) {
  var onRecreateMlJob = _ref.onRecreateMlJob;
  return _react2.default.createElement(_recreate_job_callout.RecreateJobCallout, {
    title: jobDefinitionOutdatedTitle,
    onRecreateMlJob: onRecreateMlJob
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.analysis.jobDefinitionOutdatedCalloutMessage",
    defaultMessage: "A newer version of the ML job is available. Recreate the job to deploy the newer version. This removes previously detected anomalies."
  }));
};

exports.JobDefinitionOutdatedCallout = JobDefinitionOutdatedCallout;

var jobDefinitionOutdatedTitle = _i18n.i18n.translate('xpack.infra.logs.analysis.jobDefinitionOutdatedCalloutTitle', {
  defaultMessage: 'ML job definition outdated'
});