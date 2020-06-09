"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobHasProblem = exports.LogAnalysisJobProblemIndicator = void 0;

var _react = _interopRequireDefault(require("react"));

var _job_configuration_outdated_callout = require("./job_configuration_outdated_callout");

var _job_definition_outdated_callout = require("./job_definition_outdated_callout");

var _job_stopped_callout = require("./job_stopped_callout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogAnalysisJobProblemIndicator = function LogAnalysisJobProblemIndicator(_ref) {
  var jobStatus = _ref.jobStatus,
      setupStatus = _ref.setupStatus,
      onRecreateMlJobForReconfiguration = _ref.onRecreateMlJobForReconfiguration,
      onRecreateMlJobForUpdate = _ref.onRecreateMlJobForUpdate;

  if (isStopped(jobStatus)) {
    return _react.default.createElement(_job_stopped_callout.JobStoppedCallout, null);
  } else if (isUpdatable(setupStatus)) {
    return _react.default.createElement(_job_definition_outdated_callout.JobDefinitionOutdatedCallout, {
      onRecreateMlJob: onRecreateMlJobForUpdate
    });
  } else if (isReconfigurable(setupStatus)) {
    return _react.default.createElement(_job_configuration_outdated_callout.JobConfigurationOutdatedCallout, {
      onRecreateMlJob: onRecreateMlJobForReconfiguration
    });
  }

  return null; // no problem to indicate
};

exports.LogAnalysisJobProblemIndicator = LogAnalysisJobProblemIndicator;

var isStopped = function isStopped(jobStatus) {
  return jobStatus === 'stopped';
};

var isUpdatable = function isUpdatable(setupStatus) {
  return setupStatus === 'skippedButUpdatable';
};

var isReconfigurable = function isReconfigurable(setupStatus) {
  return setupStatus === 'skippedButReconfigurable';
};

var jobHasProblem = function jobHasProblem(jobStatus, setupStatus) {
  return isStopped(jobStatus) || isUpdatable(setupStatus) || isReconfigurable(setupStatus);
};

exports.jobHasProblem = jobHasProblem;