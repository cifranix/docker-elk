"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWarningFormulasToast = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../../src/plugins/kibana_react/public");

var _job_download_button = require("./job_download_button");

var _report_link = require("./report_link");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getWarningFormulasToast = function getWarningFormulasToast(job, getReportLink, getDownloadLink) {
  return {
    title: (0, _public.toMountPoint)(_react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.reporting.publicNotifier.csvContainsFormulas.formulaReportTitle",
      defaultMessage: "Report may contain formulas {reportObjectType} '{reportObjectTitle}'",
      values: {
        reportObjectType: job.type,
        reportObjectTitle: job.title
      }
    })),
    text: (0, _public.toMountPoint)(_react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.reporting.publicNotifier.csvContainsFormulas.formulaReportMessage",
      defaultMessage: "The report contains characters which spreadsheet applications can interpret as formulas."
    })), _react.default.createElement("p", null, _react.default.createElement(_report_link.ReportLink, {
      getUrl: getReportLink
    })), _react.default.createElement(_job_download_button.DownloadButton, {
      getUrl: getDownloadLink,
      job: job
    }))),
    'data-test-subj': 'completeReportCsvFormulasWarning'
  };
};

exports.getWarningFormulasToast = getWarningFormulasToast;