"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggingActionFields = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _form_errors = require("../../../../../components/form_errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LoggingActionFields = function LoggingActionFields(_ref) {
  var action = _ref.action,
      editAction = _ref.editAction,
      errors = _ref.errors,
      hasErrors = _ref.hasErrors;
  var text = action.text;
  return _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "loggingText",
    errorKey: "text",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && text !== undefined,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.loggingAction.logTextFieldLabel', {
      defaultMessage: 'Log text'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "text",
    value: text || '',
    "data-test-subj": "loggingTextInput",
    onChange: function onChange(e) {
      editAction({
        key: 'text',
        value: e.target.value
      });
    },
    onBlur: function onBlur() {
      if (!text) {
        editAction({
          key: 'text',
          value: ''
        });
      }
    }
  }));
};

exports.LoggingActionFields = LoggingActionFields;