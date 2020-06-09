"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkToPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _redirect_to_logs = require("./redirect_to_logs");

var _redirect_to_node_detail = require("./redirect_to_node_detail");

var _redirect_to_node_logs = require("./redirect_to_node_logs");

var _redirect_to_host_detail_via_ip = require("./redirect_to_host_detail_via_ip");

var _inventory_models = require("../../../common/inventory_models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ITEM_TYPES = _inventory_models.inventoryModels.map(function (m) {
  return m.id;
}).join('|');

var LinkToPage = function LinkToPage(props) {
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(props.match.url, "/:sourceId?/:nodeType(").concat(ITEM_TYPES, ")-logs/:nodeId"),
    component: _redirect_to_node_logs.RedirectToNodeLogs
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(props.match.url, "/:nodeType(").concat(ITEM_TYPES, ")-detail/:nodeId"),
    component: _redirect_to_node_detail.RedirectToNodeDetail
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(props.match.url, "/host-detail-via-ip/:hostIp"),
    component: _redirect_to_host_detail_via_ip.RedirectToHostDetailViaIP
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "".concat(props.match.url, "/:sourceId?/logs"),
    component: _redirect_to_logs.RedirectToLogs
  }), _react.default.createElement(_reactRouterDom.Redirect, {
    to: "/infrastructure"
  }));
};

exports.LinkToPage = LinkToPage;