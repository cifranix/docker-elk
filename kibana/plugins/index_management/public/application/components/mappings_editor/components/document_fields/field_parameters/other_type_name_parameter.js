"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtherTypeNameParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var emptyField = _shared_imports.fieldValidators.emptyField;
/**
 * This is a special component that does not have an explicit entry in {@link PARAMETERS_DEFINITION}.
 *
 * We use it to store the name of types unknown to the mappings editor in the "subType" path.
 */

var fieldConfig = {
  label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.otherTypeNameFieldLabel', {
    defaultMessage: 'Type Name'
  }),
  defaultValue: '',
  validations: [{
    validator: emptyField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.otherTypeNameIsRequiredErrorMessage', {
      defaultMessage: 'The type name is required.'
    }))
  }]
};

var OtherTypeNameParameter = function OtherTypeNameParameter() {
  return _react.default.createElement(_shared_imports.UseField, {
    path: "subType",
    config: fieldConfig,
    component: _shared_imports.TextField
  });
};

exports.OtherTypeNameParameter = OtherTypeNameParameter;