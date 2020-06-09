"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMappingsAPIClient = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var RoleMappingsAPIClient =
/*#__PURE__*/
function () {
  function RoleMappingsAPIClient(http) {
    _classCallCheck(this, RoleMappingsAPIClient);

    this.http = http;
  }

  _createClass(RoleMappingsAPIClient, [{
    key: "checkRoleMappingFeatures",
    value: function () {
      var _checkRoleMappingFeatures = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.http.get("/internal/security/_check_role_mapping_features"));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkRoleMappingFeatures() {
        return _checkRoleMappingFeatures.apply(this, arguments);
      }

      return checkRoleMappingFeatures;
    }()
  }, {
    key: "getRoleMappings",
    value: function () {
      var _getRoleMappings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.http.get("/internal/security/role_mapping"));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getRoleMappings() {
        return _getRoleMappings.apply(this, arguments);
      }

      return getRoleMappings;
    }()
  }, {
    key: "getRoleMapping",
    value: function () {
      var _getRoleMapping = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(name) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.http.get("/internal/security/role_mapping/".concat(encodeURIComponent(name))));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRoleMapping(_x) {
        return _getRoleMapping.apply(this, arguments);
      }

      return getRoleMapping;
    }()
  }, {
    key: "saveRoleMapping",
    value: function () {
      var _saveRoleMapping = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(roleMapping) {
        var payload;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                payload = _objectSpread({}, roleMapping);
                delete payload.name;
                return _context4.abrupt("return", this.http.post("/internal/security/role_mapping/".concat(encodeURIComponent(roleMapping.name)), {
                  body: JSON.stringify(payload)
                }));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function saveRoleMapping(_x2) {
        return _saveRoleMapping.apply(this, arguments);
      }

      return saveRoleMapping;
    }()
  }, {
    key: "deleteRoleMappings",
    value: function () {
      var _deleteRoleMappings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(names) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", Promise.all(names.map(function (name) {
                  return _this.http.delete("/internal/security/role_mapping/".concat(encodeURIComponent(name))).then(function () {
                    return {
                      success: true,
                      name: name
                    };
                  }).catch(function (error) {
                    return {
                      success: false,
                      name: name,
                      error: error
                    };
                  });
                })));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteRoleMappings(_x3) {
        return _deleteRoleMappings.apply(this, arguments);
      }

      return deleteRoleMappings;
    }()
  }]);

  return RoleMappingsAPIClient;
}();

exports.RoleMappingsAPIClient = RoleMappingsAPIClient;