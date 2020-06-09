"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisabledLoginForm = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DisabledLoginForm = function DisabledLoginForm(props) {
  return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiText, {
    color: "danger",
    style: {
      textAlign: 'center'
    }
  }, _react.default.createElement("p", null, props.title)), _react.default.createElement(_eui.EuiText, {
    style: {
      textAlign: 'center'
    }
  }, _react.default.createElement("p", null, props.message)));
};

exports.DisabledLoginForm = DisabledLoginForm;