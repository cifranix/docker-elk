"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;
exports.ServerLogParamsFields = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _add_message_variables = require("../add_message_variables");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getActionType() {
  return {
    id: '.server-log',
    iconClass: 'logsApp',
    selectMessage: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.serverLogAction.selectMessageText', {
      defaultMessage: 'Add a message to a Kibana log.'
    }),
    actionTypeTitle: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.serverLogAction.actionTypeTitle', {
      defaultMessage: 'Send to Server log'
    }),
    validateConnector: function validateConnector() {
      return {
        errors: {}
      };
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
        errors.message.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredServerLogMessageText', {
          defaultMessage: 'Message is required.'
        }));
      }

      return validationResult;
    },
    actionConnectorFields: null,
    actionParamsFields: ServerLogParamsFields
  };
}

var ServerLogParamsFields = function ServerLogParamsFields(_ref) {
  var actionParams = _ref.actionParams,
      editAction = _ref.editAction,
      index = _ref.index,
      errors = _ref.errors,
      messageVariables = _ref.messageVariables,
      defaultMessage = _ref.defaultMessage;
  var message = actionParams.message,
      level = actionParams.level;
  var levelOptions = [{
    value: 'trace',
    text: 'Trace'
  }, {
    value: 'debug',
    text: 'Debug'
  }, {
    value: 'info',
    text: 'Info'
  }, {
    value: 'warn',
    text: 'Warning'
  }, {
    value: 'error',
    text: 'Error'
  }, {
    value: 'fatal',
    text: 'Fatal'
  }];
  (0, _react.useEffect)(function () {
    editAction('level', 'info', index);

    if (!message && defaultMessage && defaultMessage.length > 0) {
      editAction('message', defaultMessage, index);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  var onSelectMessageVariable = function onSelectMessageVariable(paramsProperty, variable) {
    editAction(paramsProperty, (message !== null && message !== void 0 ? message : '').concat(" {{".concat(variable, "}}")), index);
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "loggingLevel",
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.serverLogAction.logLevelFieldLabel', {
      defaultMessage: 'Level'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    fullWidth: true,
    id: "loggLevelSelect",
    "data-test-subj": "loggingLevelSelect",
    options: levelOptions,
    value: level,
    defaultValue: 'info',
    onChange: function onChange(e) {
      editAction('level', e.target.value, index);
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    id: "loggingMessage",
    fullWidth: true,
    error: errors.message,
    isInvalid: errors.message.length > 0 && message !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.serverLogAction.logMessageFieldLabel', {
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
    value: message || '',
    name: "message",
    "data-test-subj": "loggingMessageInput",
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

exports.ServerLogParamsFields = ServerLogParamsFields;