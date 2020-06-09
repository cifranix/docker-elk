"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldTypesSelect = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FieldTypesSelect = function FieldTypesSelect(_ref) {
  var fieldTypes = _ref.fieldTypes,
      selectedFieldType = _ref.selectedFieldType,
      setSelectedFieldType = _ref.setSelectedFieldType;
  var options = [{
    value: '*',
    text: _i18n.i18n.translate('xpack.ml.datavisualizer.fieldTypesSelect.allFieldsTypeOptionLabel', {
      defaultMessage: 'All field types'
    })
  }];
  fieldTypes.forEach(function (fieldType) {
    options.push({
      value: fieldType,
      text: _i18n.i18n.translate('xpack.ml.datavisualizer.fieldTypesSelect.typeOptionLabel', {
        defaultMessage: '{fieldType} types',
        values: {
          fieldType: fieldType
        }
      })
    });
  });
  return _react.default.createElement(_eui.EuiSelect, {
    options: options,
    value: selectedFieldType,
    onChange: function onChange(e) {
      return setSelectedFieldType(e.target.value);
    },
    "aria-label": _i18n.i18n.translate('xpack.ml.datavisualizer.fieldTypesSelect.selectAriaLabel', {
      defaultMessage: 'Select field types to display'
    }),
    "data-test-subj": "mlDataVisualizerFieldTypesSelect"
  });
};

exports.FieldTypesSelect = FieldTypesSelect;