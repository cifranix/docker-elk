"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionalToolTip = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ConditionalToolTip = function ConditionalToolTip(props) {
  if (props.hidden) {
    return props.children;
  }

  var propsWithoutHidden = (0, _lodash.omit)(props, 'hidden');
  return _react.default.createElement(_eui.EuiToolTip, propsWithoutHidden, props.children);
};

exports.ConditionalToolTip = ConditionalToolTip;