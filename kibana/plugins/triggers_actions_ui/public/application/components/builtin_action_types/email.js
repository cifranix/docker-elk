"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _add_message_variables = require("../add_message_variables");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getActionType() {
  var mailformat = /^[^@\s]+@[^@\s]+$/;
  return {
    id: '.email',
    iconClass: 'email',
    selectMessage: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.emailAction.selectMessageText', {
      defaultMessage: 'Send email from your server.'
    }),
    actionTypeTitle: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.emailAction.actionTypeTitle', {
      defaultMessage: 'Send to email'
    }),
    validateConnector: function validateConnector(action) {
      var validationResult = {
        errors: {}
      };
      var errors = {
        from: new Array(),
        port: new Array(),
        host: new Array(),
        user: new Array(),
        password: new Array()
      };
      validationResult.errors = errors;

      if (!action.config.from) {
        errors.from.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredFromText', {
          defaultMessage: 'Sender is required.'
        }));
      }

      if (action.config.from && !action.config.from.trim().match(mailformat)) {
        errors.from.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.formatFromText', {
          defaultMessage: 'Sender is not a valid email address.'
        }));
      }

      if (!action.config.port) {
        errors.port.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredPortText', {
          defaultMessage: 'Port is required.'
        }));
      }

      if (!action.config.host) {
        errors.host.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredHostText', {
          defaultMessage: 'Host is required.'
        }));
      }

      if (action.secrets.user && !action.secrets.password) {
        errors.password.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredPasswordText', {
          defaultMessage: 'Password is required when username is used.'
        }));
      }

      if (!action.secrets.user && action.secrets.password) {
        errors.user.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredUserText', {
          defaultMessage: 'Username is required when password is used.'
        }));
      }

      return validationResult;
    },
    validateParams: function validateParams(actionParams) {
      var _actionParams$message, _actionParams$subject;

      var validationResult = {
        errors: {}
      };
      var errors = {
        to: new Array(),
        cc: new Array(),
        bcc: new Array(),
        message: new Array(),
        subject: new Array()
      };
      validationResult.errors = errors;

      if ((!(actionParams.to instanceof Array) || actionParams.to.length === 0) && (!(actionParams.cc instanceof Array) || actionParams.cc.length === 0) && (!(actionParams.bcc instanceof Array) || actionParams.bcc.length === 0)) {
        var errorText = _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredEntryText', {
          defaultMessage: 'No To, Cc, or Bcc entry.  At least one entry is required.'
        });

        errors.to.push(errorText);
        errors.cc.push(errorText);
        errors.bcc.push(errorText);
      }

      if (!((_actionParams$message = actionParams.message) === null || _actionParams$message === void 0 ? void 0 : _actionParams$message.length)) {
        errors.message.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredMessageText', {
          defaultMessage: 'Message is required.'
        }));
      }

      if (!((_actionParams$subject = actionParams.subject) === null || _actionParams$subject === void 0 ? void 0 : _actionParams$subject.length)) {
        errors.subject.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredSubjectText', {
          defaultMessage: 'Subject is required.'
        }));
      }

      return validationResult;
    },
    actionConnectorFields: EmailActionConnectorFields,
    actionParamsFields: EmailParamsFields
  };
}

