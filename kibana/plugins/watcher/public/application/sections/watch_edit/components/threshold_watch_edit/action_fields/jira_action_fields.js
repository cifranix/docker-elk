"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JiraActionFields = void 0;

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
var JiraActionFields = function JiraActionFields(_ref) {
  var action = _ref.action,
      editAction = _ref.editAction,
      errors = _ref.errors,
      hasErrors = _ref.hasErrors,
      children = _ref.children;
  var projectKey = action.projectKey,
      issueType = action.issueType,
      summary = action.summary;
  return _react.default.createElement(_react.Fragment, null, children, _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "jiraProjectKey",
    errorKey: "projectKey",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && projectKey !== undefined,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.jiraAction.projectKeyFieldLabel', {
      defaultMessage: 'Project key'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "projectKey",
    value: projectKey || '',
    "data-test-subj": "jiraProjectKeyInput",
    onChange: function onChange(e) {
      editAction({
        key: 'projectKey',
        value: e.target.value
      });
    },
    onBlur: function onBlur() {
      if (!projectKey) {
        editAction({
          key: 'projectKey',
          value: ''
        });
      }
    }
  })), _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "jiraIssueType",
    errorKey: "issueType",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && issueType !== undefined,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.jiraAction.issueTypeFieldLabel', {
      defaultMessage: 'Issue type'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    value: issueType || '',
    name: "issueType",
    "data-test-subj": "jiraIssueTypeInput",
    onChange: function onChange(e) {
      editAction({
        key: 'issueType',
        value: e.target.value
      });
    },
    onBlur: function onBlur() {
      if (!issueType) {
        editAction({
          key: 'issueType',
          value: ''
        });
      }
    }
  })), _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "jiraSummary",
    errorKey: "summary",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && summary !== undefined,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.jiraAction.summaryFieldLabel', {
      defaultMessage: 'Summary'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    value: summary || '',
    name: "summary",
    "data-test-subj": "jiraSummaryInput",
    onChange: function onChange(e) {
      editAction({
        key: 'summary',
        value: e.target.value
      });
    },
    onBlur: function onBlur() {
      if (!summary) {
        editAction({
          key: 'summary',
          value: ''
        });
      }
    }
  })));
};

exports.JiraActionFields = JiraActionFields;