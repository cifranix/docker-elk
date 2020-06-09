"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lib = require("../../../lib");

var _shared_imports = require("../../../shared_imports");

var _constants = require("../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TypeParameter = function TypeParameter(_ref) {
  var onTypeChange = _ref.onTypeChange,
      isMultiField = _ref.isMultiField,
      docLink = _ref.docLink,
      isRootLevelField = _ref.isRootLevelField;
  return _react.default.createElement(_shared_imports.UseField, {
    path: "type",
    config: (0, _lib.getFieldConfig)('type')
  }, function (typeField) {
    var error = typeField.getErrorsMessages();
    var isInvalid = error ? Boolean(error.length) : false;
    return _react.default.createElement(_eui.EuiFormRow, {
      label: typeField.label,
      error: error,
      isInvalid: isInvalid,
      helpText: docLink ? _react.default.createElement(_eui.EuiText, {
        size: "xs"
      }, _react.default.createElement(_eui.EuiLink, {
        href: docLink,
        target: "_blank"
      }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.typeField.documentationLinkLabel', {
        defaultMessage: '{typeName} documentation',
        values: {
          typeName: typeField.value && typeField.value[0] ? typeField.value[0].label : ''
        }
      }))) : null
    }, _react.default.createElement(_eui.EuiComboBox, {
      placeholder: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.typeField.placeholderLabel', {
        defaultMessage: 'Select a type'
      }),
      singleSelection: {
        asPlainText: true
      },
      options: isMultiField ? (0, _lib.filterTypesForMultiField)(_constants.FIELD_TYPES_OPTIONS) : isRootLevelField ? _constants.FIELD_TYPES_OPTIONS : (0, _lib.filterTypesForNonRootFields)(_constants.FIELD_TYPES_OPTIONS),
      selectedOptions: typeField.value,
      onChange: onTypeChange,
      isClearable: false,
      "data-test-subj": "fieldType"
    }));
  });
};

exports.TypeParameter = TypeParameter;