var EmailActionConnectorFields = function EmailActionConnectorFields(_ref) {
  var action = _ref.action,
      editActionConfig = _ref.editActionConfig,
      editActionSecrets = _ref.editActionSecrets,
      errors = _ref.errors;
  var _action$config = action.config,
      from = _action$config.from,
      host = _action$config.host,
      port = _action$config.port,
      secure = _action$config.secure;
  var _action$secrets = action.secrets,
      user = _action$secrets.user,
      password = _action$secrets.password;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "from",
    fullWidth: true,
    error: errors.from,
    isInvalid: errors.from.length > 0 && from !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.fromTextFieldLabel', {
      defaultMessage: 'Sender'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: errors.from.length > 0 && from !== undefined,
    name: "from",
    value: from || '',
    "data-test-subj": "emailFromInput",
    onChange: function onChange(e) {
      editActionConfig('from', e.target.value);
    },
    onBlur: function onBlur() {
      if (!from) {
        editActionConfig('from', '');
      }
    }
  })))), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "emailHost",
    fullWidth: true,
    error: errors.host,
    isInvalid: errors.host.length > 0 && host !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.hostTextFieldLabel', {
      defaultMessage: 'Host'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: errors.host.length > 0 && host !== undefined,
    name: "host",
    value: host || '',
    "data-test-subj": "emailHostInput",
    onChange: function onChange(e) {
      editActionConfig('host', e.target.value);
    },
    onBlur: function onBlur() {
      if (!host) {
        editActionConfig('host', '');
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "emailPort",
    fullWidth: true,
    placeholder: "587",
    error: errors.port,
    isInvalid: errors.port.length > 0 && port !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.portTextFieldLabel', {
      defaultMessage: 'Port'
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    prepend: ":",
    isInvalid: errors.port.length > 0 && port !== undefined,
    fullWidth: true,
    name: "port",
    value: port || '',
    "data-test-subj": "emailPortInput",
    onChange: function onChange(e) {
      editActionConfig('port', parseInt(e.target.value, 10));
    },
    onBlur: function onBlur() {
      if (!port) {
        editActionConfig('port', 0);
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.secureSwitchLabel', {
      defaultMessage: 'Secure'
    }),
    checked: secure || false,
    onChange: function onChange(e) {
      editActionConfig('secure', e.target.checked);
    }
  }))))))), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "emailUser",
    fullWidth: true,
    error: errors.user,
    isInvalid: errors.user.length > 0,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.userTextFieldLabel', {
      defaultMessage: 'Username'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: errors.user.length > 0,
    name: "user",
    value: user || '',
    "data-test-subj": "emailUserInput",
    onChange: function onChange(e) {
      editActionSecrets('user', nullableString(e.target.value));
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "emailPassword",
    fullWidth: true,
    error: errors.password,
    isInvalid: errors.password.length > 0,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.passwordFieldLabel', {
      defaultMessage: 'Password'
    })
  }, _react.default.createElement(_eui.EuiFieldPassword, {
    fullWidth: true,
    isInvalid: errors.password.length > 0,
    name: "password",
    value: password || '',
    "data-test-subj": "emailPasswordInput",
    onChange: function onChange(e) {
      editActionSecrets('password', nullableString(e.target.value));
    }
  })))));
};

