"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadActionTypes = loadActionTypes;
exports.loadAllActions = loadAllActions;
exports.createActionConnector = createActionConnector;
exports.updateActionConnector = updateActionConnector;
exports.deleteActions = deleteActions;

var _constants = require("../constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// We are assuming there won't be many actions. This is why we will load
// all the actions in advance and assume the total count to not go over 100 or so.
// We'll set this max setting assuming it's never reached.
var MAX_ACTIONS_RETURNED = 10000;

function loadActionTypes(_x) {
  return _loadActionTypes.apply(this, arguments);
}

function _loadActionTypes() {
  _loadActionTypes = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var http;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            http = _ref.http;
            _context.next = 3;
            return http.get("".concat(_constants.BASE_ACTION_API_PATH, "/types"));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadActionTypes.apply(this, arguments);
}

function loadAllActions(_x2) {
  return _loadAllActions.apply(this, arguments);
}

function _loadAllActions() {
  _loadAllActions = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref2) {
    var http;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            http = _ref2.http;
            _context2.next = 3;
            return http.get("".concat(_constants.BASE_ACTION_API_PATH, "/_find"), {
              query: {
                per_page: MAX_ACTIONS_RETURNED,
                sort_field: 'name.keyword',
                sort_order: 'asc'
              }
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadAllActions.apply(this, arguments);
}

function createActionConnector(_x3) {
  return _createActionConnector.apply(this, arguments);
}

function _createActionConnector() {
  _createActionConnector = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref3) {
    var http, connector;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            http = _ref3.http, connector = _ref3.connector;
            _context3.next = 3;
            return http.post("".concat(_constants.BASE_ACTION_API_PATH), {
              body: JSON.stringify(connector)
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
  return _createActionConnector.apply(this, arguments);
}

function updateActionConnector(_x4) {
  return _updateActionConnector.apply(this, arguments);
}

function _updateActionConnector() {
  _updateActionConnector = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref4) {
    var http, connector, id;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            http = _ref4.http, connector = _ref4.connector, id = _ref4.id;
            _context4.next = 3;
            return http.put("".concat(_constants.BASE_ACTION_API_PATH, "/").concat(id), {
              body: JSON.stringify({
                name: connector.name,
                config: connector.config,
                secrets: connector.secrets
              })
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
  return _updateActionConnector.apply(this, arguments);
}

function deleteActions(_x5) {
  return _deleteActions.apply(this, arguments);
}

function _deleteActions() {
  _deleteActions = _asyncToGenerator(
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
              return http.delete("".concat(_constants.BASE_ACTION_API_PATH, "/").concat(id));
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
  return _deleteActions.apply(this, arguments);
}