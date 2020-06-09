"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startLegacyApp = startLegacyApp;

var _history = require("history");

var _react = _interopRequireDefault(require("react"));

var _url = _interopRequireDefault(require("url"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRouterDom = require("react-router-dom");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// This exists purely to facilitate legacy app/infra URL redirects.
// It will be removed in 8.0.0.
function startLegacyApp(_x) {
  return _startLegacyApp.apply(this, arguments);
}

function _startLegacyApp() {
  _startLegacyApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(params) {
    var element, history, App;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            element = params.element;
            history = (0, _history.createBrowserHistory)();

            App = function App() {
              return _react.default.createElement(_eui.EuiErrorBoundary, null, _react.default.createElement(_reactRouterDom.Router, {
                history: history
              }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
                path: '/',
                render: function render(_ref) {
                  var location = _ref.location;

                  if (!location) {
                    return null;
                  }

                  var nextPath = '';
                  var nextBasePath = '';
                  var nextSearch;

                  if (location.hash.indexOf('#infrastructure') > -1 || location.hash.indexOf('#/infrastructure') > -1) {
                    nextPath = location.hash.replace(new RegExp('#infrastructure/|#/infrastructure/|#/infrastructure|#infrastructure', 'g'), '');
                    nextBasePath = location.pathname.replace('app/infra', 'app/metrics');
                  } else if (location.hash.indexOf('#logs') > -1 || location.hash.indexOf('#/logs') > -1) {
                    nextPath = location.hash.replace(new RegExp('#logs/|#/logs/|#/logs|#logs', 'g'), '');
                    nextBasePath = location.pathname.replace('app/infra', 'app/logs');
                  } else {
                    // This covers /app/infra and /app/infra/home (both of which used to render
                    // the metrics inventory page)
                    nextPath = 'inventory';
                    nextBasePath = location.pathname.replace('app/infra', 'app/metrics');
                    nextSearch = undefined;
                  } // app/inra#infrastructure/metrics/:type/:node was changed to app/metrics/detail/:type/:node, this
                  // accounts for that edge case


                  nextPath = nextPath.replace('metrics/', 'detail/'); // Query parameters (location.search) will arrive as part of location.hash and not location.search

                  var nextPathParts = nextPath.split('?');
                  nextPath = nextPathParts[0];
                  nextSearch = nextPathParts[1] ? nextPathParts[1] : undefined;

                  var nextUrl = _url.default.format({
                    pathname: "".concat(nextBasePath, "/").concat(nextPath),
                    hash: undefined,
                    search: nextSearch
                  });

                  nextUrl = nextUrl.replace('//', '/');
                  window.location.href = nextUrl;
                  return null;
                }
              }))));
            };

            _reactDom.default.render(_react.default.createElement(App, null), element);

            return _context.abrupt("return", function () {
              _reactDom.default.unmountComponentAtNode(element);
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startLegacyApp.apply(this, arguments);
}