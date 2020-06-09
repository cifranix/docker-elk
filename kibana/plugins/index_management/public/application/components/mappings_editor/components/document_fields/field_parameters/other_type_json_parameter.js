"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtherTypeJsonParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _shared_imports = require("../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isJsonField = _shared_imports.fieldValidators.isJsonField;
/**
 * This is a special component that does not have an explicit entry in {@link PARAMETERS_DEFINITION}.
 *
 * We use it to store custom defined parameters in a field called "otherTypeJson".
 */

var fieldConfig = {
  label: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.otherTypeJsonFieldLabel', {
    defaultMessage: 'Type Parameters JSON'
  }),
  defaultValue: {},
  validations: [{
    validator: isJsonField(_i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.otherTypeJsonInvalidJSONErrorMessage', {
      defaultMessage: 'Invalid JSON.'
    }))
  }, {
    validator: function validator(_ref) {
      var value = _ref.value;
      var json = JSON.parse(value);

      if (Array.isArray(json)) {
        return {
          message: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.otherTypeJsonArrayNotAllowedErrorMessage', {
            defaultMessage: 'Arrays are not allowed.'
          })
        };
      }
    }
  }, {
    validator: function validator(_ref2) {
      var value = _ref2.value;
      var json = JSON.parse(value);

      if (json.type) {
        return {
          code: 'ERR_CUSTOM_TYPE_OVERRIDDEN',
          message: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.parameters.validations.otherTypeJsonTypeFieldErrorMessage', {
            defaultMessage: 'Cannot override the "type" field.'
          })
        };
      }
    }
  }],
  deserializer: function deserializer(value) {
    if (value === '') {
      return value;
    }

    return JSON.stringify(value, null, 2);
  },
  serializer: function serializer(value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      // swallow error and return non-parsed value;
      return value;
    }
  }
};

var OtherTypeJsonParameter = function OtherTypeJsonParameter() {
  return _react.default.createElement(_shared_imports.UseField, {
    path: "otherTypeJson",
    config: fieldConfig,
    component: _shared_imports.JsonEditorField
  });
};

exports.OtherTypeJsonParameter = OtherTypeJsonParameter;