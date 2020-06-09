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

var _reactRedux = require("react-redux");

var _reactDom = require("react-dom");

var _app_context = require("./app_context");

var _app = require("./app");

var _store = require("./store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var renderApp = function renderApp(elem, _ref) {
  var core = _ref.core,
      dependencies = _ref.dependencies;

  if (!elem) {
    return function () {
      return undefined;
    };
  }

  var i18n = core.i18n;
  var I18nContext = i18n.Context;
  var services = dependencies.services;
  (0, _reactDom.render)(_react.default.createElement(I18nContext, null, _react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.indexManagementStore)(services)
  }, _react.default.createElement(_app_context.AppContextProvider, {
    value: dependencies
  }, _react.default.createElement(_app.App, null)))), elem);
  return function () {
    (0, _reactDom.unmountComponentAtNode)(elem);
  };
};

exports.renderApp = renderApp;