"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedirectToLogs = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _log_filter = require("../../containers/logs/log_filter");

var _log_position = require("../../containers/logs/log_position");

var _source_id = require("../../containers/source_id");

var _query_params = require("./query_params");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectToLogs = function RedirectToLogs(_ref) {
  var location = _ref.location,
      match = _ref.match;
  var sourceId = match.params.sourceId || 'default';
  var filter = (0, _query_params.getFilterFromLocation)(location);
  var searchString = (0, _lodash.compose)((0, _log_filter.replaceLogFilterInQueryString)(filter), (0, _log_position.replaceLogPositionInQueryString)((0, _query_params.getTimeFromLocation)(location)), (0, _source_id.replaceSourceIdInQueryString)(sourceId))('');
  return _react.default.createElement(_reactRouterDom.Redirect, {
    to: "/stream?".concat(searchString)
  });
};

exports.RedirectToLogs = RedirectToLogs;