"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withBulkAlertOperations = withBulkAlertOperations;

var _react = _interopRequireDefault(require("react"));

var _app_context = require("../../../app_context");

var _alert_api = require("../../../lib/alert_api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function withBulkAlertOperations(WrappedComponent) {
  return function (props) {
    var _useAppDependencies = (0, _app_context.useAppDependencies)(),
        http = _useAppDependencies.http;

    return _react.default.createElement(WrappedComponent, _extends({}, props, {
      muteAlerts:
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(items) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", (0, _alert_api.muteAlerts)({
                    http: http,
                    ids: items.filter(function (item) {
                      return !isAlertMuted(item);
                    }).map(function (item) {
                      return item.id;
                    })
                  }));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }(),
      unmuteAlerts:
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(items) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", (0, _alert_api.unmuteAlerts)({
                    http: http,
                    ids: items.filter(isAlertMuted).map(function (item) {
                      return item.id;
                    })
                  }));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }(),
      enableAlerts:
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(items) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", (0, _alert_api.enableAlerts)({
                    http: http,
                    ids: items.filter(isAlertDisabled).map(function (item) {
                      return item.id;
                    })
                  }));

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }(),
      disableAlerts:
      /*#__PURE__*/
      function () {
        var _ref4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(items) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt("return", (0, _alert_api.disableAlerts)({
                    http: http,
                    ids: items.filter(function (item) {
                      return !isAlertDisabled(item);
                    }).map(function (item) {
                      return item.id;
                    })
                  }));

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }(),
      deleteAlerts:
      /*#__PURE__*/
      function () {
        var _ref5 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5(items) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return", (0, _alert_api.deleteAlerts)({
                    http: http,
                    ids: items.map(function (item) {
                      return item.id;
                    })
                  }));

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x5) {
          return _ref5.apply(this, arguments);
        };
      }(),
      muteAlert:
      /*#__PURE__*/
      function () {
        var _ref6 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee6(alert) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (isAlertMuted(alert)) {
                    _context6.next = 2;
                    break;
                  }

                  return _context6.abrupt("return", (0, _alert_api.muteAlert)({
                    http: http,
                    id: alert.id
                  }));

                case 2:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      }(),
      unmuteAlert:
      /*#__PURE__*/
      function () {
        var _ref7 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee7(alert) {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (!isAlertMuted(alert)) {
                    _context7.next = 2;
                    break;
                  }

                  return _context7.abrupt("return", (0, _alert_api.unmuteAlert)({
                    http: http,
                    id: alert.id
                  }));

                case 2:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x7) {
          return _ref7.apply(this, arguments);
        };
      }(),
      muteAlertInstance:
      /*#__PURE__*/
      function () {
        var _ref8 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee8(alert, instanceId) {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  if (isAlertInstanceMuted(alert, instanceId)) {
                    _context8.next = 2;
                    break;
                  }

                  return _context8.abrupt("return", (0, _alert_api.muteAlertInstance)({
                    http: http,
                    id: alert.id,
                    instanceId: instanceId
                  }));

                case 2:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        return function (_x8, _x9) {
          return _ref8.apply(this, arguments);
        };
      }(),
      unmuteAlertInstance:
      /*#__PURE__*/
      function () {
        var _ref9 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee9(alert, instanceId) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  if (!isAlertInstanceMuted(alert, instanceId)) {
                    _context9.next = 2;
                    break;
                  }

                  return _context9.abrupt("return", (0, _alert_api.unmuteAlertInstance)({
                    http: http,
                    id: alert.id,
                    instanceId: instanceId
                  }));

                case 2:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9);
        }));

        return function (_x10, _x11) {
          return _ref9.apply(this, arguments);
        };
      }(),
      enableAlert:
      /*#__PURE__*/
      function () {
        var _ref10 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee10(alert) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  if (!isAlertDisabled(alert)) {
                    _context10.next = 2;
                    break;
                  }

                  return _context10.abrupt("return", (0, _alert_api.enableAlert)({
                    http: http,
                    id: alert.id
                  }));

                case 2:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10);
        }));

        return function (_x12) {
          return _ref10.apply(this, arguments);
        };
      }(),
      disableAlert:
      /*#__PURE__*/
      function () {
        var _ref11 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee11(alert) {
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  if (isAlertDisabled(alert)) {
                    _context11.next = 2;
                    break;
                  }

                  return _context11.abrupt("return", (0, _alert_api.disableAlert)({
                    http: http,
                    id: alert.id
                  }));

                case 2:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11);
        }));

        return function (_x13) {
          return _ref11.apply(this, arguments);
        };
      }(),
      deleteAlert:
      /*#__PURE__*/
      function () {
        var _ref12 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee12(alert) {
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.abrupt("return", (0, _alert_api.deleteAlerts)({
                    http: http,
                    ids: [alert.id]
                  }));

                case 1:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee12);
        }));

        return function (_x14) {
          return _ref12.apply(this, arguments);
        };
      }(),
      loadAlert:
      /*#__PURE__*/
      function () {
        var _ref13 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee13(alertId) {
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.abrupt("return", (0, _alert_api.loadAlert)({
                    http: http,
                    alertId: alertId
                  }));

                case 1:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee13);
        }));

        return function (_x15) {
          return _ref13.apply(this, arguments);
        };
      }(),
      loadAlertState:
      /*#__PURE__*/
      function () {
        var _ref14 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee14(alertId) {
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.abrupt("return", (0, _alert_api.loadAlertState)({
                    http: http,
                    alertId: alertId
                  }));

                case 1:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee14);
        }));

        return function (_x16) {
          return _ref14.apply(this, arguments);
        };
      }(),
      loadAlertTypes:
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee15() {
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                return _context15.abrupt("return", (0, _alert_api.loadAlertTypes)({
                  http: http
                }));

              case 1:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      })),
      getHealth:
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee16() {
        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", (0, _alert_api.health)({
                  http: http
                }));

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }))
    }));
  };
}

function isAlertDisabled(alert) {
  return alert.enabled === false;
}

function isAlertMuted(alert) {
  return alert.muteAll === true;
}

function isAlertInstanceMuted(alert, instanceId) {
  return alert.mutedInstanceIds.findIndex(function (muted) {
    return muted === instanceId;
  }) >= 0;
}