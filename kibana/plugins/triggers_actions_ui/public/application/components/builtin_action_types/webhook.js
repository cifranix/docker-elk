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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HTTP_VERBS = ['post', 'put'];

function getActionType() {
  return {
    id: '.webhook',
    iconClass: 'logoWebhook',
    selectMessage: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.selectMessageText', {
      defaultMessage: 'Send a request to a web service.'
    }),
    actionTypeTitle: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.actionTypeTitle', {
      defaultMessage: 'Webhook data'
    }),
    validateConnector: function validateConnector(action) {
      var validationResult = {
        errors: {}
      };
      var errors = {
        url: new Array(),
        method: new Array(),
        user: new Array(),
        password: new Array()
      };
      validationResult.errors = errors;

      if (!action.config.url) {
        errors.url.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.error.requiredUrlText', {
          defaultMessage: 'URL is required.'
        }));
      }

      if (!action.config.method) {
        errors.method.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAction.webhookAction.error.requiredMethodText', {
          defaultMessage: 'Method is required.'
        }));
      }

      if (!action.secrets.user && action.secrets.password) {
        errors.user.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAction.webhookAction.error.requiredHostText', {
          defaultMessage: 'Username is required.'
        }));
      }

      if (!action.secrets.password && action.secrets.user) {
        errors.password.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAction.webhookAction.error.requiredPasswordText', {
          defaultMessage: 'Password is required.'
        }));
      }

      return validationResult;
    },
    validateParams: function validateParams(actionParams) {
      var _actionParams$body;

      var validationResult = {
        errors: {}
      };
      var errors = {
        body: new Array()
      };
      validationResult.errors = errors;

      if (!((_actionParams$body = actionParams.body) === null || _actionParams$body === void 0 ? void 0 : _actionParams$body.length)) {
        errors.body.push(_i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.error.requiredWebhookBodyText', {
          defaultMessage: 'Body is required.'
        }));
      }

      return validationResult;
    },
    actionConnectorFields: WebhookActionConnectorFields,
    actionParamsFields: WebhookParamsFields
  };
}

