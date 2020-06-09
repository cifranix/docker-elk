"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooleanType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _lib = require("../../../../lib");

var _shared_imports = require("../../../../shared_imports");

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
    case 'boost':
      {
        return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
      }

    case 'null_value':
      {
        return field.null_value !== undefined;
      }

    default:
      return false;
  }
};

var nullValueOptions = [{
  value: 0,
  text: "\"true\""
}, {
  value: 1,
  text: 'true'
}, {
  value: 2,
  text: "\"false\""
}, {
  value: 3,
  text: 'false'
}];

var BooleanType = function BooleanType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.IndexParameter, {
    hasIndexOptions: false
  })), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.DocValuesParameter, null), _react.default.createElement(_field_parameters.NullValueParameter, {
    defaultToggleValue: getDefaultToggleValue('null_value', field.source),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.booleanNullValueFieldDescription', {
      defaultMessage: 'Replace explicit null values with a specific boolean value so that it can be indexed and searched.'
    })
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "null_value",
    config: (0, _lib.getFieldConfig)('null_value_boolean'),
    component: _shared_imports.SelectField,
    componentProps: {
      euiFieldProps: {
        options: nullValueOptions,
        fullWidth: true
      }
    }
  })), _react.default.createElement(_field_parameters.StoreParameter, null), _react.default.createElement(_field_parameters.BoostParameter, {
    defaultToggleValue: getDefaultToggleValue('boost', field.source)
  })));
};

exports.BooleanType = BooleanType;