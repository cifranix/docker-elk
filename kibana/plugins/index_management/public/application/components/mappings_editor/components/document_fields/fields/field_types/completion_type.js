"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompletionType = void 0;

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
    case 'max_input_length':
      {
        return field[param] !== undefined && field[param] !== (0, _lib.getFieldConfig)(param).defaultValue;
      }

    case 'analyzers':
      {
        return field.search_analyzer !== undefined && field.search_analyzer !== field.analyzer;
      }

    default:
      return false;
  }
};

var CompletionType = function CompletionType(_ref) {
  var field = _ref.field;
  return _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.AnalyzersParameter, {
    field: field
  }), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.completion.maxInputLengthFieldTitle', {
      defaultMessage: 'Set max input length'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.completion.maxInputLengthFieldDescription', {
      defaultMessage: 'Limits the length of a single input.'
    }),
    defaultToggleValue: getDefaultToggleValue('max_input_length', field.source)
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "max_input_length",
    config: (0, _lib.getFieldConfig)('max_input_length'),
    component: _shared_imports.Field
  })), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.completion.preserveSeparatorsFieldTitle', {
      defaultMessage: 'Preserve separators'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.completion.preserveSeparatorsFieldDescription', {
      defaultMessage: 'Preserves the separators.'
    }),
    formFieldPath: "preserve_separators"
  }), _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.completion.preservePositionIncrementsFieldTitle', {
      defaultMessage: 'Preserve position increments'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.completion.preservePositionIncrementsFieldDescription', {
      defaultMessage: 'Enables position increments.'
    }),
    formFieldPath: "preserve_position_increments"
  }));
};

exports.CompletionType = CompletionType;