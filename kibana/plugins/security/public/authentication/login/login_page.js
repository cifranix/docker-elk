"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLoginPage = renderLoginPage;
exports.LoginPage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rxjs = require("rxjs");

var _url = require("url");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _components = require("./components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var infoMessageMap = new Map([['SESSION_EXPIRED', _i18n.i18n.translate('xpack.security.login.sessionExpiredDescription', {
  defaultMessage: 'Your session has timed out. Please log in again.'
})], ['LOGGED_OUT', _i18n.i18n.translate('xpack.security.login.loggedOutDescription', {
  defaultMessage: 'You have logged out of Kibana.'
})]]);

var LoginPage =
/*#__PURE__*/
function (_Component) {
  _inherits(LoginPage, _Component);

  function LoginPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoginPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoginPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      loginState: null
    });

    _defineProperty(_assertThisInitialized(_this), "getLoginForm", function (_ref) {
      var _parse$query$msg;

      var layout = _ref.layout,
          requiresSecureConnection = _ref.requiresSecureConnection,
          isSecureConnection = _ref.isSecureConnection,
          selector = _ref.selector,
          showLoginForm = _ref.showLoginForm;
      var isLoginExplicitlyDisabled = !showLoginForm && (!selector.enabled || selector.providers.length === 0);

      if (isLoginExplicitlyDisabled) {
        return _react.default.createElement(_components.DisabledLoginForm, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.noLoginMethodsAvailableTitle",
            defaultMessage: "Login is disabled."
          }),
          message: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.noLoginMethodsAvailableMessage",
            defaultMessage: "Contact your system administrator."
          })
        });
      }

      if (requiresSecureConnection && !isSecureConnection) {
        return _react.default.createElement(_components.DisabledLoginForm, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.requiresSecureConnectionTitle",
            defaultMessage: "A secure connection is required for log in"
          }),
          message: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.requiresSecureConnectionMessage",
            defaultMessage: "Contact your system administrator."
          })
        });
      }

      if (layout === 'error-es-unavailable') {
        return _react.default.createElement(_components.DisabledLoginForm, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.esUnavailableTitle",
            defaultMessage: "Cannot connect to the Elasticsearch cluster"
          }),
          message: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.esUnavailableMessage",
            defaultMessage: "See the Kibana logs for details and try reloading the page."
          })
        });
      }

      if (layout === 'error-xpack-unavailable') {
        return _react.default.createElement(_components.DisabledLoginForm, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.xpackUnavailableTitle",
            defaultMessage: "Cannot connect to the Elasticsearch cluster currently configured for Kibana."
          }),
          message: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.xpackUnavailableMessage",
            defaultMessage: "To use the full set of free features in this distribution of Kibana, please update Elasticsearch to the default distribution."
          })
        });
      }

      if (layout !== 'form') {
        return _react.default.createElement(_components.DisabledLoginForm, {
          title: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.unknownLayoutTitle",
            defaultMessage: "Unsupported login form layout."
          }),
          message: _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.security.loginPage.unknownLayoutMessage",
            defaultMessage: "See the Kibana logs for details and try reloading the page."
          })
        });
      }

      return _react.default.createElement(_components.LoginForm, {
        http: _this.props.http,
        notifications: _this.props.notifications,
        showLoginForm: showLoginForm,
        selector: selector,
        infoMessage: infoMessageMap.get((_parse$query$msg = (0, _url.parse)(window.location.href, true).query.msg) === null || _parse$query$msg === void 0 ? void 0 : _parse$query$msg.toString()),
        loginAssistanceMessage: _this.props.loginAssistanceMessage
      });
    });

    return _this;
  }

  _createClass(LoginPage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var loadingCount$;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                loadingCount$ = new _rxjs.BehaviorSubject(1);
                this.props.http.addLoadingCountSource(loadingCount$.asObservable());
                _context.prev = 2;
                _context.t0 = this;
                _context.next = 6;
                return this.props.http.get('/internal/security/login_state');

              case 6:
                _context.t1 = _context.sent;
                _context.t2 = {
                  loginState: _context.t1
                };

                _context.t0.setState.call(_context.t0, _context.t2);

                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t3 = _context["catch"](2);
                this.props.fatalErrors.add(_context.t3);

              case 14:
                loadingCount$.next(0);
                loadingCount$.complete();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 11]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var loginState = this.state.loginState;

      if (!loginState) {
        return null;
      }

      var isSecureConnection = !!window.location.protocol.match(/^https/);
      var allowLogin = loginState.allowLogin,
          layout = loginState.layout,
          requiresSecureConnection = loginState.requiresSecureConnection;
      var loginIsSupported = requiresSecureConnection && !isSecureConnection ? false : allowLogin && layout === 'form';
      var contentHeaderClasses = (0, _classnames.default)('loginWelcome__content', 'eui-textCenter', _defineProperty({}, 'loginWelcome__contentDisabledForm', !loginIsSupported));
      var contentBodyClasses = (0, _classnames.default)('loginWelcome__content', 'loginWelcome-body', _defineProperty({}, 'loginWelcome__contentDisabledForm', !loginIsSupported));
      return _react.default.createElement("div", {
        className: "loginWelcome login-form"
      }, _react.default.createElement("header", {
        className: "loginWelcome__header"
      }, _react.default.createElement("div", {
        className: contentHeaderClasses
      }, _react.default.createElement(_eui.EuiSpacer, {
        size: "xxl"
      }), _react.default.createElement("span", {
        className: "loginWelcome__logo"
      }, _react.default.createElement(_eui.EuiIcon, {
        type: "logoElastic",
        size: "xxl"
      })), _react.default.createElement(_eui.EuiTitle, {
        size: "m",
        className: "loginWelcome__title"
      }, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.loginPage.welcomeTitle",
        defaultMessage: "Welcome to Elastic Kibana"
      }))), _react.default.createElement(_eui.EuiText, {
        size: "s",
        color: "subdued",
        className: "loginWelcome__subtitle"
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.loginPage.welcomeDescription",
        defaultMessage: "Your window into the Elastic Stack"
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "xl"
      }))), _react.default.createElement("div", {
        className: contentBodyClasses
      }, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "l"
      }, _react.default.createElement(_eui.EuiFlexItem, null, this.getLoginForm(_objectSpread({}, loginState, {
        isSecureConnection: isSecureConnection
      }))))));
    }
  }]);

  return LoginPage;
}(_react.Component);

exports.LoginPage = LoginPage;

function renderLoginPage(i18nStart, element, props) {
  _reactDom.default.render(_react.default.createElement(i18nStart.Context, null, _react.default.createElement(LoginPage, props)), element);

  return function () {
    return _reactDom.default.unmountComponentAtNode(element);
  };
}