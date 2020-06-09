"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisplayValue = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MAX_CHARS = 12;

var DisplayValue = function DisplayValue(_ref) {
  var value = _ref.value;
  var length = String(value).length;

  if (length <= MAX_CHARS) {
    return _react.default.createElement("b", null, value);
  } else {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: value,
      anchorClassName: "valueWrapper"
    }, _react.default.createElement("b", null, value));
  }
};

exports.DisplayValue = DisplayValue;