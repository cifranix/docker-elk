"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogTextSeparator = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Create a separator with a text on the right side
 */
var LogTextSeparator = function LogTextSeparator(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, children), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiHorizontalRule, null)));
};

exports.LogTextSeparator = LogTextSeparator;