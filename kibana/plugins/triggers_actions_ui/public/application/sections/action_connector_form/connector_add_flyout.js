"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectorAddFlyout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _action_type_menu = require("./action_type_menu");

var _action_connector_form = require("./action_connector_form");

var _connector_reducer = require("./connector_reducer");

var _capabilities = require("../../lib/capabilities");

var _action_connector_api = require("../../lib/action_connector_api");

var _actions_connectors_context = require("../../context/actions_connectors_context");

var _constants = require("../../../common/constants");

var _plugin = require("../../constants/plugin");

var _constants2 = require("../../../../../license_management/common/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ConnectorAddFlyout = function ConnectorAddFlyout(_ref) {
  var _ref2;

  var addFlyoutVisible = _ref.addFlyoutVisible,
      setAddFlyoutVisibility = _ref.setAddFlyoutVisibility,
      actionTypes = _ref.actionTypes;
  var hasErrors = false;

  var _useActionsConnectors = (0, _actions_connectors_context.useActionsConnectorsContext)(),
      http = _useActionsConnectors.http,
      toastNotifications = _useActionsConnectors.toastNotifications,
      capabilities = _useActionsConnectors.capabilities,
      actionTypeRegistry = _useActionsConnectors.actionTypeRegistry,
      reloadConnectors = _useActionsConnectors.reloadConnectors;

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      actionType = _useState2[0],
      setActionType = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hasActionsDisabledByLicense = _useState4[0],
      setHasActionsDisabledByLicense = _useState4[1]; // hooks


  var initialConnector = {
    actionTypeId: (_ref2 = actionType === null || actionType === void 0 ? void 0 : actionType.id) !== null && _ref2 !== void 0 ? _ref2 : '',
    config: {},
    secrets: {}
  };

  var _useReducer = (0, _react.useReducer)(_connector_reducer.connectorReducer, {
    connector: initialConnector
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      connector = _useReducer2[0].connector,
      dispatch = _useReducer2[1];

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

  var setConnector = function setConnector(value) {
    dispatch({
      command: {
        type: 'setConnector'
      },
      payload: {
        key: 'connector',
        value: value
      }
    });
  };

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isSaving = _useState6[0],
      setIsSaving = _useState6[1];

  var closeFlyout = (0, _react.useCallback)(function () {
    setAddFlyoutVisibility(false);
    setActionType(undefined);
    setConnector(initialConnector);
  }, [setAddFlyoutVisibility, initialConnector]);
  var canSave = (0, _capabilities.hasSaveActionsCapability)(capabilities);

  if (!addFlyoutVisible) {
    return null;
  }

  function onActionTypeChange(newActionType) {
    setActionType(newActionType);
    setActionProperty('actionTypeId', newActionType.id);
  }

  var currentForm;
  var actionTypeModel;

  if (!actionType) {
    currentForm = _react.default.createElement(_action_type_menu.ActionTypeMenu, {
      onActionTypeChange: onActionTypeChange,
      actionTypes: actionTypes,
      setHasActionsDisabledByLicense: setHasActionsDisabledByLicense
    });
  } else {
    var _actionTypeModel;

    actionTypeModel = actionTypeRegistry.get(actionType.id);

    var errors = _objectSpread({}, (_actionTypeModel = actionTypeModel) === null || _actionTypeModel === void 0 ? void 0 : _actionTypeModel.validateConnector(connector).errors, {}, (0, _action_connector_form.validateBaseProperties)(connector).errors);

    hasErrors = !!Object.keys(errors).find(function (errorKey) {
      return errors[errorKey].length >= 1;
    });
    currentForm = _react.default.createElement(_action_connector_form.ActionConnectorForm, {
      actionTypeName: actionType.name,
      connector: connector,
      dispatch: dispatch,
      errors: errors,
      actionTypeRegistry: actionTypeRegistry,
      http: http
    });
  }

  var onActionConnectorSave =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _action_connector_api.createActionConnector)({
                http: http,
                connector: connector
              }).then(function (savedConnector) {
                if (toastNotifications) {
                  toastNotifications.addSuccess(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addConnectorForm.updateSuccessNotificationText', {
                    defaultMessage: "Created '{connectorName}'",
                    values: {
                      connectorName: savedConnector.name
                    }
                  }));
                }

                return savedConnector;
              }).catch(function (errorRes) {
                var _ref4, _errorRes$body;

                toastNotifications.addDanger((_ref4 = (_errorRes$body = errorRes.body) === null || _errorRes$body === void 0 ? void 0 : _errorRes$body.message) !== null && _ref4 !== void 0 ? _ref4 : _i18n.i18n.translate('xpack.triggersActionsUI.sections.addConnectorForm.updateErrorNotificationText', {
                  defaultMessage: 'Cannot create a connector.'
                }));
                return undefined;
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onActionConnectorSave() {
      return _ref3.apply(this, arguments);
    };
  }();

  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: closeFlyout,
    "aria-labelledby": "flyoutActionAddTitle",
    size: "m"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    alignItems: "center"
  }, actionTypeModel && actionTypeModel.iconClass ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: actionTypeModel.iconClass,
    size: "xl"
  })) : null, _react.default.createElement(_eui.EuiFlexItem, null, actionTypeModel && actionType ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", {
    id: "flyoutTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "{actionTypeName} connector",
    id: "xpack.triggersActionsUI.sections.addConnectorForm.flyoutTitle",
    values: {
      actionTypeName: actionType.name
    }
  }), "\u2003", _react.default.createElement(_eui.EuiBetaBadge, {
    label: "Beta",
    tooltipContent: _i18n.i18n.translate('xpack.triggersActionsUI.sections.addConnectorForm.betaBadgeTooltipContent', {
      defaultMessage: '{pluginName} is in beta and is subject to change. The design and code is less mature than official GA features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA features.',
      values: {
        pluginName: _plugin.PLUGIN.getI18nName(_i18n.i18n)
      }
    })
  }))), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, actionTypeModel.selectMessage)) : _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", {
    id: "selectConnectorFlyoutTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Select a connector",
    id: "xpack.triggersActionsUI.sections.addConnectorForm.selectConnectorFlyoutTitle"
  }), "\u2003", _react.default.createElement(_eui.EuiBetaBadge, {
    label: "Beta",
    tooltipContent: _i18n.i18n.translate('xpack.triggersActionsUI.sections.addFlyout.betaBadgeTooltipContent', {
      defaultMessage: '{pluginName} is in beta and is subject to change. The design and code is less mature than official GA features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA features.',
      values: {
        pluginName: _plugin.PLUGIN.getI18nName(_i18n.i18n)
      }
    })
  })))))), _react.default.createElement(_eui.EuiFlyoutBody, {
    banner: !actionType && hasActionsDisabledByLicense ? _react.default.createElement(UpgradeYourLicenseCallOut, {
      http: http
    }) : _react.default.createElement(_react.Fragment, null)
  }, currentForm), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: closeFlyout
  }, _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionConnectorAdd.cancelButtonLabel', {
    defaultMessage: 'Cancel'
  }))), canSave && actionTypeModel && actionType ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    color: "secondary",
    "data-test-subj": "saveNewActionButton",
    type: "submit",
    iconType: "check",
    isDisabled: hasErrors,
    isLoading: isSaving,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var savedAction;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setIsSaving(true);
              _context2.next = 3;
              return onActionConnectorSave();

            case 3:
              savedAction = _context2.sent;
              setIsSaving(false);

              if (savedAction) {
                closeFlyout();

                if (reloadConnectors) {
                  reloadConnectors();
                }
              }

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.actionConnectorAdd.saveButtonLabel",
    defaultMessage: "Save"
  }))) : null)));
};

exports.ConnectorAddFlyout = ConnectorAddFlyout;

var UpgradeYourLicenseCallOut = function UpgradeYourLicenseCallOut(_ref6) {
  var http = _ref6.http;
  return _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionConnectorAdd.upgradeYourPlanBannerTitle', {
      defaultMessage: 'Upgrade your license to access all connectors'
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.actionConnectorAdd.upgradeYourPlanBannerMessage",
    defaultMessage: "Upgrade your license or start a 30-day free trial for immediate access to all third-party connectors."
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    wrap: true
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    href: "".concat(http.basePath.get(), "/app/kibana#").concat(_constants2.BASE_PATH),
    iconType: "gear",
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.actionConnectorAdd.manageLicensePlanBannerLinkTitle",
    defaultMessage: "Manage license"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    href: _constants.VIEW_LICENSE_OPTIONS_LINK,
    iconType: "popout",
    iconSide: "right",
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.actionConnectorAdd.upgradeYourPlanBannerLinkTitle",
    defaultMessage: "Subscription plans"
  })))));
};