"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutputTab = OutputTab;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _format = require("../../lib/format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function OutputTab(_ref) {
  var response = _ref.response;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiCodeBlock, {
    language: "json",
    paddingSize: "s",
    isCopyable: true
  }, (0, _format.formatResponse)(response)));
}