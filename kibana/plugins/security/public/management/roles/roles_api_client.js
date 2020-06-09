"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RolesAPIClient = void 0;

var _model = require("../../../common/model");

var _privilege_utils = require("./edit_role/privilege_utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RolesAPIClient =
/*#__PURE__*/
function () {
  function RolesAPIClient(http) {
    _classCallCheck(this, RolesAPIClient);

    this.http = http;
  }

  _createClass(RolesAPIClient, [{
    key: "getRoles",
    value: function () {
      var _getRoles = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.http.get('/api/security/role');

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRoles() {
        return _getRoles.apply(this, arguments);
      }

      return getRoles;
    }()
  }, {
    key: "getRole",
    value: function () {
      var _getRole = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(roleName) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.http.get("/api/security/role/".concat(encodeURIComponent(roleName)));

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getRole(_x) {
        return _getRole.apply(this, arguments);
      }

      return getRole;
    }()
  }, {
    key: "deleteRole",
    value: function () {
      var _deleteRole = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(roleName) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.http.delete("/api/security/role/".concat(encodeURIComponent(roleName)));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteRole(_x2) {
        return _deleteRole.apply(this, arguments);
      }

      return deleteRole;
    }()
  }, {
    key: "saveRole",
    value: function () {
      var _saveRole = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref) {
        var role, spacesEnabled;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                role = _ref.role, spacesEnabled = _ref.spacesEnabled;
                _context4.next = 3;
                return this.http.put("/api/security/role/".concat(encodeURIComponent(role.name)), {
                  body: JSON.stringify(this.transformRoleForSave((0, _model.copyRole)(role), spacesEnabled))
                });

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function saveRole(_x3) {
        return _saveRole.apply(this, arguments);
      }

      return saveRole;
    }()
  }, {
    key: "transformRoleForSave",
    value: function transformRoleForSave(role, spacesEnabled) {
      // Remove any placeholder index privileges
      var isPlaceholderPrivilege = function isPlaceholderPrivilege(indexPrivilege) {
        return indexPrivilege.names.length === 0;
      };

      role.elasticsearch.indices = role.elasticsearch.indices.filter(function (indexPrivilege) {
        return !isPlaceholderPrivilege(indexPrivilege);
      }); // Remove any placeholder query entries

      role.elasticsearch.indices.forEach(function (index) {
        return index.query || delete index.query;
      }); // If spaces are disabled, then do not persist any space privileges

      if (!spacesEnabled) {
        role.kibana = role.kibana.filter(_privilege_utils.isGlobalPrivilegeDefinition);
      }

      role.kibana.forEach(function (kibanaPrivilege) {
        // If a base privilege is defined, then do not persist feature privileges
        if (kibanaPrivilege.base.length > 0) {
          kibanaPrivilege.feature = {};
        }
      });
      delete role.name;
      delete role.transient_metadata;
      delete role._unrecognized_applications;
      delete role._transform_error;
      return role;
    }
  }]);

  return RolesAPIClient;
}();

exports.RolesAPIClient = RolesAPIClient;