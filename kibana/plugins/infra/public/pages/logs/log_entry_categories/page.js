"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryCategoriesPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _page = require("../../../components/page");

var _page_content = require("./page_content");

var _page_providers = require("./page_providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogEntryCategoriesPage = function LogEntryCategoriesPage() {
  return _react.default.createElement(_page_providers.LogEntryCategoriesPageProviders, null, _react.default.createElement(_page.ColumnarPage, {
    "data-test-subj": "logsLogEntryCategoriesPage"
  }, _react.default.createElement(_page_content.LogEntryCategoriesPageContent, null)));
};

exports.LogEntryCategoriesPage = LogEntryCategoriesPage;