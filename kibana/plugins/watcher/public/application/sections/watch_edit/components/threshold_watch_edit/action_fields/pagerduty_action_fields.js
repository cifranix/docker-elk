"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagerDutyActionFields = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _form_errors = require("../../../../../components/form_errors");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PagerDutyActionFields = function PagerDutyActionFields(_ref) {
  var errors = _ref.errors,
      hasErrors = _ref.hasErrors,
      action = _ref.action,
      editAction = _ref.editAction,
      children = _ref.children;
  var description = action.description;
  return _react.default.createElement(_react.Fragment, null, children, _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "pagerDutyDescription",
    errorKey: "description",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && description !== undefined,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.pagerDutyAction.descriptionFieldLabel', {
      defaultMessage: 'Description'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "description",
    value: description || '',
    "data-test-subj": "pagerdutyDescriptionInput",
    onChange: function onChange(e) {
      editAction({
        key: 'description',
        value: e.target.value
      });
    },
    onBlur: function onBlur() {
      if (!description) {
        editAction({
          key: 'description',
          value: ''
        });
      }
    }
  })));
};

exports.PagerDutyActionFields = PagerDutyActionFields;