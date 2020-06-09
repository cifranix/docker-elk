"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadAlertTypes = loadAlertTypes;
exports.loadAlertType = loadAlertType;
exports.loadAlert = loadAlert;
exports.loadAlertState = loadAlertState;

var t = _interopRequireWildcard(require("io-ts"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _Array = require("fp-ts/lib/Array");

var _Option = require("fp-ts/lib/Option");

var _i18n = require("@kbn/i18n");

var _common = require("../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function loadAlertTypes(_x) {
  return _loadAlertTypes.apply(this, arguments);
}

function _loadAlertTypes() {
  _loadAlertTypes = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var http;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            http = _ref.http;
            _context.next = 3;
            return http.get("".concat(_common.BASE_ALERT_API_PATH, "/types"));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadAlertTypes.apply(this, arguments);
}

function loadAlertType(_x2) {
  return _loadAlertType.apply(this, arguments);
}

function _loadAlertType() {
  _loadAlertType = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref2) {
    var http, id, maybeAlertType;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            http = _ref2.http, id = _ref2.id;
            _context2.t0 = (0, _Array.findFirst)(function (type) {
              return type.id === id;
            });
            _context2.next = 4;
            return http.get("".concat(_common.BASE_ALERT_API_PATH, "/types"));

          case 4:
            _context2.t1 = _context2.sent;
            maybeAlertType = (0, _context2.t0)(_context2.t1);

            if (!(0, _Option.isNone)(maybeAlertType)) {
              _context2.next = 8;
              break;
            }

            throw new Error(_i18n.i18n.translate('xpack.alerting.loadAlertType.missingAlertTypeError', {
              defaultMessage: 'Alert type "{id}" is not registered.',
              values: {
                id: id
              }
            }));

          case 8:
            return _context2.abrupt("return", maybeAlertType.value);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadAlertType.apply(this, arguments);
}

function loadAlert(_x3) {
  return _loadAlert.apply(this, arguments);
}

function _loadAlert() {
  _loadAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3) {
    var http, alertId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            http = _ref3.http, alertId = _ref3.alertId;
            _context3.next = 3;
            return http.get("".concat(_common.BASE_ALERT_API_PATH, "/").concat(alertId));

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _loadAlert.apply(this, arguments);
}

function loadAlertState(_x4) {
  return _loadAlertState.apply(this, arguments);
}

function _loadAlertState() {
  _loadAlertState = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref4) {
    var http, alertId;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            http = _ref4.http, alertId = _ref4.alertId;
            _context4.next = 3;
            return http.get("".concat(_common.BASE_ALERT_API_PATH, "/").concat(alertId, "/state")).then(function (state) {
              return state ? state : {};
            }).then(function (state) {
              return (0, _pipeable.pipe)(_common.alertStateSchema.decode(state), (0, _Either.fold)(function (e) {
                throw new Error("Alert \"".concat(alertId, "\" has invalid state"));
              }, t.identity));
            });

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadAlertState.apply(this, arguments);
}