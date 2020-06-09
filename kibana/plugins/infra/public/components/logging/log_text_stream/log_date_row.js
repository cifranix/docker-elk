"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogDateRow = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _datetime = require("../../../utils/formatters/datetime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Show a row with the date in the log stream
 */
var LogDateRow = function LogDateRow(_ref) {
  var timestamp = _ref.timestamp;
  var formattedDate = (0, _datetime.localizedDate)(timestamp);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("h2", {
    style: {
      paddingLeft: 8
    }
  }, formattedDate))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiHorizontalRule, null)));
};

exports.LogDateRow = LogDateRow;