"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ProgressBar = function ProgressBar(_ref) {
  var progress = _ref.progress;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      width: '100px'
    },
    grow: false
  }, _react.default.createElement(_eui.EuiProgress, {
    value: progress,
    max: 100,
    color: "primary",
    size: "m"
  }, progress, "%")), _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      width: '35px'
    },
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, "".concat(progress, "%"))));
};

exports.ProgressBar = ProgressBar;