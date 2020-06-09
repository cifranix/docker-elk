"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumericType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _lib = require("../../../../lib");

var _shared_imports = require("../../../../shared_imports");

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

var _constants = require("../../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  switch (param) {
    case 'copy_to':
    case 'boost':
    case 'ignore_malformed':
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

var NumericType = function NumericType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_shared_imports.FormDataProvider, {
    pathsToWatch: "subType"
  }, function (formData) {
    return formData.subType === 'scaled_float' ? _react.default.createElement(_edit_field.EditFieldFormRow, {
      title: _constants.PARAMETERS_DEFINITION.scaling_factor.title,
      description: _constants.PARAMETERS_DEFINITION.scaling_factor.description,
      withToggle: false
    }, _react.default.createElement(_shared_imports.UseField, {
      path: "scaling_factor",
      config: (0, _lib.getFieldConfig)('scaling_factor'),
      component: _shared_imports.Field
    })) : null;
  }), _react.default.createElement(_field_parameters.IndexParameter, {
    hasIndexOptions: false
  }), _react.default.createElement(_field_parameters.IgnoreMalformedParameter, null)), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.CoerceNumberParameter, null), _react.default.createElement(_field_parameters.DocValuesParameter, null), _react.default.createElement(_field_parameters.CopyToParameter, {
    defaultToggleValue: getDefaultToggleValue('copy_to', field.source)
  }), _react.default.createElement(_field_parameters.NullValueParameter, {
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.numeric.nullValueFieldDescription', {
      defaultMessage: 'Accepts a numeric value of the same type as the field which is substituted for any explicit null values.'
    }),
    defaultToggleValue: getDefaultToggleValue('null_value', field.source)
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "null_value",
    component: _shared_imports.NumericField,
    config: (0, _lib.getFieldConfig)('null_value_numeric')
  })), _react.default.createElement(_field_parameters.StoreParameter, null), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
};

exports.NumericType = NumericType;