"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomaliesTableExpandedRow = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _log_analysis_results = require("../../../../../components/logging/log_analysis_results");

var _data_formatters = require("../helpers/data_formatters");

var _chart = require("./chart");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AnomaliesTableExpandedRow = function AnomaliesTableExpandedRow(_ref) {
  var results = _ref.results,
      timeRange = _ref.timeRange,
      setTimeRange = _ref.setTimeRange,
      partitionId = _ref.partitionId,
      jobId = _ref.jobId;
  var logEntryRateSeries = (0, _react.useMemo)(function () {
    return (results === null || results === void 0 ? void 0 : results.histogramBuckets) ? (0, _data_formatters.getLogEntryRateSeriesForPartition)(results, partitionId) : [];
  }, [results, partitionId]);
  var anomalyAnnotations = (0, _react.useMemo)(function () {
    return (results === null || results === void 0 ? void 0 : results.histogramBuckets) ? (0, _data_formatters.getAnnotationsForPartition)(results, partitionId) : {
      warning: [],
      minor: [],
      major: [],
      critical: []
    };
  }, [results, partitionId]);
  var totalNumberOfLogEntries = (0, _react.useMemo)(function () {
    return (results === null || results === void 0 ? void 0 : results.histogramBuckets) ? (0, _data_formatters.getTotalNumberOfLogEntriesForPartition)(results, partitionId) : undefined;
  }, [results, partitionId]);
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 8
  }, _react.default.createElement(_chart.AnomaliesChart, {
    chartId: "".concat(partitionId, "-anomalies"),
    timeRange: timeRange,
    setTimeRange: setTimeRange,
    series: logEntryRateSeries,
    annotations: anomalyAnnotations
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiStat, {
    title: (0, _numeral.default)(totalNumberOfLogEntries).format('0.00a'),
    titleSize: "m",
    description: _i18n.i18n.translate('xpack.infra.logs.analysis.anomaliesExpandedRowNumberOfLogEntriesDescription', {
      defaultMessage: 'Number of log entries'
    }),
    reverse: true
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_analysis_results.AnalyzeInMlButton, {
    jobId: jobId,
    timeRange: timeRange,
    partition: partitionId
  })))));
};

exports.AnomaliesTableExpandedRow = AnomaliesTableExpandedRow;