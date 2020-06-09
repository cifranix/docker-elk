"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NestedType = void 0;

var _react = _interopRequireDefault(require("react"));

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NestedType = function NestedType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.DynamicParameter, {
    defaultToggleValue: field.source.dynamic === true || field.source.dynamic === undefined
  }));
};

exports.NestedType = NestedType;