"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExplorerLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _results = require("../../../jobs/jobs_list/components/job_actions/results");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore no module file
var ExplorerLink = function ExplorerLink(_ref) {
  var jobsList = _ref.jobsList;

  var openJobsInAnomalyExplorerText = _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.resultActions.openJobsInAnomalyExplorerText', {
    defaultMessage: 'Open {jobsCount, plural, one {{jobId}} other {# jobs}} in Anomaly Explorer',
    values: {
      jobsCount: jobsList.length,
      jobId: jobsList[0] && jobsList[0].id
    }
  });

  return _react.default.createElement(_eui.EuiToolTip, {
    position: "bottom",
    content: openJobsInAnomalyExplorerText
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "text",
    size: "xs",
    href: (0, _results.getLink)('explorer', jobsList),
    iconType: "tableOfContents",
    "aria-label": openJobsInAnomalyExplorerText,
    className: "results-button",
    "data-test-subj": "openOverviewJobsInAnomalyExplorer"
  }, _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.exploreActionName', {
    defaultMessage: 'Explore'
  })));
};

exports.ExplorerLink = ExplorerLink;