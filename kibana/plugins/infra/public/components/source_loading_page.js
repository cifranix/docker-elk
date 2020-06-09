"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceLoadingPage = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _loading_page = require("./loading_page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SourceLoadingPage = function SourceLoadingPage() {
  return _react2.default.createElement(_loading_page.LoadingPage, {
    message: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.sourceLoadingPage.loadingDataSourcesMessage",
      defaultMessage: "Loading data sources"
    })
  });
};

exports.SourceLoadingPage = SourceLoadingPage;