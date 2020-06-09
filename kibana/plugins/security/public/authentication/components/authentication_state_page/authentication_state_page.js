"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationStatePage = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AuthenticationStatePage = function AuthenticationStatePage(props) {
  return _react.default.createElement("div", {
    className: "secAuthenticationStatePage"
  }, _react.default.createElement("header", {
    className: "secAuthenticationStatePage__header"
  }, _react.default.createElement("div", {
    className: "secAuthenticationStatePage__content eui-textCenter"
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  }), _react.default.createElement("span", {
    className: "secAuthenticationStatePage__logo"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "logoKibana",
    size: "xxl"
  })), _react.default.createElement(_eui.EuiTitle, {
    size: "l",
    className: "secAuthenticationStatePage__title"
  }, _react.default.createElement("h1", null, props.title)), _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }))), _react.default.createElement("div", {
    className: "secAuthenticationStatePage__content eui-textCenter"
  }, props.children));
};

exports.AuthenticationStatePage = AuthenticationStatePage;