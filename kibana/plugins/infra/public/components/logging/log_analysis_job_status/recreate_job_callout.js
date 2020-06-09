"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecreateJobCallout = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _recreate_job_button = require("./recreate_job_button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RecreateJobCallout = function RecreateJobCallout(_ref) {
  var children = _ref.children,
      onRecreateMlJob = _ref.onRecreateMlJob,
      title = _ref.title;
  return _react.default.createElement(_eui.EuiCallOut, {
    color: "warning",
    iconType: "alert",
    title: title
  }, _react.default.createElement("p", null, children), _react.default.createElement(_recreate_job_button.RecreateJobButton, {
    color: "warning",
    onClick: onRecreateMlJob
  }));
};

exports.RecreateJobCallout = RecreateJobCallout;