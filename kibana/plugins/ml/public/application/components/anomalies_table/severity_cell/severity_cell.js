"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeverityCell = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _multi_bucket_impact = require("../../../../../common/constants/multi_bucket_impact");

var _anomaly_utils = require("../../../../../common/util/anomaly_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Renders anomaly severity score with single or multi-bucket impact marker.
 */
var SeverityCell = (0, _react.memo)(function (_ref) {
  var score = _ref.score,
      multiBucketImpact = _ref.multiBucketImpact;
  var severity = score >= 1 ? Math.floor(score) : '< 1';
  var color = (0, _anomaly_utils.getSeverityColor)(score);
  var isMultiBucket = multiBucketImpact >= _multi_bucket_impact.MULTI_BUCKET_IMPACT.MEDIUM;
  return isMultiBucket ? _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    alignItems: "center",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "-2 -2 20 20",
    fill: color
  }, _react.default.createElement("path", {
    d: "M-6.708203932499369,-2.23606797749979H-2.23606797749979V-6.708203932499369H2.23606797749979V-2.23606797749979H6.708203932499369V2.23606797749979H2.23606797749979V6.708203932499369H-2.23606797749979V2.23606797749979H-6.708203932499369Z",
    transform: "translate(8,8)"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, severity)) : _react.default.createElement(_eui.EuiHealth, {
    color: color
  }, severity);
});
exports.SeverityCell = SeverityCell;