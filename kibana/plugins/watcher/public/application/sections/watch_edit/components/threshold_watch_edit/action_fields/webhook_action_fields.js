"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebhookActionFields = void 0;

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
var HTTP_VERBS = ['head', 'get', 'post', 'put', 'delete'];
var SCHEME = ['http', 'https'];

var WebhookActionFields = function WebhookActionFields(_ref) {
  var action = _ref.action,
      editAction = _ref.editAction,
      errors = _ref.errors,
      hasErrors = _ref.hasErrors;
  var method = action.method,
      host = action.host,
      port = action.port,
      scheme = action.scheme,
      path = action.path,
      body = action.body,
      username = action.username,
      password = action.password;
  (0, _react.useEffect)(function () {
    editAction({
      key: 'contentType',
      value: 'application/json'
    }); // set content-type for threshold watch to json by default
  }, [editAction]);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.methodFieldLabel', {
      defaultMessage: 'Method'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    name: "method",
    value: method || 'get',
    "data-test-subj": "webhookMethodSelect",
    options: HTTP_VERBS.map(function (verb) {
      return {
        text: verb.toUpperCase(),
        value: verb
      };
    }),
    onChange: function onChange(e) {
      editAction({
        key: 'method',
        value: e.target.value
      });
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.schemeFieldLabel', {
      defaultMessage: 'Scheme'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    name: "scheme",
    value: scheme,
    "data-test-subj": "webhookSchemeSelect",
    options: SCHEME.map(function (verb) {
      return {
        text: verb,
        value: verb
      };
    }),
    onChange: function onChange(e) {
      editAction({
        key: 'scheme',
        value: e.target.value
      });
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "webhookHost",
    errorKey: "host",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && host !== undefined,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.hostFieldLabel', {
      defaultMessage: 'Host'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "host",
    value: host || '',
    "data-test-subj": "webhookHostInput",
    onChange: function onChange(e) {
      editAction({
        key: 'host',
        value: e.target.value
      });
    },
    onBlur: function onBlur() {
      if (!host) {
        editAction({
          key: 'host',
          value: ''
        });
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "webhookPort",
    errorKey: "port",
    fullWidth: true,
    errors: errors,
    isShowingErrors: hasErrors && port !== undefined,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.methodPortLabel', {
      defaultMessage: 'Port'
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    prepend: ":",
    fullWidth: true,
    name: "port",
    value: port || '',
    "data-test-subj": "webhookPortInput",
    onChange: function onChange(e) {
      editAction({
        key: 'port',
        value: parseInt(e.target.value, 10)
      });
    },
    onBlur: function onBlur() {
      if (!port) {
        editAction({
          key: 'port',
          value: ''
        });
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.pathFieldLabel', {
      defaultMessage: 'Path (optional)'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    prepend: "/",
    fullWidth: true,
    name: "path",
    value: path || '',
    "data-test-subj": "webhookPathInput",
    onChange: function onChange(e) {
      editAction({
        key: 'path',
        value: e.target.value
      });
    }
  })))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "webhookBasicAuthUsername",
    errorKey: "username",
    isShowingErrors: hasErrors,
    errors: errors,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.basicAuthUsername', {
      defaultMessage: 'Username (optional)'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "username",
    value: username || '',
    "data-test-subj": "webhookUsernameInput",
    onChange: function onChange(e) {
      editAction({
        key: 'username',
        value: e.target.value
      });
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "webhookBasicAuthPassword",
    errorKey: "password",
    isShowingErrors: hasErrors,
    errors: errors,
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.basicAuthPassword', {
      defaultMessage: 'Password (optional)'
    })
  }, _react.default.createElement(_eui.EuiFieldPassword, {
    name: "password",
    value: password || '',
    "data-test-subj": "webhookPasswordInput",
    onChange: function onChange(e) {
      editAction({
        key: 'password',
        value: e.target.value
      });
    }
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_form_errors.ErrableFormRow, {
    id: "webhookBody",
    label: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.bodyFieldLabel', {
      defaultMessage: 'Body'
    }),
    errorKey: "body",
    isShowingErrors: hasErrors,
    fullWidth: true,
    errors: errors
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    width: "100%",
    height: "200px",
    theme: "textmate",
    "data-test-subj": "webhookBodyEditor",
    "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchEdit.threshold.webhookAction.bodyCodeEditorAriaLabel', {
      defaultMessage: 'Code editor'
    }),
    value: body || '',
    onChange: function onChange(json) {
      editAction({
        key: 'body',
        value: json
      });
    }
  })));
};

exports.WebhookActionFields = WebhookActionFields;