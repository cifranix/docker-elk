"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopCategoriesSection = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _beta_badge = require("../../../../../components/beta_badge");

var _loading_overlay_wrapper = require("../../../../../components/loading_overlay_wrapper");

var _log_analysis_job_status = require("../../../../../components/logging/log_analysis_job_status");

var _log_analysis_results = require("../../../../../components/logging/log_analysis_results");

var _datasets_selector = require("./datasets_selector");

var _top_categories_table = require("./top_categories_table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TopCategoriesSection = function TopCategoriesSection(_ref) {
  var availableDatasets = _ref.availableDatasets,
      _ref$isLoadingDataset = _ref.isLoadingDatasets,
      isLoadingDatasets = _ref$isLoadingDataset === void 0 ? false : _ref$isLoadingDataset,
      _ref$isLoadingTopCate = _ref.isLoadingTopCategories,
      isLoadingTopCategories = _ref$isLoadingTopCate === void 0 ? false : _ref$isLoadingTopCate,
      jobId = _ref.jobId,
      onChangeDatasetSelection = _ref.onChangeDatasetSelection,
      onRequestRecreateMlJob = _ref.onRequestRecreateMlJob,
      selectedDatasets = _ref.selectedDatasets,
      sourceId = _ref.sourceId,
      timeRange = _ref.timeRange,
      topCategories = _ref.topCategories;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m",
    "aria-label": title
  }, _react.default.createElement("h1", null, title, " ", _react.default.createElement(_beta_badge.BetaBadge, null)))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_analysis_job_status.RecreateJobButton, {
    onClick: onRequestRecreateMlJob,
    size: "s"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_analysis_results.AnalyzeInMlButton, {
    jobId: jobId,
    timeRange: timeRange
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_datasets_selector.DatasetsSelector, {
    availableDatasets: availableDatasets,
    isLoading: isLoadingDatasets,
    onChangeDatasetSelection: onChangeDatasetSelection,
    selectedDatasets: selectedDatasets
  }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_loading_overlay_wrapper.LoadingOverlayWrapper, {
    isLoading: isLoadingTopCategories,
    loadingChildren: _react.default.createElement(LoadingOverlayContent, null)
  }, _react.default.createElement(_top_categories_table.TopCategoriesTable, {
    categorizationJobId: jobId,
    sourceId: sourceId,
    timeRange: timeRange,
    topCategories: topCategories
  })));
};

exports.TopCategoriesSection = TopCategoriesSection;

var title = _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.topCategoriesSectionTitle', {
  defaultMessage: 'Log message categories'
});

var loadingAriaLabel = _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.topCategoriesSectionLoadingAriaLabel', {
  defaultMessage: 'Loading message categories'
});

var LoadingOverlayContent = function LoadingOverlayContent() {
  return _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl",
    "aria-label": loadingAriaLabel
  });
};