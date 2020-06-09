"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _pagerduty = _interopRequireDefault(require("./pagerduty.svg"));

var _add_message_variables = require("../add_message_variables");

var _has_mustache_tokens = require("../../lib/has_mustache_tokens");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getActionType() {
  return {
    id: '.pagerduty',
    iconClass: _pagerduty.default,
    selectMessage: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.selectMessageText', {
      defaultMessage: 'Send an event in PagerDuty.'
    }),
    actionTypeTitle: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.actionTypeTitle', {
      defaultMessage: 'Send to PagerDuty'
    }),
    validateConnector: function validateConnector(action) {
      var validationResult = {
        errors: {}
      };
      var errors = {
        routingKey: new Array()
      };
      validationResult.errors = errors;

      if (!action.secrets.routingKey) {
        errors.routingKey.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.error.requiredRoutingKeyText', {
          defaultMessage: 'A routing key is required.'
        }));
      }

      return validationResult;
    },
    validateParams: function validateParams(actionParams) {
      var _actionParams$summary;

      var validationResult = {
        errors: {}
      };
      var errors = {
        summary: new Array(),
        timestamp: new Array()
      };
      validationResult.errors = errors;

      if (!((_actionParams$summary = actionParams.summary) === null || _actionParams$summary === void 0 ? void 0 : _actionParams$summary.length)) {
        errors.summary.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.error.requiredSummaryText', {
          defaultMessage: 'Summary is required.'
        }));
      }

      if (actionParams.timestamp && !(0, _has_mustache_tokens.hasMustacheTokens)(actionParams.timestamp)) {
        if (isNaN(Date.parse(actionParams.timestamp))) {
          var _getValidTimestampExa = getValidTimestampExamples(),
              nowShortFormat = _getValidTimestampExa.nowShortFormat,
              nowLongFormat = _getValidTimestampExa.nowLongFormat;

          errors.timestamp.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.error.invalidTimestamp', {
            defaultMessage: 'Timestamp must be a valid date, such as {nowShortFormat} or {nowLongFormat}.',
            values: {
              nowShortFormat: nowShortFormat,
              nowLongFormat: nowLongFormat
            }
          }));
        }
      }

      return validationResult;
    },
    actionConnectorFields: PagerDutyActionConnectorFields,
    actionParamsFields: PagerDutyParamsFields
  };
}

var PagerDutyActionConnectorFields = function PagerDutyActionConnectorFields(_ref) {
  var errors = _ref.errors,
      action = _ref.action,
      editActionConfig = _ref.editActionConfig,
      editActionSecrets = _ref.editActionSecrets;
  var apiUrl = action.config.apiUrl;
  var routingKey = action.secrets.routingKey;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "apiUrl",
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.apiUrlTextFieldLabel', {
      defaultMessage: 'API URL (optional)'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "apiUrl",
    value: apiUrl || '',
    "data-test-subj": "pagerdutyApiUrlInput",
    onChange: function onChange(e) {
      editActionConfig('apiUrl', e.target.value);
    },
    onBlur: function onBlur() {
      if (!apiUrl) {
        editActionConfig('apiUrl', '');
      }
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    id: "routingKey",
    fullWidth: true,
    helpText: _react.default.createElement(_eui.EuiLink, {
      href: "https://www.elastic.co/guide/en/kibana/current/pagerduty-action-type.html",
      target: "_blank"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.routingKeyNameHelpLabel",
      defaultMessage: "Configure a PagerDuty account."
    })),
    error: errors.routingKey,
    isInvalid: errors.routingKey.length > 0 && routingKey !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.routingKeyTextFieldLabel', {
      defaultMessage: 'Integration key'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: errors.routingKey.length > 0 && routingKey !== undefined,
    name: "routingKey",
    value: routingKey || '',
    "data-test-subj": "pagerdutyRoutingKeyInput",
    onChange: function onChange(e) {
      editActionSecrets('routingKey', e.target.value);
    },
    onBlur: function onBlur() {
      if (!routingKey) {
        editActionSecrets('routingKey', '');
      }
    }
  })));
};

