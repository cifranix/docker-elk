"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexDetails = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IndexDetails = function IndexDetails(_ref) {
  var index = _ref.index;
  var time = index.time,
      name = index.name;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    gutterSize: "none",
    direction: "row"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    className: "prfDevTool__profileTree__shardDetails"
  }, _react.default.createElement("h3", null, _react.default.createElement("b", null, _i18n.i18n.translate('xpack.searchProfiler.profileTree.indexTitle', {
    defaultMessage: 'Index:'
  })), ' ' + name))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "prfDevTool__profileTree__indexDetails"
  }, _react.default.createElement(_eui.EuiText, {
    className: "prfDevTool__profileTree__shardDetails--dim"
  }, _react.default.createElement(_eui.EuiToolTip, {
    position: "bottom",
    content: _i18n.i18n.translate('xpack.searchProfiler.profileTree.cumulativeTimeTooltip', {
      defaultMessage: 'The cumulative time of all shards in the index. Note: this is not wall-clock time, as shards can execute in parallel.'
    })
  }, _react.default.createElement("small", null, _i18n.i18n.translate('xpack.searchProfiler.profileTree.cumulativeTimeTitle', {
    defaultMessage: 'Cumulative time:'
  }))), ' ' + (0, _utils.msToPretty)(time, 3))));
};

exports.IndexDetails = IndexDetails;