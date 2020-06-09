"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogsPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _page_content = require("./page_content");

var _page_providers = require("./page_providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogsPage = function LogsPage(_ref) {
  var match = _ref.match;
  return _react.default.createElement(_page_providers.LogsPageProviders, null, _react.default.createElement(_page_content.LogsPageContent, null));
};

exports.LogsPage = LogsPage;