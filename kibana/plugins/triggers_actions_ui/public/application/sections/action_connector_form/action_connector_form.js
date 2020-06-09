"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBaseProperties = validateBaseProperties;
exports.ActionConnectorForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function validateBaseProperties(actionObject) {
  var validationResult = {
    errors: {}
  };
  var verrors = {
    name: new Array()
  };
  validationResult.errors = verrors;

  if (!actionObject.name) {
    verrors.name.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.actionConnectorForm.error.requiredNameText', {
      defaultMessage: 'Name is required.'
    }));
  }

  return validationResult;
}

var ActionConnectorForm = function ActionConnectorForm(_ref) {
  var connector = _ref.connector,
      dispatch = _ref.dispatch,
      actionTypeName = _ref.actionTypeName,
      serverError = _ref.serverError,
      errors = _ref.errors,
      actionTypeRegistry = _ref.actionTypeRegistry,
      http = _ref.http;

  var setActionProperty = function setActionProperty(key, value) {
    dispatch({
      command: {
        type: 'setProperty'
      },
      payload: {
        key: key,
        value: value
      }
    });
  };

  var setActionConfigProperty = function setActionConfigProperty(key, value) {
    dispatch({
      command: {
        type: 'setConfigProperty'
      },
      payload: {
        key: key,
        value: value
      }
    });
  };

  var setActionSecretsProperty = function setActionSecretsProperty(key, value) {
    dispatch({
      command: {
        type: 'setSecretsProperty'
      },
      payload: {
        key: key,
        value: value
      }
    });
  };

  var actionTypeRegistered = actionTypeRegistry.get(connector.actionTypeId);
  if (!actionTypeRegistered) return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionConnectorForm.actions.actionTypeConfigurationWarningTitleText', {
      defaultMessage: 'Action type not registered'
    }),
    color: "warning",
    iconType: "help"
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.actionConnectorForm.actions.actionConfigurationWarningDescriptionText",
    defaultMessage: "To create this connector, you must configure at least one {actionType} account. {docLink}",
    values: {
      actionType: actionTypeName,
      docLink: _react.default.createElement(_eui.EuiLink, {
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.actionConnectorForm.actions.actionConfigurationWarningHelpLinkText",
        defaultMessage: "Learn more."
      }))
    }
  })))), _react.default.createElement(_eui.EuiSpacer, null));
  var FieldsComponent = actionTypeRegistered.actionConnectorFields;
  return _react.default.createElement(_eui.EuiForm, {
    isInvalid: !!serverError,
    error: serverError === null || serverError === void 0 ? void 0 : serverError.body.message
  }, _react.default.createElement(_eui.EuiFormRow, {
    id: "actionName",
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.actionConnectorForm.actionNameLabel",
      defaultMessage: "Connector name"
    }),
    isInvalid: errors.name.length > 0 && connector.name !== undefined,
    error: errors.name
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    autoFocus: true,
    isInvalid: errors.name.length > 0 && connector.name !== undefined,
    name: "name",
    placeholder: "Untitled",
    "data-test-subj": "nameInput",
    value: connector.name || '',
    onChange: function onChange(e) {
      setActionProperty('name', e.target.value);
    },
    onBlur: function onBlur() {
      if (!connector.name) {
        setActionProperty('name', '');
      }
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), FieldsComponent !== null ? _react.default.createElement(FieldsComponent, {
    action: connector,
    errors: errors,
    editActionConfig: setActionConfigProperty,
    editActionSecrets: setActionSecretsProperty,
    http: http
  }) : null);
};

exports.ActionConnectorForm = ActionConnectorForm;