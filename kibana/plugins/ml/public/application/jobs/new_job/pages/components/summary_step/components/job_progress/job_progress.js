"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobProgress = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var JobProgress = function JobProgress(_ref) {
  var progress = _ref.progress;

  if (progress > 0 && progress < 100) {
    return _react.default.createElement(_eui.EuiProgress, {
      value: progress,
      color: "primary",
      size: "xs",
      max: 100
    });
  } else {
    return null;
  }
};

exports.JobProgress = JobProgress;