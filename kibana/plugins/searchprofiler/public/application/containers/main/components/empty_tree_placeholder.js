"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyTreePlaceHolder = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyTreePlaceHolder = function EmptyTreePlaceHolder() {
  return _react.default.createElement("div", {
    className: "prfDevTool__main__emptyTreePlaceholder"
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued"
  }, _react.default.createElement("h1", null, _i18n.i18n.translate('xpack.searchProfiler.emptyProfileTreeTitle', {
    defaultMessage: 'No queries to profile'
  })), _react.default.createElement("p", null, _i18n.i18n.translate('xpack.searchProfiler.emptyProfileTreeDescription', {
    defaultMessage: 'Enter a query, click Profile, and see the results here.'
  }))));
};

exports.EmptyTreePlaceHolder = EmptyTreePlaceHolder;