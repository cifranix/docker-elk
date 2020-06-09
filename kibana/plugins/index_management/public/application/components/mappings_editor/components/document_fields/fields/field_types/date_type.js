"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _lib = require("../../../../lib");

var _field_parameters = require("../../field_parameters");

var _edit_field = require("../edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDefaultToggleValue = function getDefaultToggleValue(param, field) {
  switch (param) {
    case 'locale':
    case 'format':
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

var DateType = function DateType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IndexParameter, {
    hasIndexOptions: false
  }), _react.default.createElement(_field_parameters.FormatParameter, {
    defaultValue: field.source.format,
    defaultToggleValue: getDefaultToggleValue('format', field.source)
  }), _react.default.createElement(_field_parameters.IgnoreMalformedParameter, null)), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.LocaleParameter, {
    defaultToggleValue: getDefaultToggleValue('locale', field.source)
  }), _react.default.createElement(_field_parameters.DocValuesParameter, null), _react.default.createElement(_field_parameters.NullValueParameter, {
    defaultToggleValue: getDefaultToggleValue('null_value', field.source),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.dateType.nullValueFieldDescription', {
      defaultMessage: 'Replace explicit null values with a date value so that it can be indexed and searched.'
    })
  }), _react.default.createElement(_field_parameters.StoreParameter, null), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
};

exports.DateType = DateType;