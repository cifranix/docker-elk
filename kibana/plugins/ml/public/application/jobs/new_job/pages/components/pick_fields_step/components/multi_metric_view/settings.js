"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiMetricSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _bucket_span = require("../bucket_span");

var _split_field = require("../split_field");

var _influencers = require("../influencers");

var _sparse_data = require("../sparse_data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MultiMetricSettings = function MultiMetricSettings(_ref) {
  var setIsValid = _ref.setIsValid;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_split_field.SplitFieldSelector, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_influencers.Influencers, null))), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_bucket_span.BucketSpan, {
    setIsValid: setIsValid
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_sparse_data.SparseDataSwitch, null))));
};

exports.MultiMetricSettings = MultiMetricSettings;