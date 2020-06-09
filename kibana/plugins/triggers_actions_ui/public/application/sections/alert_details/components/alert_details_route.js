"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlertData = getAlertData;
exports.AlertDetailsRouteWithApi = exports.AlertDetailsRoute = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _app_context = require("../../../app_context");

var _alert_details = require("./alert_details");

var _value_validators = require("../../../lib/value_validators");

var _with_bulk_alert_api_operations = require("../../common/components/with_bulk_alert_api_operations");

var _with_actions_api_operations = require("../../common/components/with_actions_api_operations");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AlertDetailsRoute = function AlertDetailsRoute(_ref) {
  var alertId = _ref.match.params.alertId,
      loadAlert = _ref.loadAlert,
      loadAlertTypes = _ref.loadAlertTypes,
      loadActionTypes = _ref.loadActionTypes;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      http = _useAppDependencies.http,
      toastNotifications = _useAppDependencies.toastNotifications;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      alert = _useState2[0],
      setAlert = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      alertType = _useState4[0],
      setAlertType = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      actionTypes = _useState6[0],
      setActionTypes = _useState6[1];

  var _React$useState = _react.default.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      refreshToken = _React$useState2[0],
      requestRefresh = _React$useState2[1];

  (0, _react.useEffect)(function () {
    getAlertData(alertId, loadAlert, loadAlertTypes, loadActionTypes, setAlert, setAlertType, setActionTypes, toastNotifications);
  }, [alertId, http, loadActionTypes, loadAlert, loadAlertTypes, toastNotifications, refreshToken]);
  return alert && alertType && actionTypes ? _react.default.createElement(_alert_details.AlertDetailsWithApi, {
    alert: alert,
    alertType: alertType,
    actionTypes: actionTypes,
    requestRefresh:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", requestRefresh(Date.now()));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }) : _react.default.createElement("div", {
    style: {
      textAlign: 'center',
      margin: '4em 0em'
    }
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "l"
  }));
};

exports.AlertDetailsRoute = AlertDetailsRoute;

function getAlertData(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
  return _getAlertData.apply(this, arguments);
}

function _getAlertData() {
  _getAlertData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(alertId, loadAlert, loadAlertTypes, loadActionTypes, setAlert, setAlertType, setActionTypes, toastNotifications) {
    var loadedAlert, _ref3, _ref4, loadedAlertType, loadedActionTypes;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return loadAlert(alertId);

          case 3:
            loadedAlert = _context2.sent;
            setAlert(loadedAlert);
            _context2.next = 7;
            return Promise.all([loadAlertTypes().then(function (types) {
              return types.find(function (type) {
                return type.id === loadedAlert.alertTypeId;
              });
            }).then((0, _value_validators.throwIfAbsent)("Invalid Alert Type: ".concat(loadedAlert.alertTypeId))), loadActionTypes().then((0, _value_validators.throwIfIsntContained)(new Set(loadedAlert.actions.map(function (action) {
              return action.actionTypeId;
            })), function (requiredActionType) {
              return "Invalid Action Type: ".concat(requiredActionType);
            }, function (action) {
              return action.id;
            }))]);

          case 7:
            _ref3 = _context2.sent;
            _ref4 = _slicedToArray(_ref3, 2);
            loadedAlertType = _ref4[0];
            loadedActionTypes = _ref4[1];
            setAlertType(loadedAlertType);
            setActionTypes(loadedActionTypes);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            toastNotifications.addDanger({
              title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.unableToLoadAlertMessage', {
                defaultMessage: 'Unable to load alert: {message}',
                values: {
                  message: _context2.t0.message
                }
              })
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return _getAlertData.apply(this, arguments);
}

var AlertDetailsRouteWithApi = (0, _with_actions_api_operations.withActionOperations)((0, _with_bulk_alert_api_operations.withBulkAlertOperations)(AlertDetailsRoute));
exports.AlertDetailsRouteWithApi = AlertDetailsRouteWithApi;