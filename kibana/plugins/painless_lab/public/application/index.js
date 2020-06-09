"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = renderApp;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _public = require("../../../../../src/plugins/kibana_react/public");

var _context = require("./context");

var _main = require("./components/main");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function renderApp(element, _ref) {
  var http = _ref.http,
      I18nContext = _ref.I18nContext,
      uiSettings = _ref.uiSettings,
      links = _ref.links,
      chrome = _ref.chrome;

  if (!element) {
    return function () {
      return undefined;
    };
  }

  var _createKibanaReactCon = (0, _public.createKibanaReactContext)({
    uiSettings: uiSettings
  }),
      KibanaReactContextProvider = _createKibanaReactCon.Provider;

  (0, _reactDom.render)(_react.default.createElement(I18nContext, null, _react.default.createElement(KibanaReactContextProvider, null, _react.default.createElement(_context.AppContextProvider, {
    value: {
      http: http,
      links: links,
      chrome: chrome
    }
  }, _react.default.createElement(_main.Main, null)))), element);
  return function () {
    return (0, _reactDom.unmountComponentAtNode)(element);
  };
}