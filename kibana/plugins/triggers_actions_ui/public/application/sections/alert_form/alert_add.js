"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertAdd = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _alerts_context = require("../../context/alerts_context");

var _alert_form = require("./alert_form");

var _alert_reducer = require("./alert_reducer");

var _alert_api = require("../../lib/alert_api");

var _health_check = require("../../components/health_check");

var _plugin = require("../../constants/plugin");

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

var AlertAdd = function AlertAdd(_ref) {
  var consumer = _ref.consumer,
      addFlyoutVisible = _ref.addFlyoutVisible,
      setAddFlyoutVisibility = _ref.setAddFlyoutVisibility,
      canChangeTrigger = _ref.canChangeTrigger,
      alertTypeId = _ref.alertTypeId;
  var initialAlert = {
    params: {},
    consumer: consumer,
    alertTypeId: alertTypeId,
    schedule: {
      interval: '1m'
    },
    actions: [],
    tags: []
  };

  var _useReducer = (0, _react.useReducer)(_alert_reducer.alertReducer, {
    alert: initialAlert
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      alert = _useReducer2[0].alert,
      dispatch = _useReducer2[1];

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSaving = _useState2[0],
      setIsSaving = _useState2[1];

  var setAlert = function setAlert(value) {
    dispatch({
      command: {
        type: 'setAlert'
      },
      payload: {
        key: 'alert',
        value: value
      }
    });
  };

  var _useAlertsContext = (0, _alerts_context.useAlertsContext)(),
      reloadAlerts = _useAlertsContext.reloadAlerts,
      http = _useAlertsContext.http,
      toastNotifications = _useAlertsContext.toastNotifications,
      alertTypeRegistry = _useAlertsContext.alertTypeRegistry,
      actionTypeRegistry = _useAlertsContext.actionTypeRegistry,
      docLinks = _useAlertsContext.docLinks;

  var closeFlyout = (0, _react.useCallback)(function () {
    setAddFlyoutVisibility(false);
    setAlert(initialAlert);
  }, [initialAlert, setAddFlyoutVisibility]);

  if (!addFlyoutVisible) {
    return null;
  }

  var alertType = alert.alertTypeId ? alertTypeRegistry.get(alert.alertTypeId) : null;

  var errors = _objectSpread({}, alertType ? alertType.validate(alert.params).errors : [], {}, (0, _alert_form.validateBaseProperties)(alert).errors);

  var hasErrors = parseErrors(errors);
  var actionsErrors = alert.actions.map(function (alertAction) {
    var _actionTypeRegistry$g;

    return (_actionTypeRegistry$g = actionTypeRegistry.get(alertAction.actionTypeId)) === null || _actionTypeRegistry$g === void 0 ? void 0 : _actionTypeRegistry$g.validateParams(alertAction.params);
  });
  var hasActionErrors = actionsErrors.find(function (errorObj) {
    return errorObj && !!Object.keys(errorObj.errors).find(function (errorKey) {
      return errorObj.errors[errorKey].length >= 1;
    });
  }) !== undefined;

  function onSaveAlert() {
    return _onSaveAlert.apply(this, arguments);
  }

  function _onSaveAlert() {
    _onSaveAlert = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var newAlert, _ref3, _errorRes$body;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _alert_api.createAlert)({
                http: http,
                alert: alert
              });

            case 3:
              newAlert = _context2.sent;
              toastNotifications.addSuccess(_i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.saveSuccessNotificationText', {
                defaultMessage: "Saved '{alertName}'",
                values: {
                  alertName: newAlert.name
                }
              }));
              return _context2.abrupt("return", newAlert);

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              toastNotifications.addDanger((_ref3 = (_errorRes$body = _context2.t0.body) === null || _errorRes$body === void 0 ? void 0 : _errorRes$body.message) !== null && _ref3 !== void 0 ? _ref3 : _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.saveErrorNotificationText', {
                defaultMessage: 'Cannot create alert.'
              }));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 8]]);
    }));
    return _onSaveAlert.apply(this, arguments);
  }

  return _react.default.createElement(_eui.EuiPortal, null, _react.default.createElement(_eui.EuiFlyout, {
    onClose: closeFlyout,
    "aria-labelledby": "flyoutAlertAddTitle",
    size: "m",
    maxWidth: 620,
    ownFocus: true
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s",
    "data-test-subj": "addAlertFlyoutTitle"
  }, _react.default.createElement("h3", {
    id: "flyoutTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "Create alert",
    id: "xpack.triggersActionsUI.sections.alertAdd.flyoutTitle"
  }), "\u2003", _react.default.createElement(_eui.EuiBetaBadge, {
    label: "Beta",
    tooltipContent: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.betaBadgeTooltipContent', {
      defaultMessage: '{pluginName} is in beta and is subject to change. The design and code is less mature than official GA features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA features.',
      values: {
        pluginName: _plugin.PLUGIN.getI18nName(_i18n.i18n)
      }
    })
  })))), _react.default.createElement(_health_check.HealthCheck, {
    docLinks: docLinks,
    http: http,
    inFlyout: true
  }, _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_alert_form.AlertForm, {
    alert: alert,
    dispatch: dispatch,
    errors: errors,
    canChangeTrigger: canChangeTrigger
  })), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "cancelSaveAlertButton",
    onClick: closeFlyout
  }, _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.cancelButtonLabel', {
    defaultMessage: 'Cancel'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    color: "secondary",
    "data-test-subj": "saveAlertButton",
    type: "submit",
    iconType: "check",
    isDisabled: hasErrors || hasActionErrors,
    isLoading: isSaving,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var savedAlert;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsSaving(true);
              _context.next = 3;
              return onSaveAlert();

            case 3:
              savedAlert = _context.sent;
              setIsSaving(false);

              if (savedAlert) {
                closeFlyout();

                if (reloadAlerts) {
                  reloadAlerts();
                }
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertAdd.saveButtonLabel",
    defaultMessage: "Save"
  }))))))));
};

exports.AlertAdd = AlertAdd;

var parseErrors = function parseErrors(errors) {
  return !!Object.values(errors).find(function (errorList) {
    if ((0, _lodash.isObject)(errorList)) return parseErrors(errorList);
    return errorList.length >= 1;
  });
};