"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerCharts = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _loading = require("../loading");

var _no_data = require("../empty_states/no_data");

var _chart = require("./chart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetricsExplorerCharts = function MetricsExplorerCharts(_ref) {
  var loading = _ref.loading,
      data = _ref.data,
      onLoadMore = _ref.onLoadMore,
      options = _ref.options,
      chartOptions = _ref.chartOptions,
      onRefetch = _ref.onRefetch,
      onFilter = _ref.onFilter,
      source = _ref.source,
      timeRange = _ref.timeRange,
      onTimeChange = _ref.onTimeChange;

  if (loading) {
    return _react2.default.createElement(_loading.InfraLoadingPanel, {
      height: 800,
      width: "100%",
      text: _i18n.i18n.translate('xpack.infra.metricsExplorer.loadingCharts', {
        defaultMessage: 'Loading charts'
      })
    });
  }

  if (!data || data.series.length === 0) {
    return _react2.default.createElement(_no_data.NoData, {
      titleText: _i18n.i18n.translate('xpack.infra.metricsExplorer.noDataTitle', {
        defaultMessage: 'There is no data to display.'
      }),
      bodyText: _i18n.i18n.translate('xpack.infra.metricsExplorer.noDataBodyText', {
        defaultMessage: 'Try adjusting your time, filters or group by settings.'
      }),
      refetchText: _i18n.i18n.translate('xpack.infra.metricsExplorer.noDataRefetchText', {
        defaultMessage: 'Check for new data'
      }),
      testString: "metrics-explorer-no-data",
      onRefetch: onRefetch
    });
  }

  return _react2.default.createElement("div", {
    style: {
      width: '100%'
    }
  }, _react2.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "s",
    columns: data.series.length === 1 ? 1 : 3
  }, data.series.map(function (series) {
    return _react2.default.createElement(_eui.EuiFlexItem, {
      key: series.id,
      style: {
        minWidth: 0
      }
    }, _react2.default.createElement(_chart.MetricsExplorerChart, {
      key: "chart-".concat(series.id),
      onFilter: onFilter,
      options: options,
      chartOptions: chartOptions,
      title: options.groupBy ? series.id : null,
      height: data.series.length > 1 ? 200 : 400,
      series: series,
      source: source,
      timeRange: timeRange,
      onTimeChange: onTimeChange
    }));
  })), data.series.length > 1 ? _react2.default.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 16
    }
  }, _react2.default.createElement(_eui.EuiHorizontalRule, null), _react2.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.metricsExplorer.footerPaginationMessage",
    defaultMessage: "Displaying {length} of {total} charts grouped by \"{groupBy}\".",
    values: {
      length: data.series.length,
      total: data.pageInfo.total,
      groupBy: options.groupBy
    }
  }))), data.pageInfo.afterKey ? _react2.default.createElement("div", {
    style: {
      margin: '16px 0'
    }
  }, _react2.default.createElement(_eui.EuiButton, {
    isLoading: loading,
    size: "s",
    onClick: function onClick() {
      return onLoadMore(data.pageInfo.afterKey || null);
    }
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.metricsExplorer.loadMoreChartsButton",
    defaultMessage: "Load More Charts"
  }))) : null) : null);
};

exports.MetricsExplorerCharts = MetricsExplorerCharts;