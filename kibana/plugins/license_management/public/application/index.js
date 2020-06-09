"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AppDependencies", {
  enumerable: true,
  get: function get() {
    return _app_context.AppDependencies;
  }
});
exports.renderApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRouterDom = require("react-router-dom");

var _app_context = require("./app_context");

var _app_providers = require("./app_providers");

var _app = require("./app.container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var AppWithRouter = function AppWithRouter(props) {
  return _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(_app.App, props));
};

var renderApp = function renderApp(element, dependencies) {
  (0, _reactDom.render)(_react.default.createElement(_app_providers.AppProviders, {
    appDependencies: dependencies
  }, _react.default.createElement(AppWithRouter, {
    telemetry: dependencies.plugins.telemetry
  })), element);
  return function () {
    (0, _reactDom.unmountComponentAtNode)(element);
  };
};

exports.renderApp = renderApp;