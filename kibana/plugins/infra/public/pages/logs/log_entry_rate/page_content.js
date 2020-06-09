"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryRatePageContent = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _log_analysis = require("../../../../common/log_analysis");

var _loading_page = require("../../../components/loading_page");

var _log_analysis_setup = require("../../../components/logging/log_analysis_setup");

var _source_error_page = require("../../../components/source_error_page");

var _source_loading_page = require("../../../components/source_loading_page");

var _log_analysis2 = require("../../../containers/logs/log_analysis");

var _source = require("../../../containers/source");

var _page_results_content = require("./page_results_content");

var _page_setup_content = require("./page_setup_content");

var _use_log_entry_rate_module = require("./use_log_entry_rate_module");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogEntryRatePageContent = function LogEntryRatePageContent() {
  var _useSourceContext = (0, _source.useSourceContext)(),
      hasFailedLoadingSource = _useSourceContext.hasFailedLoadingSource,
      isLoadingSource = _useSourceContext.isLoadingSource,
      isUninitialized = _useSourceContext.isUninitialized,
      loadSource = _useSourceContext.loadSource,
      loadSourceFailureMessage = _useSourceContext.loadSourceFailureMessage;

  var _useLogAnalysisCapabi = (0, _log_analysis2.useLogAnalysisCapabilitiesContext)(),
      hasLogAnalysisCapabilites = _useLogAnalysisCapabi.hasLogAnalysisCapabilites,
      hasLogAnalysisReadCapabilities = _useLogAnalysisCapabi.hasLogAnalysisReadCapabilities,
      hasLogAnalysisSetupCapabilities = _useLogAnalysisCapabi.hasLogAnalysisSetupCapabilities;

  var _useLogEntryRateModul = (0, _use_log_entry_rate_module.useLogEntryRateModuleContext)(),
      fetchJobStatus = _useLogEntryRateModul.fetchJobStatus,
      fetchModuleDefinition = _useLogEntryRateModul.fetchModuleDefinition,
      setupStatus = _useLogEntryRateModul.setupStatus;

  (0, _react.useEffect)(function () {
    if (hasLogAnalysisReadCapabilities) {
      fetchModuleDefinition();
      fetchJobStatus();
    }
  }, [fetchJobStatus, fetchModuleDefinition, hasLogAnalysisReadCapabilities]);

  if (isLoadingSource || isUninitialized) {
    return _react.default.createElement(_source_loading_page.SourceLoadingPage, null);
  } else if (hasFailedLoadingSource) {
    return _react.default.createElement(_source_error_page.SourceErrorPage, {
      errorMessage: loadSourceFailureMessage !== null && loadSourceFailureMessage !== void 0 ? loadSourceFailureMessage : '',
      retry: loadSource
    });
  } else if (!hasLogAnalysisCapabilites) {
    return _react.default.createElement(_log_analysis_setup.MlUnavailablePrompt, null);
  } else if (!hasLogAnalysisReadCapabilities) {
    return _react.default.createElement(_log_analysis_setup.MissingResultsPrivilegesPrompt, null);
  } else if (setupStatus === 'initializing') {
    return _react.default.createElement(_loading_page.LoadingPage, {
      message: _i18n.i18n.translate('xpack.infra.logs.analysisPage.loadingMessage', {
        defaultMessage: 'Checking status of analysis jobs...'
      })
    });
  } else if (setupStatus === 'unknown') {
    return _react.default.createElement(_log_analysis_setup.LogAnalysisSetupStatusUnknownPrompt, {
      retry: fetchJobStatus
    });
  } else if ((0, _log_analysis.isSetupStatusWithResults)(setupStatus)) {
    return _react.default.createElement(_page_results_content.LogEntryRateResultsContent, null);
  } else if (!hasLogAnalysisSetupCapabilities) {
    return _react.default.createElement(_log_analysis_setup.MissingSetupPrivilegesPrompt, null);
  } else {
    return _react.default.createElement(_page_setup_content.LogEntryRateSetupContent, null);
  }
};

exports.LogEntryRatePageContent = LogEntryRatePageContent;