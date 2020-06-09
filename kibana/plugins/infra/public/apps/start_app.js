"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startApp = startApp;
exports.CONTAINER_CLASSNAME = void 0;

var _history = require("history");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactApollo = require("react-apollo");

var _reactRedux = require("react-redux");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _eui = require("@elastic/eui");

var _eui_styled_components = require("../../../observability/public/typings/eui_styled_components");

var _store = require("../store");

var _apollo_context = require("../utils/apollo_context");

var _redux_context = require("../utils/redux_context");

var _history_context = require("../utils/history_context");

var _public = require("../../../../../src/plugins/kibana_react/public");

var _triggers_actions_context = require("../utils/triggers_actions_context");

require("../index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var CONTAINER_CLASSNAME = 'infra-container-element';
exports.CONTAINER_CLASSNAME = CONTAINER_CLASSNAME;

function startApp(_x, _x2, _x3, _x4, _x5, _x6) {
  return _startApp.apply(this, arguments);
}

function _startApp() {
  _startApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(libs, core, plugins, params, Router, triggersActionsUI) {
    var element, appBasePath, history, libs$, store, InfraPluginRoot, App;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            element = params.element, appBasePath = params.appBasePath;
            history = (0, _history.createBrowserHistory)({
              basename: appBasePath
            });
            libs$ = new _rxjs.BehaviorSubject(libs);
            store = (0, _store.createStore)({
              apolloClient: libs$.pipe((0, _operators.pluck)('apolloClient')),
              observableApi: libs$.pipe((0, _operators.pluck)('observableApi'))
            });

            InfraPluginRoot = function InfraPluginRoot() {
              var _useUiSetting$ = (0, _public.useUiSetting$)('theme:darkMode'),
                  _useUiSetting$2 = _slicedToArray(_useUiSetting$, 1),
                  darkMode = _useUiSetting$2[0];

              return _react.default.createElement(core.i18n.Context, null, _react.default.createElement(_eui.EuiErrorBoundary, null, _react.default.createElement(_triggers_actions_context.TriggersActionsProvider, {
                triggersActionsUI: triggersActionsUI
              }, _react.default.createElement(_reactRedux.Provider, {
                store: store
              }, _react.default.createElement(_redux_context.ReduxStateContextProvider, null, _react.default.createElement(_reactApollo.ApolloProvider, {
                client: libs.apolloClient
              }, _react.default.createElement(_apollo_context.ApolloClientContext.Provider, {
                value: libs.apolloClient
              }, _react.default.createElement(_eui_styled_components.EuiThemeProvider, {
                darkMode: darkMode
              }, _react.default.createElement(_history_context.HistoryContext.Provider, {
                value: history
              }, _react.default.createElement(Router, {
                history: history
              }))))))))));
            };

            App = function App() {
              return _react.default.createElement(_public.KibanaContextProvider, {
                services: _objectSpread({}, core, {}, plugins)
              }, _react.default.createElement(InfraPluginRoot, null));
            }; // Ensure the element we're handed from application mounting is assigned a class
            // for our index.scss styles to apply to.


            element.className += " ".concat(CONTAINER_CLASSNAME);

            _reactDom.default.render(_react.default.createElement(App, null), element);

            return _context.abrupt("return", function () {
              _reactDom.default.unmountComponentAtNode(element);
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startApp.apply(this, arguments);
}