var WebhookActionConnectorFields = function WebhookActionConnectorFields(_ref) {
  var action = _ref.action,
      editActionConfig = _ref.editActionConfig,
      editActionSecrets = _ref.editActionSecrets,
      errors = _ref.errors;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      httpHeaderKey = _useState2[0],
      setHttpHeaderKey = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      httpHeaderValue = _useState4[0],
      setHttpHeaderValue = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      hasHeaders = _useState6[0],
      setHasHeaders = _useState6[1];

  var _action$secrets = action.secrets,
      user = _action$secrets.user,
      password = _action$secrets.password;
  var _action$config = action.config,
      method = _action$config.method,
      url = _action$config.url,
      headers = _action$config.headers;
  editActionConfig('method', 'post'); // set method to POST by default

  var headerErrors = {
    keyHeader: new Array(),
    valueHeader: new Array()
  };

  if (!httpHeaderKey && httpHeaderValue) {
    headerErrors.keyHeader.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAction.webhookAction.error.requiredHeaderKeyText', {
      defaultMessage: 'Key is required.'
    }));
  }

  if (httpHeaderKey && !httpHeaderValue) {
    headerErrors.valueHeader.push(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addAction.webhookAction.error.requiredHeaderValueText', {
      defaultMessage: 'Value is required.'
    }));
  }

  var hasHeaderErrors = headerErrors.keyHeader.length > 0 || headerErrors.valueHeader.length > 0;

  function addHeader() {
    if (headers && !!Object.keys(headers).find(function (key) {
      return key === httpHeaderKey;
    })) {
      return;
    }

    var updatedHeaders = headers ? _objectSpread({}, headers, _defineProperty({}, httpHeaderKey, httpHeaderValue)) : _defineProperty({}, httpHeaderKey, httpHeaderValue);
    editActionConfig('headers', updatedHeaders);
    setHttpHeaderKey('');
    setHttpHeaderValue('');
  }

  function viewHeaders() {
    setHasHeaders(!hasHeaders);

    if (!hasHeaders) {
      editActionConfig('headers', {});
    }
  }

  function removeHeader(keyToRemove) {
    var updatedHeaders = Object.keys(headers).filter(function (key) {
      return key !== keyToRemove;
    }).reduce(function (headerToRemove, key) {
      headerToRemove[key] = headers[key];
      return headerToRemove;
    }, {});
    editActionConfig('headers', updatedHeaders);
  }

  var headerControl;

  if (hasHeaders) {
    headerControl = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
      size: "xxs"
    }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Add header",
      id: "xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.addHeader"
    }))), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }), _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s",
      alignItems: "flexStart"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFormRow, {
      id: "webhookHeaderKey",
      fullWidth: true,
      error: headerErrors.keyHeader,
      isInvalid: hasHeaderErrors && httpHeaderKey !== undefined,
      label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.keyTextFieldLabel', {
        defaultMessage: 'Key'
      })
    }, _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      isInvalid: hasHeaderErrors && httpHeaderKey !== undefined,
      name: "keyHeader",
      value: httpHeaderKey,
      "data-test-subj": "webhookHeadersKeyInput",
      onChange: function onChange(e) {
        setHttpHeaderKey(e.target.value);
      }
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFormRow, {
      id: "webhookHeaderValue",
      fullWidth: true,
      error: headerErrors.valueHeader,
      isInvalid: hasHeaderErrors && httpHeaderValue !== undefined,
      label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.valueTextFieldLabel', {
        defaultMessage: 'Value'
      })
    }, _react.default.createElement(_eui.EuiFieldText, {
      fullWidth: true,
      isInvalid: hasHeaderErrors && httpHeaderValue !== undefined,
      name: "valueHeader",
      value: httpHeaderValue,
      "data-test-subj": "webhookHeadersValueInput",
      onChange: function onChange(e) {
        setHttpHeaderValue(e.target.value);
      }
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFormRow, {
      hasEmptyLabelSpace: true
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      isDisabled: hasHeaders && (hasHeaderErrors || !httpHeaderKey || !httpHeaderValue),
      "data-test-subj": "webhookAddHeaderButton",
      onClick: function onClick() {
        return addHeader();
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      defaultMessage: "Add",
      id: "xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.addHeaderButton"
    }))))));
  }

  var headersList = Object.keys(headers || {}).map(function (key) {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      key: key,
      "data-test-subj": "webhookHeaderText",
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.deleteHeaderButton', {
        defaultMessage: 'Delete',
        description: 'Delete HTTP header'
      }),
      iconType: "trash",
      color: "danger",
      onClick: function onClick() {
        return removeHeader(key);
      }
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiDescriptionList, {
      compressed: true
    }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, key), _react.default.createElement(_eui.EuiDescriptionListDescription, null, headers[key]))));
  });
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.methodTextFieldLabel', {
      defaultMessage: 'Method'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    name: "method",
    value: method || 'post',
    "data-test-subj": "webhookMethodSelect",
    options: HTTP_VERBS.map(function (verb) {
      return {
        text: verb.toUpperCase(),
        value: verb
      };
    }),
    onChange: function onChange(e) {
      editActionConfig('method', e.target.value);
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "url",
    fullWidth: true,
    error: errors.url,
    isInvalid: errors.url.length > 0 && url !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.urlTextFieldLabel', {
      defaultMessage: 'URL'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "url",
    isInvalid: errors.url.length > 0 && url !== undefined,
    fullWidth: true,
    value: url || '',
    "data-test-subj": "webhookUrlText",
    onChange: function onChange(e) {
      editActionConfig('url', e.target.value);
    },
    onBlur: function onBlur() {
      if (!url) {
        editActionConfig('url', '');
      }
    }
  })))), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "webhookUser",
    fullWidth: true,
    error: errors.user,
    isInvalid: errors.user.length > 0 && user !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.userTextFieldLabel', {
      defaultMessage: 'Username'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    fullWidth: true,
    isInvalid: errors.user.length > 0 && user !== undefined,
    name: "user",
    value: user || '',
    "data-test-subj": "webhookUserInput",
    onChange: function onChange(e) {
      editActionSecrets('user', e.target.value);
    },
    onBlur: function onBlur() {
      if (!user) {
        editActionSecrets('user', '');
      }
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "webhookPassword",
    fullWidth: true,
    error: errors.password,
    isInvalid: errors.password.length > 0 && password !== undefined,
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.passwordTextFieldLabel', {
      defaultMessage: 'Password'
    })
  }, _react.default.createElement(_eui.EuiFieldPassword, {
    fullWidth: true,
    name: "password",
    isInvalid: errors.password.length > 0 && password !== undefined,
    value: password || '',
    "data-test-subj": "webhookPasswordInput",
    onChange: function onChange(e) {
      editActionSecrets('password', e.target.value);
    },
    onBlur: function onBlur() {
      if (!password) {
        editActionSecrets('password', '');
      }
    }
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiSwitch, {
    "data-test-subj": "webhookViewHeadersSwitch",
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.viewHeadersSwitch', {
      defaultMessage: 'Add HTTP header'
    }),
    checked: hasHeaders,
    onChange: function onChange() {
      return viewHeaders();
    }
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement("div", null, hasHeaders && Object.keys(headers || {}).length > 0 ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("h5", null, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Headers in use",
    id: "xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.httpHeadersTitle"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), headersList) : null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), headerControl, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })));
};

var WebhookParamsFields = function WebhookParamsFields(_ref3) {
  var actionParams = _ref3.actionParams,
      editAction = _ref3.editAction,
      index = _ref3.index,
      messageVariables = _ref3.messageVariables,
      errors = _ref3.errors;
  var body = actionParams.body;

  var onSelectMessageVariable = function onSelectMessageVariable(paramsProperty, variable) {
    editAction(paramsProperty, (body !== null && body !== void 0 ? body : '').concat(" {{".concat(variable, "}}")), index);
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    id: "webhookBody",
    label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.bodyFieldLabel', {
      defaultMessage: 'Body'
    }),
    isInvalid: errors.body.length > 0 && body !== undefined,
    fullWidth: true,
    error: errors.body,
    labelAppend: _react.default.createElement(_add_message_variables.AddMessageVariables, {
      messageVariables: messageVariables,
      onSelectEventHandler: function onSelectEventHandler(variable) {
        return onSelectMessageVariable('body', variable);
      },
      paramsProperty: "body"
    })
  }, _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    width: "100%",
    height: "200px",
    theme: "github",
    "data-test-subj": "webhookBodyEditor",
    "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.webhookAction.bodyCodeEditorAriaLabel', {
      defaultMessage: 'Code editor'
    }),
    value: body || '',
    onChange: function onChange(json) {
      editAction('body', json, index);
    }
  })));
};