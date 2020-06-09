"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlertState = getAlertState;
exports.AlertInstancesRouteWithApi = exports.AlertInstancesRoute = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _app_context = require("../../../app_context");

var _with_bulk_alert_api_operations = require("../../common/components/with_bulk_alert_api_operations");

var _alert_instances = require("./alert_instances");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AlertInstancesRoute = function AlertInstancesRoute(_ref) {
  var alert = _ref.alert,
      requestRefresh = _ref.requestRefresh,
      loadAlertState = _ref.loadAlertState;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      http = _useAppDependencies.http,
      toastNotifications = _useAppDependencies.toastNotifications;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      alertState = _useState2[0],
      setAlertState = _useState2[1];

  (0, _react.useEffect)(function () {
    getAlertState(alert.id, loadAlertState, setAlertState, toastNotifications);
  }, [alert, http, loadAlertState, toastNotifications]);
  return alertState ? _react.default.createElement(_alert_instances.AlertInstancesWithApi, {
    requestRefresh: requestRefresh,
    alert: alert,
    alertState: alertState
  }) : _react.default.createElement("div", {
    style: {
      textAlign: 'center',
      margin: '4em 0em'
    }
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "l"
  }));
};

exports.AlertInstancesRoute = AlertInstancesRoute;

function getAlertState(_x, _x2, _x3, _x4) {
  return _getAlertState.apply(this, arguments);
}

function _getAlertState() {
  _getAlertState = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(alertId, loadAlertState, setAlertState, toastNotifications) {
    var loadedState;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return loadAlertState(alertId);

          case 3:
            loadedState = _context.sent;
            setAlertState(loadedState);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            toastNotifications.addDanger({
              title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.unableToLoadAlertStateMessage', {
                defaultMessage: 'Unable to load alert state: {message}',
                values: {
                  message: _context.t0.message
                }
              })
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getAlertState.apply(this, arguments);
}

var AlertInstancesRouteWithApi = (0, _with_bulk_alert_api_operations.withBulkAlertOperations)(AlertInstancesRoute);
exports.AlertInstancesRouteWithApi = AlertInstancesRouteWithApi;