"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateInputFieldNotEmpty = exports.createInputFieldProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createInputFieldProps = function createInputFieldProps(_ref) {
  var errors = _ref.errors,
      name = _ref.name,
      _onChange = _ref.onChange,
      value = _ref.value;
  return {
    error: errors,
    isInvalid: errors.length > 0,
    name: name,
    onChange: function onChange(evt) {
      return _onChange(evt.currentTarget.value);
    },
    value: value
  };
};

exports.createInputFieldProps = createInputFieldProps;

var validateInputFieldNotEmpty = function validateInputFieldNotEmpty(value) {
  return value === '' ? [_react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.sourceConfiguration.fieldEmptyErrorMessage",
    defaultMessage: "The field must not be empty"
  })] : [];
};

exports.validateInputFieldNotEmpty = validateInputFieldNotEmpty;