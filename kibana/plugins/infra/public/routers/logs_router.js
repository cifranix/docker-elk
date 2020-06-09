"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogsRouter = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("../pages/404");

var _link_to = require("../pages/link_to");

var _logs = require("../pages/logs");

var _redirect_with_query_params = require("../utils/redirect_with_query_params");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogsRouter = function LogsRouter(_ref) {
  var _useKibana$services$a, _uiCapabilities$logs, _uiCapabilities$logs2;

  var history = _ref.history;
  var uiCapabilities = (_useKibana$services$a = (0, _public.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities;
  return _react.default.createElement(_reactRouterDom.Router, {
    history: history
  }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: "/link-to",
    component: _link_to.LinkToPage
  }), (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$logs = uiCapabilities.logs) === null || _uiCapabilities$logs === void 0 ? void 0 : _uiCapabilities$logs.show) && _react.default.createElement(_redirect_with_query_params.RedirectWithQueryParams, {
    from: "/",
    exact: true,
    to: "/stream"
  }), (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$logs2 = uiCapabilities.logs) === null || _uiCapabilities$logs2 === void 0 ? void 0 : _uiCapabilities$logs2.show) && _react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    component: _logs.LogsPage
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _.NotFoundPage
  })));
};

exports.LogsRouter = LogsRouter;