"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiKeysManagementApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _i18n = require("@kbn/i18n");

var _api_keys_grid = require("./api_keys_grid");

var _api_keys_api_client = require("./api_keys_api_client");

var _documentation_links = require("./documentation_links");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var apiKeysManagementApp = Object.freeze({
  id: 'api_keys',
  create: function create(_ref) {
    var getStartServices = _ref.getStartServices;
    return {
      id: this.id,
      order: 30,
      title: _i18n.i18n.translate('xpack.security.management.apiKeysTitle', {
        defaultMessage: 'API Keys'
      }),
      mount: function mount(_ref2) {
        var basePath = _ref2.basePath,
            element = _ref2.element,
            setBreadcrumbs = _ref2.setBreadcrumbs;
        return _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _ref3, _ref4, _ref4$, docLinks, http, notifications, i18nStart;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return getStartServices();

                case 2:
                  _ref3 = _context.sent;
                  _ref4 = _slicedToArray(_ref3, 1);
                  _ref4$ = _ref4[0];
                  docLinks = _ref4$.docLinks;
                  http = _ref4$.http;
                  notifications = _ref4$.notifications;
                  i18nStart = _ref4$.i18n;
                  setBreadcrumbs([{
                    text: _i18n.i18n.translate('xpack.security.apiKeys.breadcrumb', {
                      defaultMessage: 'API Keys'
                    }),
                    href: "#".concat(basePath)
                  }]);
                  (0, _reactDom.render)(_react.default.createElement(i18nStart.Context, null, _react.default.createElement(_api_keys_grid.APIKeysGridPage, {
                    notifications: notifications,
                    docLinks: new _documentation_links.DocumentationLinksService(docLinks),
                    apiKeysAPIClient: new _api_keys_api_client.APIKeysAPIClient(http)
                  })), element);
                  return _context.abrupt("return", function () {
                    (0, _reactDom.unmountComponentAtNode)(element);
                  });

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    };
  }
});
exports.apiKeysManagementApp = apiKeysManagementApp;