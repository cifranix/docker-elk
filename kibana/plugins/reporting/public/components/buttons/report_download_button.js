"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportDownloadButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _constants = require("../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ReportDownloadButton = function ReportDownloadButton(props) {
  var record = props.record,
      apiClient = props.apiClient,
      intl = props.intl;

  if (record.status !== _constants.JobStatuses.COMPLETED) {
    return null;
  }

  var button = _react.default.createElement(_eui.EuiButtonIcon, {
    onClick: function onClick() {
      return apiClient.downloadReport(record.id);
    },
    iconType: "importAction",
    "aria-label": intl.formatMessage({
      id: 'xpack.reporting.listing.table.downloadReportAriaLabel',
      defaultMessage: 'Download report'
    })
  });

  if (record.csv_contains_formulas) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: intl.formatMessage({
        id: 'xpack.reporting.listing.table.csvContainsFormulas',
        defaultMessage: 'Your CSV contains characters which spreadsheet applications can interpret as formulas.'
      })
    }, button);
  }

  if (record.max_size_reached) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: intl.formatMessage({
        id: 'xpack.reporting.listing.table.maxSizeReachedTooltip',
        defaultMessage: 'Max size reached, contains partial data.'
      })
    }, button);
  }

  return _react.default.createElement(_eui.EuiToolTip, {
    position: "top",
    content: intl.formatMessage({
      id: 'xpack.reporting.listing.table.downloadReport',
      defaultMessage: 'Download report'
    })
  }, button);
};

exports.ReportDownloadButton = ReportDownloadButton;