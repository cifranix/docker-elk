"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingPage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _page = require("./page");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LoadingPage = function LoadingPage(_ref) {
  var message = _ref.message;
  return _react.default.createElement(_page.FlexPage, null, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, {
    verticalPosition: "center",
    horizontalPosition: "center"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  })), _react.default.createElement(_eui.EuiFlexItem, null, message)))));
};

exports.LoadingPage = LoadingPage;