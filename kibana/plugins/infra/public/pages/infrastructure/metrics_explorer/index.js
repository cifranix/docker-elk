"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerPage = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _document_title = require("../../../components/document_title");

var _charts = require("../../../components/metrics_explorer/charts");

var _toolbar = require("../../../components/metrics_explorer/toolbar");

var _empty_states = require("../../../components/empty_states");

var _use_metric_explorer_state = require("./use_metric_explorer_state");

var _public = require("../../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetricsExplorerPage = function MetricsExplorerPage(_ref) {
  var source = _ref.source,
      derivedIndexPattern = _ref.derivedIndexPattern;

  var _useMetricsExplorerSt = (0, _use_metric_explorer_state.useMetricsExplorerState)(source, derivedIndexPattern),
      loading = _useMetricsExplorerSt.loading,
      error = _useMetricsExplorerSt.error,
      data = _useMetricsExplorerSt.data,
      currentTimerange = _useMetricsExplorerSt.currentTimerange,
      options = _useMetricsExplorerSt.options,
      chartOptions = _useMetricsExplorerSt.chartOptions,
      setChartOptions = _useMetricsExplorerSt.setChartOptions,
      handleAggregationChange = _useMetricsExplorerSt.handleAggregationChange,
      handleMetricsChange = _useMetricsExplorerSt.handleMetricsChange,
      handleFilterQuerySubmit = _useMetricsExplorerSt.handleFilterQuerySubmit,
      handleGroupByChange = _useMetricsExplorerSt.handleGroupByChange,
      handleTimeChange = _useMetricsExplorerSt.handleTimeChange,
      handleRefresh = _useMetricsExplorerSt.handleRefresh,
      handleLoadMore = _useMetricsExplorerSt.handleLoadMore,
      defaultViewState = _useMetricsExplorerSt.defaultViewState,
      onViewStateChange = _useMetricsExplorerSt.onViewStateChange;

  (0, _public.useTrackPageview)({
    app: 'infra_metrics',
    path: 'metrics_explorer'
  });
  (0, _public.useTrackPageview)({
    app: 'infra_metrics',
    path: 'metrics_explorer',
    delay: 15000
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_document_title.DocumentTitle, {
    title: function title(previousTitle) {
      return _i18n.i18n.translate('xpack.infra.infrastructureMetricsExplorerPage.documentTitle', {
        defaultMessage: '{previousTitle} | Metrics Explorer',
        values: {
          previousTitle: previousTitle
        }
      });
    }
  }), _react.default.createElement(_toolbar.MetricsExplorerToolbar, {
    derivedIndexPattern: derivedIndexPattern,
    timeRange: currentTimerange,
    options: options,
    chartOptions: chartOptions,
    onRefresh: handleRefresh,
    onTimeChange: handleTimeChange,
    onGroupByChange: handleGroupByChange,
    onFilterQuerySubmit: handleFilterQuerySubmit,
    onMetricsChange: handleMetricsChange,
    onAggregationChange: handleAggregationChange,
    onChartOptionsChange: setChartOptions,
    defaultViewState: defaultViewState,
    onViewStateChange: onViewStateChange
  }), error ? _react.default.createElement(_empty_states.NoData, {
    titleText: "Whoops!",
    bodyText: _i18n.i18n.translate('xpack.infra.metricsExplorer.errorMessage', {
      defaultMessage: 'It looks like the request failed with "{message}"',
      values: {
        message: error.message
      }
    }),
    onRefetch: handleRefresh,
    refetchText: "Try Again"
  }) : _react.default.createElement(_charts.MetricsExplorerCharts, {
    timeRange: currentTimerange,
    loading: loading,
    data: data,
    source: source,
    options: options,
    chartOptions: chartOptions,
    onLoadMore: handleLoadMore,
    onFilter: handleFilterQuerySubmit,
    onRefetch: handleRefresh,
    onTimeChange: handleTimeChange
  }));
};

exports.MetricsExplorerPage = MetricsExplorerPage;