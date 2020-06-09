"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageErrorForbidden = PageErrorForbidden;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function PageErrorForbidden() {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "securityApp",
    iconColor: undefined,
    title: _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.pageErrorForbidden.title",
      defaultMessage: "You don't have privileges to use Watcher"
    }))
  });
}