var PagerDutyParamsFields = function PagerDutyParamsFields(_ref2) {
  var actionParams = _ref2.actionParams,
      editAction = _ref2.editAction,
      index = _ref2.index,
      messageVariables = _ref2.messageVariables,
      errors = _ref2.errors;
  var eventAction = actionParams.eventAction,
      dedupKey = actionParams.dedupKey,
      summary = actionParams.summary,
      source = actionParams.source,
      severity = actionParams.severity,
      timestamp = actionParams.timestamp,
      component = actionParams.component,
      group = actionParams.group;
  var severityOptions = [{
    value: 'critical',
    text: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.severitySelectCriticalOptionLabel', {
      defaultMessage: 'Critical'
    })
  }, {
    value: 'error',
    text: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.severitySelectErrorOptionLabel', {
      defaultMessage: 'Error'
    })
  }, {
    value: 'warning',
    text: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.severitySelectWarningOptionLabel', {
      defaultMessage: 'Warning'
    })
  }, {
    value: 'info',
    text: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.severitySelectInfoOptionLabel', {
      defaultMessage: 'Info'
    })
  }];
  var eventActionOptions = [{
    value: 'trigger',
    text: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.eventSelectTriggerOptionLabel', {
      defaultMessage: 'Trigger'
    })
  }, {
    value: 'resolve',
    text: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.eventSelectResolveOptionLabel', {
      defaultMessage: 'Resolve'
    })
  }, {
    value: 'acknowledge',
    text: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.eventSelectAcknowledgeOptionLabel', {
      defaultMessage: 'Acknowledge'
    })
  }];

  var onSelectMessageVariable = function onSelectMessageVariable(paramsProperty, variable) {
    var _paramsProperty;

    editAction(paramsProperty, ((_paramsProperty = actionParams[paramsProperty]) !== null && _paramsProperty !== void 0 ? _paramsProperty : '').concat(" {{".concat(variable, "}}")), index);
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.severitySelectFieldLabel', {
      defaultMessage: 'Severity'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    fullWidth: true,
    "data-test-subj": "severitySelect",
    options: severityOptions,
    value: severity,
    onChange: function onChange(e) {
      editAction('severity', e.target.value, index);
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.eventActionSelectFieldLabel', {
      defaultMessage: 'Event action'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    fullWidth: true,
    "data-test-subj": "eventActionSelect",
    options: eventActionOptions,
    value: eventAction,
    onChange: function onChange(e) {
      editAction('eventAction', e.target.value, index);
    }
  })))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.dedupKeyTextFieldLabel', {
      defaultMessage: 'DedupKey (optional)'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('dedupKey', variable);
      },
      paramsProperty: "dedupKey"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "dedupKey",
    "data-test-subj": "dedupKeyInput",
    value: dedupKey || '',
    onChange: function onChange(e) {
      editAction('dedupKey', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!dedupKey) {
        editAction('dedupKey', '', index);
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    error: errors.timestamp,
    isInvalid: errors.timestamp.length > 0 && timestamp !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.timestampTextFieldLabel', {
      defaultMessage: 'Timestamp (optional)'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('timestamp', variable);
      },
      paramsProperty: "timestamp"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "timestamp",
    "data-test-subj": "timestampInput",
    value: timestamp || '',
    isInvalid: errors.timestamp.length > 0 && timestamp !== undefined,
    onChange: function onChange(e) {
      editAction('timestamp', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (timestamp === null || timestamp === void 0 ? void 0 : timestamp.trim()) {
        editAction('timestamp', timestamp.trim(), index);
      } else {
        editAction('timestamp', '', index);
      }
    }
  })))), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.componentTextFieldLabel', {
      defaultMessage: 'Component (optional)'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('component', variable);
      },
      paramsProperty: "component"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "component",
    "data-test-subj": "componentInput",
    value: component || '',
    onChange: function onChange(e) {
      editAction('component', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!component) {
        editAction('component', '', index);
      }
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.groupTextFieldLabel', {
      defaultMessage: 'Group (optional)'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('group', variable);
      },
      paramsProperty: "group"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "group",
    "data-test-subj": "groupInput",
    value: group || '',
    onChange: function onChange(e) {
      editAction('group', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!group) {
        editAction('group', '', index);
      }
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.sourceTextFieldLabel', {
      defaultMessage: 'Source (optional)'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('source', variable);
      },
      paramsProperty: "source"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "source",
    "data-test-subj": "sourceInput",
    value: source || '',
    onChange: function onChange(e) {
      editAction('source', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!source) {
        editAction('source', '', index);
      }
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    id: "pagerDutySummary",
    fullWidth: true,
    error: errors.summary,
    isInvalid: errors.summary.length > 0 && summary !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.summaryFieldLabel', {
      defaultMessage: 'Summary'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('summary', variable);
      },
      paramsProperty: "summary"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: errors.summary.length > 0 && summary !== undefined,
    name: "summary",
    value: summary || '',
    "data-test-subj": "pagerdutySummaryInput",
    onChange: function onChange(e) {
      editAction('summary', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!summary) {
        editAction('summary', '', index);
      }
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    id: "pagerDutyClass",
    fullWidth: true,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.pagerDutyAction.classFieldLabel', {
      defaultMessage: 'Class (optional)'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('class', variable);
      },
      paramsProperty: "class"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    name: "class",
    value: actionParams.class || '',
    "data-test-subj": "pagerdutyClassInput",
    onChange: function onChange(e) {
      editAction('class', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!actionParams.class) {
        editAction('class', '', index);
      }
    }
  })));
};

function getValidTimestampExamples() {
  var now = (0, _moment.default)();
  return {
    nowShortFormat: now.format('YYYY-MM-DD'),
    nowLongFormat: now.format('YYYY-MM-DD h:mm:ss')
  };
}