"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupByLabelSummary = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _common = require("../../../../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var GroupByLabelSummary = function GroupByLabelSummary(_ref) {
  var item = _ref.item,
      optionsDataId = _ref.optionsDataId;
  var interval;

  if ((0, _common.isGroupByDateHistogram)(item)) {
    interval = item.calendar_interval;
  } else if ((0, _common.isGroupByHistogram)(item)) {
    interval = item.interval;
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    className: "transform__GroupByLabel--text"
  }, _react.default.createElement("span", {
    className: "eui-textTruncate"
  }, optionsDataId)), interval !== undefined && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "transform__GroupByLabel--text transform__GroupByLabel--interval"
  }, _react.default.createElement(_eui.EuiTextColor, {
    color: "subdued",
    className: "eui-textTruncate"
  }, interval)));
};

exports.GroupByLabelSummary = GroupByLabelSummary;