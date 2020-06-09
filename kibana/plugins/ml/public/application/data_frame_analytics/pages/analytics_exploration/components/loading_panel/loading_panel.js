"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingPanel = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LoadingPanel = function LoadingPanel() {
  return _react.default.createElement(_eui.EuiPanel, {
    className: "eui-textCenter"
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  }));
};

exports.LoadingPanel = LoadingPanel;