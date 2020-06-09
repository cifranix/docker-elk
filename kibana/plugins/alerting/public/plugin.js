"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertingPublicPlugin = void 0;

var _alert_navigation_registry = require("./alert_navigation_registry");

var _alert_api = require("./alert_api");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AlertingPublicPlugin =
/*#__PURE__*/
function () {
  function AlertingPublicPlugin() {
    _classCallCheck(this, AlertingPublicPlugin);

    _defineProperty(this, "alertNavigationRegistry", void 0);
  }

  _createClass(AlertingPublicPlugin, [{
    key: "setup",
    value: function setup(core) {
      var _this = this;

      this.alertNavigationRegistry = new _alert_navigation_registry.AlertNavigationRegistry();

      var registerNavigation =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(consumer, alertType, handler) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.t0 = _this.alertNavigationRegistry;
                  _context.t1 = consumer;
                  _context.next = 4;
                  return (0, _alert_api.loadAlertType)({
                    http: core.http,
                    id: alertType
                  });

                case 4:
                  _context.t2 = _context.sent;
                  _context.t3 = handler;
                  return _context.abrupt("return", _context.t0.register.call(_context.t0, _context.t1, _context.t2, _context.t3));

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function registerNavigation(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }();

      var registerDefaultNavigation =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(consumer, handler) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", _this.alertNavigationRegistry.registerDefault(consumer, handler));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function registerDefaultNavigation(_x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }();

      return {
        registerNavigation: registerNavigation,
        registerDefaultNavigation: registerDefaultNavigation
      };
    }
  }, {
    key: "start",
    value: function start(core) {
      var _this2 = this;

      return {
        getNavigation: function () {
          var _getNavigation = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(alertId) {
            var alert, alertType, navigationHandler, state;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return (0, _alert_api.loadAlert)({
                      http: core.http,
                      alertId: alertId
                    });

                  case 2:
                    alert = _context3.sent;
                    _context3.next = 5;
                    return (0, _alert_api.loadAlertType)({
                      http: core.http,
                      id: alert.alertTypeId
                    });

                  case 5:
                    alertType = _context3.sent;

                    if (!_this2.alertNavigationRegistry.has(alert.consumer, alertType)) {
                      _context3.next = 10;
                      break;
                    }

                    navigationHandler = _this2.alertNavigationRegistry.get(alert.consumer, alertType);
                    state = navigationHandler(alert, alertType);
                    return _context3.abrupt("return", typeof state === 'string' ? {
                      path: state
                    } : {
                      state: state
                    });

                  case 10:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function getNavigation(_x6) {
            return _getNavigation.apply(this, arguments);
          }

          return getNavigation;
        }()
      };
    }
  }]);

  return AlertingPublicPlugin;
}();

exports.AlertingPublicPlugin = AlertingPublicPlugin;