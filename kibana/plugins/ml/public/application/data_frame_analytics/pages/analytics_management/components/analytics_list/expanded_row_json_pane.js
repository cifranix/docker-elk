"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandedRowJsonPane = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ExpandedRowJsonPane = function ExpandedRowJsonPane(_ref) {
  var json = _ref.json;
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiCodeEditor, {
    value: JSON.stringify(json, null, 2),
    readOnly: true,
    mode: "json",
    style: {
      width: '100%'
    },
    theme: "textmate"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, "\xA0"));
};

exports.ExpandedRowJsonPane = ExpandedRowJsonPane;