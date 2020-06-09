"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loggedOutApp = void 0;

var _i18n = require("@kbn/i18n");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loggedOutApp = Object.freeze({
  id: 'security_logged_out',
  create: function create(_ref) {
    var application = _ref.application,
        http = _ref.http,
        getStartServices = _ref.getStartServices;
    http.anonymousPaths.register('/security/logged_out');
    application.register({
      id: this.id,
      title: _i18n.i18n.translate('xpack.security.loggedOutAppTitle', {
        defaultMessage: 'Logged out'
      }),
      chromeless: true,
      appRoute: '/security/logged_out',
      mount: function mount(_ref2) {
        var element = _ref2.element;
        return _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _ref3, _ref4, _ref4$, coreStart, renderLoggedOutPage;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Promise.all([getStartServices(), import('./logged_out_page')]);

                case 2:
                  _ref3 = _context.sent;
                  _ref4 = _slicedToArray(_ref3, 2);
                  _ref4$ = _slicedToArray(_ref4[0], 1);
                  coreStart = _ref4$[0];
                  renderLoggedOutPage = _ref4[1].renderLoggedOutPage;
                  return _context.abrupt("return", renderLoggedOutPage(coreStart.i18n, element, {
                    basePath: coreStart.http.basePath
                  }));

                case 8:
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
exports.loggedOutApp = loggedOutApp;