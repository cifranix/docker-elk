"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _page = require("../../../components/page");

var _page_content = require("./page_content");

var _page_header = require("./page_header");

var _page_providers = require("./page_providers");

var _public = require("../../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StreamPage = function StreamPage() {
  (0, _public.useTrackPageview)({
    app: 'infra_logs',
    path: 'stream'
  });
  (0, _public.useTrackPageview)({
    app: 'infra_logs',
    path: 'stream',
    delay: 15000
  });
  return _react.default.createElement(_page_providers.LogsPageProviders, null, _react.default.createElement(_page.ColumnarPage, {
    "data-test-subj": "infraLogsPage"
  }, _react.default.createElement(_page_header.StreamPageHeader, null), _react.default.createElement(_page_content.StreamPageContent, null)));
};

exports.StreamPage = StreamPage;