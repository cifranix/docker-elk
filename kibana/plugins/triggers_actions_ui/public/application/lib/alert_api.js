"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadAlertTypes = loadAlertTypes;
exports.loadAlert = loadAlert;
exports.loadAlertState = loadAlertState;
exports.loadAlerts = loadAlerts;
exports.deleteAlerts = deleteAlerts;
exports.createAlert = createAlert;
exports.updateAlert = updateAlert;
exports.enableAlert = enableAlert;
exports.enableAlerts = enableAlerts;
exports.disableAlert = disableAlert;
exports.disableAlerts = disableAlerts;
exports.muteAlertInstance = muteAlertInstance;
exports.unmuteAlertInstance = unmuteAlertInstance;
exports.muteAlert = muteAlert;
exports.muteAlerts = muteAlerts;
exports.unmuteAlert = unmuteAlert;
exports.unmuteAlerts = unmuteAlerts;
exports.health = health;

var t = _interopRequireWildcard(require("io-ts"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _lodash = require("lodash");

var _common = require("../../../../alerting/common");

var _constants = require("../constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
            return http.get("".concat(_constants.BASE_ALERT_API_PATH, "/types"));

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

function loadAlert(_x2) {
  return _loadAlert.apply(this, arguments);
}

function _loadAlert() {
  _loadAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref2) {
    var http, alertId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            http = _ref2.http, alertId = _ref2.alertId;
            _context2.next = 3;
            return http.get("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(alertId));

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadAlert.apply(this, arguments);
}

function loadAlertState(_x3) {
  return _loadAlertState.apply(this, arguments);
}

function _loadAlertState() {
  _loadAlertState = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3) {
    var http, alertId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            http = _ref3.http, alertId = _ref3.alertId;
            _context3.next = 3;
            return http.get("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(alertId, "/state")).then(function (state) {
              return state ? state : {};
            }).then(function (state) {
              return (0, _pipeable.pipe)(_common.alertStateSchema.decode(state), (0, _Either.fold)(function (e) {
                throw new Error("Alert \"".concat(alertId, "\" has invalid state"));
              }, t.identity));
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _loadAlertState.apply(this, arguments);
}

function loadAlerts(_x4) {
  return _loadAlerts.apply(this, arguments);
}

function _loadAlerts() {
  _loadAlerts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref4) {
    var http, page, searchText, typesFilter, actionTypesFilter, filters;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            http = _ref4.http, page = _ref4.page, searchText = _ref4.searchText, typesFilter = _ref4.typesFilter, actionTypesFilter = _ref4.actionTypesFilter;
            filters = [];

            if (typesFilter && typesFilter.length) {
              filters.push("alert.attributes.alertTypeId:(".concat(typesFilter.join(' or '), ")"));
            }

            if (actionTypesFilter && actionTypesFilter.length) {
              filters.push(['(', actionTypesFilter.map(function (id) {
                return "alert.attributes.actions:{ actionTypeId:".concat(id, " }");
              }).join(' OR '), ')'].join(''));
            }

            _context4.next = 6;
            return http.get("".concat(_constants.BASE_ALERT_API_PATH, "/_find"), {
              query: {
                page: page.index + 1,
                per_page: page.size,
                search_fields: searchText ? JSON.stringify(['name', 'tags']) : undefined,
                search: searchText,
                filter: filters.length ? filters.join(' and ') : undefined,
                default_search_operator: 'AND',
                sort_field: 'name.keyword',
                sort_order: 'asc'
              }
            });

          case 6:
            return _context4.abrupt("return", _context4.sent);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadAlerts.apply(this, arguments);
}

function deleteAlerts(_x5) {
  return _deleteAlerts.apply(this, arguments);
}

function _deleteAlerts() {
  _deleteAlerts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref5) {
    var ids, http, successes, errors;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ids = _ref5.ids, http = _ref5.http;
            successes = [];
            errors = [];
            _context5.next = 5;
            return Promise.all(ids.map(function (id) {
              return http.delete("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(id));
            })).then(function (fulfilled) {
              successes.push.apply(successes, _toConsumableArray(fulfilled));
            }, function (rejected) {
              errors.push.apply(errors, _toConsumableArray(rejected));
            });

          case 5:
            return _context5.abrupt("return", {
              successes: successes,
              errors: errors
            });

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _deleteAlerts.apply(this, arguments);
}

function createAlert(_x6) {
  return _createAlert.apply(this, arguments);
}

function _createAlert() {
  _createAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(_ref6) {
    var http, alert;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            http = _ref6.http, alert = _ref6.alert;
            _context6.next = 3;
            return http.post("".concat(_constants.BASE_ALERT_API_PATH), {
              body: JSON.stringify(alert)
            });

          case 3:
            return _context6.abrupt("return", _context6.sent);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _createAlert.apply(this, arguments);
}

function updateAlert(_x7) {
  return _updateAlert.apply(this, arguments);
}

function _updateAlert() {
  _updateAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(_ref7) {
    var http, alert, id;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            http = _ref7.http, alert = _ref7.alert, id = _ref7.id;
            _context7.next = 3;
            return http.put("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(id), {
              body: JSON.stringify((0, _lodash.pick)(alert, ['throttle', 'name', 'tags', 'schedule', 'params', 'actions']))
            });

          case 3:
            return _context7.abrupt("return", _context7.sent);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _updateAlert.apply(this, arguments);
}

function enableAlert(_x8) {
  return _enableAlert.apply(this, arguments);
}

function _enableAlert() {
  _enableAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(_ref8) {
    var id, http;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = _ref8.id, http = _ref8.http;
            _context8.next = 3;
            return http.post("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(id, "/_enable"));

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _enableAlert.apply(this, arguments);
}

function enableAlerts(_x9) {
  return _enableAlerts.apply(this, arguments);
}

function _enableAlerts() {
  _enableAlerts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(_ref9) {
    var ids, http;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            ids = _ref9.ids, http = _ref9.http;
            _context9.next = 3;
            return Promise.all(ids.map(function (id) {
              return enableAlert({
                id: id,
                http: http
              });
            }));

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _enableAlerts.apply(this, arguments);
}

function disableAlert(_x10) {
  return _disableAlert.apply(this, arguments);
}

function _disableAlert() {
  _disableAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(_ref10) {
    var id, http;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = _ref10.id, http = _ref10.http;
            _context10.next = 3;
            return http.post("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(id, "/_disable"));

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _disableAlert.apply(this, arguments);
}

function disableAlerts(_x11) {
  return _disableAlerts.apply(this, arguments);
}

function _disableAlerts() {
  _disableAlerts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(_ref11) {
    var ids, http;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            ids = _ref11.ids, http = _ref11.http;
            _context11.next = 3;
            return Promise.all(ids.map(function (id) {
              return disableAlert({
                id: id,
                http: http
              });
            }));

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _disableAlerts.apply(this, arguments);
}

function muteAlertInstance(_x12) {
  return _muteAlertInstance.apply(this, arguments);
}

function _muteAlertInstance() {
  _muteAlertInstance = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(_ref12) {
    var id, instanceId, http;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            id = _ref12.id, instanceId = _ref12.instanceId, http = _ref12.http;
            _context12.next = 3;
            return http.post("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(id, "/alert_instance/").concat(instanceId, "/_mute"));

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _muteAlertInstance.apply(this, arguments);
}

function unmuteAlertInstance(_x13) {
  return _unmuteAlertInstance.apply(this, arguments);
}

function _unmuteAlertInstance() {
  _unmuteAlertInstance = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(_ref13) {
    var id, instanceId, http;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            id = _ref13.id, instanceId = _ref13.instanceId, http = _ref13.http;
            _context13.next = 3;
            return http.post("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(id, "/alert_instance/").concat(instanceId, "/_unmute"));

          case 3:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _unmuteAlertInstance.apply(this, arguments);
}

function muteAlert(_x14) {
  return _muteAlert.apply(this, arguments);
}

function _muteAlert() {
  _muteAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(_ref14) {
    var id, http;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            id = _ref14.id, http = _ref14.http;
            _context14.next = 3;
            return http.post("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(id, "/_mute_all"));

          case 3:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _muteAlert.apply(this, arguments);
}

function muteAlerts(_x15) {
  return _muteAlerts.apply(this, arguments);
}

function _muteAlerts() {
  _muteAlerts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(_ref15) {
    var ids, http;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            ids = _ref15.ids, http = _ref15.http;
            _context15.next = 3;
            return Promise.all(ids.map(function (id) {
              return muteAlert({
                http: http,
                id: id
              });
            }));

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _muteAlerts.apply(this, arguments);
}

function unmuteAlert(_x16) {
  return _unmuteAlert.apply(this, arguments);
}

function _unmuteAlert() {
  _unmuteAlert = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee16(_ref16) {
    var id, http;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            id = _ref16.id, http = _ref16.http;
            _context16.next = 3;
            return http.post("".concat(_constants.BASE_ALERT_API_PATH, "/").concat(id, "/_unmute_all"));

          case 3:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _unmuteAlert.apply(this, arguments);
}

function unmuteAlerts(_x17) {
  return _unmuteAlerts.apply(this, arguments);
}

function _unmuteAlerts() {
  _unmuteAlerts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee17(_ref17) {
    var ids, http;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            ids = _ref17.ids, http = _ref17.http;
            _context17.next = 3;
            return Promise.all(ids.map(function (id) {
              return unmuteAlert({
                id: id,
                http: http
              });
            }));

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _unmuteAlerts.apply(this, arguments);
}

function health(_x18) {
  return _health.apply(this, arguments);
}

function _health() {
  _health = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee18(_ref18) {
    var http;
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            http = _ref18.http;
            _context18.next = 3;
            return http.get("".concat(_constants.BASE_ALERT_API_PATH, "/_health"));

          case 3:
            return _context18.abrupt("return", _context18.sent);

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _health.apply(this, arguments);
}