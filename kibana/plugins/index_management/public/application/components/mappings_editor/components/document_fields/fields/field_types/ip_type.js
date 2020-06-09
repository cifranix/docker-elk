"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IpType = void 0;

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../../../lib");

var _field_parameters = require("../../field_parameters");

var _shared_imports = require("../../../../shared_imports");

var _edit_field = require("../edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  switch (param) {
    case 'boost':
      {
        return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
      }

    case 'null_value':
      {
        return field.null_value !== undefined && field.null_value !== '';
      }

    default:
      return false;
  }
};

var IpType = function IpType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IndexParameter, {
    hasIndexOptions: false
  })), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.DocValuesParameter, null), _react.default.createElement(_field_parameters.NullValueParameter, {
    defaultToggleValue: getDefaultToggleValue('null_value', field.source)
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "null_value",
    config: (0, _lib.getFieldConfig)('null_value_ip'),
    component: _shared_imports.Field
  })), _react.default.createElement(_field_parameters.StoreParameter, null), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
};

exports.IpType = IpType;