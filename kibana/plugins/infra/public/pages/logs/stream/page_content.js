"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamPageContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _source_error_page = require("../../../components/source_error_page");

var _source_loading_page = require("../../../components/source_loading_page");

var _source = require("../../../containers/source");

var _page_logs_content = require("./page_logs_content");

var _page_no_indices_content = require("./page_no_indices_content");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StreamPageContent = function StreamPageContent() {
  var _useSourceContext = (0, _source.useSourceContext)(),
      hasFailedLoadingSource = _useSourceContext.hasFailedLoadingSource,
      isLoadingSource = _useSourceContext.isLoadingSource,
      isUninitialized = _useSourceContext.isUninitialized,
      loadSource = _useSourceContext.loadSource,
      loadSourceFailureMessage = _useSourceContext.loadSourceFailureMessage,
      logIndicesExist = _useSourceContext.logIndicesExist;

  if (isLoadingSource || isUninitialized) {
    return _react.default.createElement(_source_loading_page.SourceLoadingPage, null);
  } else if (hasFailedLoadingSource) {
    return _react.default.createElement(_source_error_page.SourceErrorPage, {
      errorMessage: loadSourceFailureMessage !== null && loadSourceFailureMessage !== void 0 ? loadSourceFailureMessage : '',
      retry: loadSource
    });
  } else if (logIndicesExist) {
    return _react.default.createElement(_page_logs_content.LogsPageLogsContent, null);
  } else {
    return _react.default.createElement(_page_no_indices_content.LogsPageNoIndicesContent, null);
  }
};

exports.StreamPageContent = StreamPageContent;