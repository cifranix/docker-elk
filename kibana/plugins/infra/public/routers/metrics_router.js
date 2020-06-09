"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsRouter = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ = require("../pages/404");

var _infrastructure = require("../pages/infrastructure");

var _link_to = require("../pages/link_to");

var _metrics = require("../pages/metrics");

var _redirect_with_query_params = require("../utils/redirect_with_query_params");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetricsRouter = function MetricsRouter(_ref) {
  var _useKibana$services$a, _uiCapabilities$infra, _uiCapabilities$infra2, _uiCapabilities$infra3, _uiCapabilities$infra4, _uiCapabilities$infra5;

  var history = _ref.history;
  var uiCapabilities = (_useKibana$services$a = (0, _public.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities;
  return _react.default.createElement(_reactRouterDom.Router, {
    history: history
  }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: "/link-to",
    component: _link_to.LinkToPage
  }), (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra = uiCapabilities.infrastructure) === null || _uiCapabilities$infra === void 0 ? void 0 : _uiCapabilities$infra.show) && _react.default.createElement(_redirect_with_query_params.RedirectWithQueryParams, {
    from: "/",
    exact: true,
    to: "/inventory"
  }), (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra2 = uiCapabilities.infrastructure) === null || _uiCapabilities$infra2 === void 0 ? void 0 : _uiCapabilities$infra2.show) && _react.default.createElement(_redirect_with_query_params.RedirectWithQueryParams, {
    from: "/snapshot",
    exact: true,
    to: "/inventory"
  }), (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra3 = uiCapabilities.infrastructure) === null || _uiCapabilities$infra3 === void 0 ? void 0 : _uiCapabilities$infra3.show) && _react.default.createElement(_redirect_with_query_params.RedirectWithQueryParams, {
    from: "/metrics-explorer",
    exact: true,
    to: "/explorer"
  }), (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra4 = uiCapabilities.infrastructure) === null || _uiCapabilities$infra4 === void 0 ? void 0 : _uiCapabilities$infra4.show) && _react.default.createElement(_reactRouterDom.Route, {
    path: "/detail/:type/:node",
    component: _metrics.MetricDetail
  }), (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra5 = uiCapabilities.infrastructure) === null || _uiCapabilities$infra5 === void 0 ? void 0 : _uiCapabilities$infra5.show) && _react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    component: _infrastructure.InfrastructurePage
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _.NotFoundPage
  })));
};

exports.MetricsRouter = MetricsRouter;