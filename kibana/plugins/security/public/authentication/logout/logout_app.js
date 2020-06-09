"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutApp = void 0;

var _i18n = require("@kbn/i18n");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logoutApp = Object.freeze({
  id: 'security_logout',
  create: function create(_ref) {
    var application = _ref.application,
        http = _ref.http;
    http.anonymousPaths.register('/logout');
    application.register({
      id: this.id,
      title: _i18n.i18n.translate('xpack.security.logoutAppTitle', {
        defaultMessage: 'Logout'
      }),
      chromeless: true,
      appRoute: '/logout',
      mount: function mount() {
        return _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  window.sessionStorage.clear(); // Redirect user to the server logout endpoint to complete logout.

                  window.location.href = http.basePath.prepend("/api/security/logout".concat(window.location.search));
                  return _context.abrupt("return", function () {});

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    });
  }
});
exports.logoutApp = logoutApp;