"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedDetectorsSummary = void 0;

var _react = _interopRequireDefault(require("react"));

var _detector_list = require("./detector_list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AdvancedDetectorsSummary = function AdvancedDetectorsSummary() {
  return _react.default.createElement(_detector_list.DetectorList, {
    isActive: false,
    onEditJob: function onEditJob() {},
    onDeleteJob: function onDeleteJob() {}
  });
};

exports.AdvancedDetectorsSummary = AdvancedDetectorsSummary;