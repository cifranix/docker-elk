"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _summary_count_field = require("../summary_count_field");

var _categorization_field = require("../categorization_field");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ExtraSettings = function ExtraSettings() {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_categorization_field.CategorizationField, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_summary_count_field.SummaryCountField, null))));
};

exports.ExtraSettings = ExtraSettings;