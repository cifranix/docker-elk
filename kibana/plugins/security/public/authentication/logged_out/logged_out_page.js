"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggedOutPage = LoggedOutPage;
exports.renderLoggedOutPage = renderLoggedOutPage;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _components = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function LoggedOutPage(_ref) {
  var basePath = _ref.basePath;
  return _react.default.createElement(_components.AuthenticationStatePage, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.loggedOut.title",
      defaultMessage: "Successfully logged out"
    })
  }, _react.default.createElement(_eui.EuiButton, {
    href: basePath.prepend('/')
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.loggedOut.login",
    defaultMessage: "Log in"
  })));
}

function renderLoggedOutPage(i18nStart, element, props) {
  _reactDom.default.render(_react.default.createElement(i18nStart.Context, null, _react.default.createElement(LoggedOutPage, props)), element);

  return function () {
    return _reactDom.default.unmountComponentAtNode(element);
  };
}