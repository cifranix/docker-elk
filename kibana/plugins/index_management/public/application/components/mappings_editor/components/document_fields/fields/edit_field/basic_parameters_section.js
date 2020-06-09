"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicParametersSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BasicParametersSection = function BasicParametersSection(_ref) {
  var children = _ref.children;
  return _react.default.createElement("section", null, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), children);
};

exports.BasicParametersSection = BasicParametersSection;