"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDetailsWithApi = exports.AlertDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _app_context = require("../../../app_context");

var _capabilities = require("../../../lib/capabilities");

var _with_bulk_alert_api_operations = require("../../common/components/with_bulk_alert_api_operations");

var _alert_instances_route = require("./alert_instances_route");

var _view_in_app = require("./view_in_app");

var _plugin = require("../../../constants/plugin");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AlertDetails = function AlertDetails(_ref) {
  var _actionTypesByTypeId$;

  var alert = _ref.alert,
      alertType = _ref.alertType,
      actionTypes = _ref.actionTypes,
      disableAlert = _ref.disableAlert,
      enableAlert = _ref.enableAlert,
      unmuteAlert = _ref.unmuteAlert,
      muteAlert = _ref.muteAlert,
      requestRefresh = _ref.requestRefresh;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      capabilities = _useAppDependencies.capabilities;

  var canSave = (0, _capabilities.hasSaveAlertsCapability)(capabilities);
  var actionTypesByTypeId = (0, _lodash.indexBy)(actionTypes, 'id');

  var _alert$actions = _toArray(alert.actions),
      firstAction = _alert$actions[0],
      otherActions = _alert$actions.slice(1);

  var _useState = (0, _react.useState)(alert.enabled),
      _useState2 = _slicedToArray(_useState, 2),
      isEnabled = _useState2[0],
      setIsEnabled = _useState2[1];

  var _useState3 = (0, _react.useState)(alert.muteAll),
      _useState4 = _slicedToArray(_useState3, 2),
      isMuted = _useState4[0],
      setIsMuted = _useState4[1];

  return _react.default.createElement(_eui.EuiPage, null, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h1", null, _react.default.createElement("span", {
    "data-test-subj": "alertDetailsTitle"
  }, alert.name), "\u2003", _react.default.createElement(_eui.EuiBetaBadge, {
    label: "Beta",
    tooltipContent: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.betaBadgeTooltipContent', {
      defaultMessage: '{pluginName} is in beta and is subject to change. The design and code is less mature than official GA features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA features.',
      values: {
        pluginName: _plugin.PLUGIN.getI18nName(_i18n.i18n)
      }
    })
  })))), _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false,
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_view_in_app.ViewInApp, {
    alert: alert
  }))))), _react.default.createElement(_eui.EuiPageContentBody, null, _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true,
    responsive: false,
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true,
    responsive: false,
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiBadge, {
    "data-test-subj": "alertTypeLabel"
  }, alertType.name)), firstAction && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiBadge, {
    color: "hollow",
    "data-test-subj": "actionTypeLabel"
  }, (_actionTypesByTypeId$ = actionTypesByTypeId[firstAction.actionTypeId].name) !== null && _actionTypesByTypeId$ !== void 0 ? _actionTypesByTypeId$ : firstAction.actionTypeId)), otherActions.length ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    "data-test-subj": "actionCountLabel"
  }, _react.default.createElement(_eui.EuiBadge, {
    color: "hollow"
  }, "+", otherActions.length)) : null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    wrap: true,
    responsive: false,
    gutterSize: "m"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSwitch, {
    name: "enable",
    disabled: !canSave,
    checked: isEnabled,
    "data-test-subj": "enableSwitch",
    onChange:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!isEnabled) {
                _context.next = 6;
                break;
              }

              setIsEnabled(false);
              _context.next = 4;
              return disableAlert(alert);

            case 4:
              _context.next = 9;
              break;

            case 6:
              setIsEnabled(true);
              _context.next = 9;
              return enableAlert(alert);

            case 9:
              requestRefresh();

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertDetails.collapsedItemActons.enableTitle",
      defaultMessage: "Enable"
    })
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSwitch, {
    name: "mute",
    checked: isMuted,
    disabled: !canSave || !isEnabled,
    "data-test-subj": "muteSwitch",
    onChange:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!isMuted) {
                _context2.next = 6;
                break;
              }

              setIsMuted(false);
              _context2.next = 4;
              return unmuteAlert(alert);

            case 4:
              _context2.next = 9;
              break;

            case 6:
              setIsMuted(true);
              _context2.next = 9;
              return muteAlert(alert);

            case 9:
              requestRefresh();

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })),
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertDetails.collapsedItemActons.muteTitle",
      defaultMessage: "Mute"
    })
  }))))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexItem, null, alert.enabled ? _react.default.createElement(_alert_instances_route.AlertInstancesRouteWithApi, {
    requestRefresh: requestRefresh,
    alert: alert
  }) : _react.default.createElement(_eui.EuiCallOut, {
    title: "Disabled Alert",
    color: "warning",
    iconType: "help"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertDetails.alertInstances.disabledAlert",
    defaultMessage: "This alert is disabled and cannot be displayed. Toggle Enable \u2191 to activate it."
  })))))))));
};

exports.AlertDetails = AlertDetails;
var AlertDetailsWithApi = (0, _with_bulk_alert_api_operations.withBulkAlertOperations)(AlertDetails);
exports.AlertDetailsWithApi = AlertDetailsWithApi;