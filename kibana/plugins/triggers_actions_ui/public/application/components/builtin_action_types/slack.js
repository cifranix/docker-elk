"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _add_message_variables = require("../add_message_variables");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getActionType() {
  return {
    id: '.slack',
    iconClass: 'logoSlack',
    selectMessage: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.slackAction.selectMessageText', {
      defaultMessage: 'Send a message to a Slack channel or user.'
    }),
    actionTypeTitle: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.slackAction.actionTypeTitle', {
      defaultMessage: 'Send to Slack'
    }),
    validateConnector: function validateConnector(action) {
      var validationResult = {
        errors: {}
      };
      var errors = {
        webhookUrl: new Array()
      };
      validationResult.errors = errors;

      if (!action.secrets.webhookUrl) {
        errors.webhookUrl.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.slackAction.error.requiredWebhookUrlText', {
          defaultMessage: 'Webhook URL is required.'
        }));
      }

      return validationResult;
    },
    validateParams: function validateParams(actionParams) {
      var _actionParams$message;

      var validationResult = {
        errors: {}
      };
      var errors = {
        message: new Array()
      };
      validationResult.errors = errors;

      if (!((_actionParams$message = actionParams.message) === null || _actionParams$message === void 0 ? void 0 : _actionParams$message.length)) {
        errors.message.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredSlackMessageText', {
          defaultMessage: 'Message is required.'
        }));
      }

      return validationResult;
    },
    actionConnectorFields: SlackActionFields,
    actionParamsFields: SlackParamsFields
  };
}

var SlackActionFields = function SlackActionFields(_ref) {
  var action = _ref.action,
      editActionSecrets = _ref.editActionSecrets,
      errors = _ref.errors;
  var webhookUrl = action.secrets.webhookUrl;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "webhookUrl",
    fullWidth: true,
    helpText: _react.default.createElement(_eui.EuiLink, {
      href: "https://www.elastic.co/guide/en/elasticsearch/reference/current/actions-slack.html#configuring-slack",
      target: "_blank"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.builtinActionTypes.slackAction.webhookUrlHelpLabel",
      defaultMessage: "Create a Slack webhook URL"
    })),
    error: errors.webhookUrl,
    isInvalid: errors.webhookUrl.length > 0 && webhookUrl !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.slackAction.webhookUrlTextFieldLabel', {
      defaultMessage: 'Webhook URL'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: errors.webhookUrl.length > 0 && webhookUrl !== undefined,
    name: "webhookUrl",
    placeholder: "Example: https://hooks.slack.com/services",
    value: webhookUrl || '',
    "data-test-subj": "slackWebhookUrlInput",
    onChange: function onChange(e) {
      editActionSecrets('webhookUrl', e.target.value);
    },
    onBlur: function onBlur() {
      if (!webhookUrl) {
        editActionSecrets('webhookUrl', '');
      }
    }
  })));
};

var SlackParamsFields = function SlackParamsFields(_ref2) {
  var actionParams = _ref2.actionParams,
      editAction = _ref2.editAction,
      index = _ref2.index,
      errors = _ref2.errors,
      messageVariables = _ref2.messageVariables,
      defaultMessage = _ref2.defaultMessage;
  var message = actionParams.message;
  (0, _react.useEffect)(function () {
    if (!message && defaultMessage && defaultMessage.length > 0) {
      editAction('message', defaultMessage, index);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  var onSelectMessageVariable = function onSelectMessageVariable(paramsProperty, variable) {
    editAction(paramsProperty, (message !== null && message !== void 0 ? message : '').concat(" {{".concat(variable, "}}")), index);
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "slackMessage",
    fullWidth: true,
    error: errors.message,
    isInvalid: errors.message.length > 0 && message !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.slackAction.messageTextAreaFieldLabel', {
      defaultMessage: 'Message'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('message', variable);
      },
      paramsProperty: "message"
    })
  }, _react.default.createElement(_eui.EuiTextArea, {
    fullWidth: true,
    isInvalid: errors.message.length > 0 && message !== undefined,
    name: "message",
    value: message || '',
    "data-test-subj": "slackMessageTextArea",
    onChange: function onChange(e) {
      editAction('message', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!message) {
        editAction('message', '', index);
      }
    }
  })));
};