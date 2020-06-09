"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticationService = void 0;

var _login = require("./login");

var _logout = require("./logout");

var _logged_out = require("./logged_out");

var _overwritten_session = require("./overwritten_session");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthenticationService =
/*#__PURE__*/
function () {
  function AuthenticationService() {
    _classCallCheck(this, AuthenticationService);
  }

  _createClass(AuthenticationService, [{
    key: "setup",
    value: function setup(_ref) {
      var application = _ref.application,
          config = _ref.config,
          getStartServices = _ref.getStartServices,
          http = _ref.http;

      var getCurrentUser =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return http.get('/internal/security/me', {
                    asSystemRequest: true
                  });

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function getCurrentUser() {
          return _ref2.apply(this, arguments);
        };
      }();

      _login.loginApp.create({
        application: application,
        config: config,
        getStartServices: getStartServices,
        http: http
      });

      _logout.logoutApp.create({
        application: application,
        http: http
      });

      _logged_out.loggedOutApp.create({
        application: application,
        getStartServices: getStartServices,
        http: http
      });

      _overwritten_session.overwrittenSessionApp.create({
        application: application,
        authc: {
          getCurrentUser: getCurrentUser
        },
        getStartServices: getStartServices
      });

      return {
        getCurrentUser: getCurrentUser
      };
    }
  }]);

  return AuthenticationService;
}();

exports.AuthenticationService = AuthenticationService;