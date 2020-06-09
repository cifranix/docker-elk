"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategorizationSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _bucket_span = require("../bucket_span");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CategorizationSettings = function CategorizationSettings(_ref) {
  var setIsValid = _ref.setIsValid;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_bucket_span.BucketSpan, {
    setIsValid: setIsValid,
    hideEstimateButton: true
  }))));
};

exports.CategorizationSettings = CategorizationSettings;