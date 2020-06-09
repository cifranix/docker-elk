"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spaceSelectorApp = void 0;

var _i18n = require("@kbn/i18n");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var spaceSelectorApp = Object.freeze({
  id: 'space_selector',
  create: function create(_ref) {
    var application = _ref.application,
        getStartServices = _ref.getStartServices,
        spacesManager = _ref.spacesManager;
    application.register({
      id: this.id,
      title: _i18n.i18n.translate('xpack.spaces.spaceSelector.appTitle', {
        defaultMessage: 'Select a space'
      }),
      chromeless: true,
      appRoute: '/spaces/space_selector',
      mount: function () {
        var _mount = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(params) {
          var _ref2, _ref3, _ref3$, coreStart, renderSpaceSelectorApp;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Promise.all([getStartServices(), import('./space_selector')]);

                case 2:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  _ref3$ = _slicedToArray(_ref3[0], 1);
                  coreStart = _ref3$[0];
                  renderSpaceSelectorApp = _ref3[1].renderSpaceSelectorApp;
                  return _context.abrupt("return", renderSpaceSelectorApp(coreStart.i18n, params.element, {
                    spacesManager: spacesManager,
                    serverBasePath: coreStart.http.basePath.serverBasePath
                  }));

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function mount(_x) {
          return _mount.apply(this, arguments);
        }

        return mount;
      }()
    });
  }
});
exports.spaceSelectorApp = spaceSelectorApp;