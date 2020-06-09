"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FielddataFrequencyFilterAbsolute = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FielddataFrequencyFilterAbsolute = function FielddataFrequencyFilterAbsolute(_ref) {
  var min = _ref.min,
      max = _ref.max;
  var minIsInvalid = !min.isChangingValue && min.errors.length > 0;
  var minErrorMessage = !min.isChangingValue && min.errors.length ? min.errors[0].message : null;
  var maxIsInvalid = !max.isChangingValue && max.errors.length > 0;
  var maxErrorMessage = !max.isChangingValue && max.errors.length ? max.errors[0].message : null;
  return _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    isInvalid: minIsInvalid || maxIsInvalid,
    error: minErrorMessage || maxErrorMessage,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.fielddata.frequencyFilterAbsoluteFieldLabel",
      defaultMessage: "Absolute frequency range"
    })
  }, _react.default.createElement(_eui.EuiFormControlLayoutDelimited, {
    startControl: _react.default.createElement(_eui.EuiFieldNumber, {
      value: min.value,
      onChange: min.onChange,
      isLoading: min.isValidating,
      isInvalid: minIsInvalid,
      fullWidth: true,
      "data-test-subj": "input",
      controlOnly: true,
      "aria-label": _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.frequencyFilterAbsoluteMinAriaLabel', {
        defaultMessage: 'Minimum absolute frequency'
      })
    }),
    endControl: _react.default.createElement(_eui.EuiFieldNumber, {
      value: max.value,
      onChange: max.onChange,
      isLoading: max.isValidating,
      isInvalid: maxIsInvalid,
      fullWidth: true,
      "data-test-subj": "input",
      controlOnly: true,
      "aria-label": _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.fielddata.frequencyFilterAbsoluteMaxAriaLabel', {
        defaultMessage: 'Maximum absolute frequency'
      })
    })
  }));
};

exports.FielddataFrequencyFilterAbsolute = FielddataFrequencyFilterAbsolute;