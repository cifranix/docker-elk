"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexActionFields = void 0;

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
var IndexActionFields = function IndexActionFields(_ref) {
  var action = _ref.action,
      editAction = _ref.editAction,
      errors = _ref.errors,
      hasErrors = _ref.hasErrors;
  var index = action.index;
  return _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "indexName",
    errorKey: "index",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && index !== undefined,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.indexAction.indexFieldLabel', {
      defaultMessage: 'Index'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "index",
    "data-test-subj": "indexInput",
    value: index || '',
    onChange: function onChange(e) {
      editAction({
        key: 'index',
        value: e.target.value
      });
    },
    onBlur: function onBlur() {
      if (!index) {
        editAction({
          key: 'index',
          value: ''
        });
      }
    }
  }));
};

exports.IndexActionFields = IndexActionFields;