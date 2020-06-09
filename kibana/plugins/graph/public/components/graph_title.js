"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphTitle = void 0;

var _reactRedux = require("react-redux");

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _state_management = require("../state_management");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Component showing the title of the current workspace as a heading visible for screen readers
 */
var GraphTitle = (0, _reactRedux.connect)(function (state) {
  return {
    title: (0, _state_management.metaDataSelector)(state).title
  };
})(function (_ref) {
  var title = _ref.title;
  return _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("h1", {
    id: "graphHeading"
  }, title));
});
exports.GraphTitle = GraphTitle;