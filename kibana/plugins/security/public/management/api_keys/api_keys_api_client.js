"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APIKeysAPIClient = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var apiKeysUrl = '/internal/security/api_key';

var APIKeysAPIClient =
/*#__PURE__*/
function () {
  function APIKeysAPIClient(http) {
    _classCallCheck(this, APIKeysAPIClient);

    this.http = http;
  }

  _createClass(APIKeysAPIClient, [{
    key: "checkPrivileges",
    value: function () {
      var _checkPrivileges = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.http.get("".concat(apiKeysUrl, "/privileges"));

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkPrivileges() {
        return _checkPrivileges.apply(this, arguments);
      }

      return checkPrivileges;
    }()
  }, {
    key: "getApiKeys",
    value: function () {
      var _getApiKeys = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var isAdmin,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                isAdmin = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
                _context2.next = 3;
                return this.http.get(apiKeysUrl, {
                  query: {
                    isAdmin: isAdmin
                  }
                });

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getApiKeys() {
        return _getApiKeys.apply(this, arguments);
      }

      return getApiKeys;
    }()
  }, {
    key: "invalidateApiKeys",
    value: function () {
      var _invalidateApiKeys = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(apiKeys) {
        var isAdmin,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                isAdmin = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : false;
                _context3.next = 3;
                return this.http.post("".concat(apiKeysUrl, "/invalidate"), {
                  body: JSON.stringify({
                    apiKeys: apiKeys,
                    isAdmin: isAdmin
                  })
                });

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function invalidateApiKeys(_x) {
        return _invalidateApiKeys.apply(this, arguments);
      }

      return invalidateApiKeys;
    }()
  }]);

  return APIKeysAPIClient;
}();

exports.APIKeysAPIClient = APIKeysAPIClient;