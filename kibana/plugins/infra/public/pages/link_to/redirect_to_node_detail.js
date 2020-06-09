"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodeDetailUrl = exports.RedirectToNodeDetail = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _with_metrics_time = require("../metrics/containers/with_metrics_time");

var _query_params = require("./query_params");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectToNodeDetail = function RedirectToNodeDetail(_ref) {
  var _ref$match$params = _ref.match.params,
      nodeId = _ref$match$params.nodeId,
      nodeType = _ref$match$params.nodeType,
      location = _ref.location;
  var searchString = (0, _with_metrics_time.replaceMetricTimeInQueryString)((0, _query_params.getFromFromLocation)(location), (0, _query_params.getToFromLocation)(location))('');
  return _react.default.createElement(_reactRouterDom.Redirect, {
    to: "/detail/".concat(nodeType, "/").concat(nodeId, "?").concat(searchString)
  });
};

exports.RedirectToNodeDetail = RedirectToNodeDetail;

var getNodeDetailUrl = function getNodeDetailUrl(_ref2) {
  var nodeType = _ref2.nodeType,
      nodeId = _ref2.nodeId,
      to = _ref2.to,
      from = _ref2.from;
  return {
    app: 'metrics',
    pathname: "link-to/".concat(nodeType, "-detail/").concat(nodeId),
    search: to && from ? {
      to: "".concat(to),
      from: "".concat(from)
    } : undefined
  };
};

exports.getNodeDetailUrl = getNodeDetailUrl;