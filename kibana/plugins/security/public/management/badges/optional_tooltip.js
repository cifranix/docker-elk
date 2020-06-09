"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionalToolTip = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OptionalToolTip = function OptionalToolTip(props) {
  if (props.tooltipContent) {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: props.tooltipContent
    }, props.children);
  }

  return props.children;
};

exports.OptionalToolTip = OptionalToolTip;