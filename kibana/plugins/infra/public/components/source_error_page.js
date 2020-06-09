"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceErrorPage = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _error_page = require("./error_page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SourceErrorPage = function SourceErrorPage(_ref) {
  var errorMessage = _ref.errorMessage,
      retry = _ref.retry;
  return _react2.default.createElement(_error_page.ErrorPage, {
    shortMessage: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceErrorPage.failedToLoadDataSourcesMessage",
      defaultMessage: "Failed to load data sources."
    }),
    detailedMessage: _react2.default.createElement("code", null, errorMessage),
    retry: retry
  });
};

exports.SourceErrorPage = SourceErrorPage;