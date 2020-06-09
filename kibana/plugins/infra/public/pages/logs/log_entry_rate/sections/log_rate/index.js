"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogRateResults = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _beta_badge = require("../../../../../components/beta_badge");

var _loading_overlay_wrapper = require("../../../../../components/loading_overlay_wrapper");

var _data_formatters = require("../helpers/data_formatters");

var _bar_chart = require("./bar_chart");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogRateResults = function LogRateResults(_ref) {
  var isLoading = _ref.isLoading,
      results = _ref.results,
      setTimeRange = _ref.setTimeRange,
      timeRange = _ref.timeRange;
  var logEntryRateSeries = (0, _react.useMemo)(function () {
    return results && results.histogramBuckets ? (0, _data_formatters.getLogEntryRatePartitionedSeries)(results) : [];
  }, [results]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m",
    "aria-label": title
  }, _react.default.createElement("h2", null, title, " ", _react.default.createElement(_beta_badge.BetaBadge, null))), _react.default.createElement(_loading_overlay_wrapper.LoadingOverlayWrapper, {
    isLoading: isLoading,
    loadingChildren: _react.default.createElement(LoadingOverlayContent, null)
  }, !results || results && results.histogramBuckets && !results.histogramBuckets.length ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.infra.logs.analysis.logRateSectionNoDataTitle', {
      defaultMessage: 'There is no data to display.'
    })),
    titleSize: "m",
    body: _react.default.createElement("p", null, _i18n.i18n.translate('xpack.infra.logs.analysis.logRateSectionNoDataBody', {
      defaultMessage: 'You may want to adjust your time range.'
    }))
  })) : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, _react.default.createElement("b", null, _i18n.i18n.translate('xpack.infra.logs.analysis.logRateSectionBucketSpanLabel', {
    defaultMessage: 'Bucket span: '
  })), _i18n.i18n.translate('xpack.infra.logs.analysis.logRateSectionBucketSpanValue', {
    defaultMessage: '15 minutes'
  }))), _react.default.createElement(_bar_chart.LogEntryRateBarChart, {
    setTimeRange: setTimeRange,
    timeRange: timeRange,
    series: logEntryRateSeries
  }))));
};

exports.LogRateResults = LogRateResults;

var title = _i18n.i18n.translate('xpack.infra.logs.analysis.logRateSectionTitle', {
  defaultMessage: 'Log entries'
});

var loadingAriaLabel = _i18n.i18n.translate('xpack.infra.logs.analysis.logRateSectionLoadingAriaLabel', {
  defaultMessage: 'Loading log rate results'
});

var LoadingOverlayContent = function LoadingOverlayContent() {
  return _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl",
    "aria-label": loadingAriaLabel
  });
};