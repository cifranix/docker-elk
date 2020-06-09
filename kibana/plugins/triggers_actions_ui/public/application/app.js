"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppWithoutRouter = exports.App = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _constants = require("./constants");

var _home = require("./home");

var _app_context = require("./app_context");

var _capabilities = require("./lib/capabilities");

var _alert_details_route = require("./sections/alert_details/components/alert_details_route");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var App = function App(appDeps) {
  var sections = ['alerts', 'connectors'];
  var sectionsRegex = sections.join('|');
  return _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(_app_context.AppContextProvider, {
    appDeps: appDeps
  }, _react.default.createElement(AppWithoutRouter, {
    sectionsRegex: sectionsRegex
  })));
};

exports.App = App;

var AppWithoutRouter = function AppWithoutRouter(_ref) {
  var sectionsRegex = _ref.sectionsRegex;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      capabilities = _useAppDependencies.capabilities;

  var canShowAlerts = (0, _capabilities.hasShowAlertsCapability)(capabilities);
  var DEFAULT_SECTION = canShowAlerts ? 'alerts' : 'connectors';
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(_constants.BASE_PATH, "/:section(").concat(sectionsRegex, ")"),
    component: _home.TriggersActionsUIHome
  }), canShowAlerts && _react.default.createElement(_reactRouterDom.Route, {
    path: _constants.routeToAlertDetails,
    component: _alert_details_route.AlertDetailsRouteWithApi
  }), _react.default.createElement(_reactRouterDom.Redirect, {
    from: "".concat(_constants.BASE_PATH),
    to: "".concat(_constants.BASE_PATH, "/").concat(DEFAULT_SECTION)
  }));
};

exports.AppWithoutRouter = AppWithoutRouter;