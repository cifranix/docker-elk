"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DownloadButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DownloadButton = function DownloadButton(_ref) {
  var getUrl = _ref.getUrl,
      job = _ref.job;

  var downloadReport = function downloadReport() {
    window.open(getUrl(job.id));
  };

  return _react.default.createElement(_eui.EuiButton, {
    size: "s",
    "data-test-subj": "downloadCompletedReportButton",
    "data-test-href": getUrl(job.id),
    onClick: function onClick() {
      downloadReport();
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.reporting.publicNotifier.downloadReportButtonLabel",
    defaultMessage: "Download report"
  }));
};

exports.DownloadButton = DownloadButton;