var EmailParamsFields = function EmailParamsFields(_ref2) {
  var actionParams = _ref2.actionParams,
      editAction = _ref2.editAction,
      index = _ref2.index,
      errors = _ref2.errors,
      messageVariables = _ref2.messageVariables,
      defaultMessage = _ref2.defaultMessage;
  var to = actionParams.to,
      cc = actionParams.cc,
      bcc = actionParams.bcc,
      subject = actionParams.subject,
      message = actionParams.message;
  var toOptions = to ? to.map(function (label) {
    return {
      label: label
    };
  }) : [];
  var ccOptions = cc ? cc.map(function (label) {
    return {
      label: label
    };
  }) : [];
  var bccOptions = bcc ? bcc.map(function (label) {
    return {
      label: label
    };
  }) : [];

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      addCC = _useState2[0],
      setAddCC = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      addBCC = _useState4[0],
      setAddBCC = _useState4[1];

  (0, _react.useEffect)(function () {
    if (!message && defaultMessage && defaultMessage.length > 0) {
      editAction('message', defaultMessage, index);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  var onSelectMessageVariable = function onSelectMessageVariable(paramsProperty, variable) {
    var _paramsProperty;

    editAction(paramsProperty, ((_paramsProperty = actionParams[paramsProperty]) !== null && _paramsProperty !== void 0 ? _paramsProperty : '').concat(" {{".concat(variable, "}}")), index);
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    error: errors.to,
    isInvalid: errors.to.length > 0 && to !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.recipientTextFieldLabel', {
      defaultMessage: 'To'
    }),
    labelAppend: _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", null, !addCC ? _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "xs",
      onClick: function onClick() {
        return setAddCC(true);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Add Cc",
      id: "xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.addCcButton"
    })) : null, !addBCC ? _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "xs",
      onClick: function onClick() {
        return setAddBCC(true);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "{titleBcc}",
      id: "xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.addBccButton",
      values: {
        titleBcc: !addCC ? '/ Bcc' : 'Add Bcc'
      }
    })) : null))
  }, _react.default.createElement(_eui.EuiComboBox, {
    noSuggestions: true,
    isInvalid: errors.to.length > 0 && to !== undefined,
    fullWidth: true,
    "data-test-subj": "toEmailAddressInput",
    selectedOptions: toOptions,
    onCreateOption: function onCreateOption(searchValue) {
      var newOptions = [].concat(_toConsumableArray(toOptions), [{
        label: searchValue
      }]);
      editAction('to', newOptions.map(function (newOption) {
        return newOption.label;
      }), index);
    },
    onChange: function onChange(selectedOptions) {
      editAction('to', selectedOptions.map(function (selectedOption) {
        return selectedOption.label;
      }), index);
    },
    onBlur: function onBlur() {
      if (!to) {
        editAction('to', [], index);
      }
    }
  })), addCC ? _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    error: errors.cc,
    isInvalid: errors.cc.length > 0 && cc !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.recipientCopyTextFieldLabel', {
      defaultMessage: 'Cc'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    noSuggestions: true,
    isInvalid: errors.cc.length > 0 && cc !== undefined,
    fullWidth: true,
    "data-test-subj": "ccEmailAddressInput",
    selectedOptions: ccOptions,
    onCreateOption: function onCreateOption(searchValue) {
      var newOptions = [].concat(_toConsumableArray(ccOptions), [{
        label: searchValue
      }]);
      editAction('cc', newOptions.map(function (newOption) {
        return newOption.label;
      }), index);
    },
    onChange: function onChange(selectedOptions) {
      editAction('cc', selectedOptions.map(function (selectedOption) {
        return selectedOption.label;
      }), index);
    },
    onBlur: function onBlur() {
      if (!cc) {
        editAction('cc', [], index);
      }
    }
  })) : null, addBCC ? _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    error: errors.bcc,
    isInvalid: errors.bcc.length > 0 && bcc !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.recipientBccTextFieldLabel', {
      defaultMessage: 'Bcc'
    })
  }, _react.default.createElement(_eui.EuiComboBox, {
    noSuggestions: true,
    isInvalid: errors.bcc.length > 0 && bcc !== undefined,
    fullWidth: true,
    "data-test-subj": "bccEmailAddressInput",
    selectedOptions: bccOptions,
    onCreateOption: function onCreateOption(searchValue) {
      var newOptions = [].concat(_toConsumableArray(bccOptions), [{
        label: searchValue
      }]);
      editAction('bcc', newOptions.map(function (newOption) {
        return newOption.label;
      }), index);
    },
    onChange: function onChange(selectedOptions) {
      editAction('bcc', selectedOptions.map(function (selectedOption) {
        return selectedOption.label;
      }), index);
    },
    onBlur: function onBlur() {
      if (!bcc) {
        editAction('bcc', [], index);
      }
    }
  })) : null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    error: errors.subject,
    isInvalid: errors.subject.length > 0 && subject !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.subjectTextFieldLabel', {
      defaultMessage: 'Subject'
    }),
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('subject', variable);
      },
      paramsProperty: "subject"
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: errors.subject.length > 0 && subject !== undefined,
    name: "subject",
    "data-test-subj": "emailSubjectInput",
    value: subject || '',
    onChange: function onChange(e) {
      editAction('subject', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!subject) {
        editAction('subject', '', index);
      }
    }
  })), _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    error: errors.message,
    isInvalid: errors.message.length > 0 && message !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.sections.builtinActionTypes.emailAction.messageTextAreaFieldLabel', {
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
    "data-test-subj": "emailMessageInput",
    onChange: function onChange(e) {
      editAction('message', e.target.value, index);
    },
    onBlur: function onBlur() {
      if (!message) {
        editAction('message', '', index);
      }
    }
  })));
}; // if the string == null or is empty, return null, else return string


function nullableString(str) {
  if (str == null || str.trim() === '') return null;
  return str;
}