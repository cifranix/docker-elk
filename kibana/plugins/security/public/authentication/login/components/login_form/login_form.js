"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _parse_next = require("../../../../../common/parse_next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var LoadingStateType;

(function (LoadingStateType) {
  LoadingStateType[LoadingStateType["None"] = 0] = "None";
  LoadingStateType[LoadingStateType["Form"] = 1] = "Form";
  LoadingStateType[LoadingStateType["Selector"] = 2] = "Selector";
})(LoadingStateType || (LoadingStateType = {}));

var MessageType;

(function (MessageType) {
  MessageType[MessageType["None"] = 0] = "None";
  MessageType[MessageType["Info"] = 1] = "Info";
  MessageType[MessageType["Danger"] = 2] = "Danger";
})(MessageType || (MessageType = {}));

var LoginForm =
/*#__PURE__*/
function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoginForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoginForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      loadingState: {
        type: LoadingStateType.None
      },
      username: '',
      password: '',
      message: _this.props.infoMessage ? {
        type: MessageType.Info,
        content: _this.props.infoMessage
      } : {
        type: MessageType.None
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderLoginForm", function () {
      if (!_this.props.showLoginForm) {
        return null;
      }

      return _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement("form", {
        onSubmit: _this.submitLoginForm
      }, _react.default.createElement(_eui.EuiFormRow, {
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.login.basicLoginForm.usernameFormRowLabel",
          defaultMessage: "Username"
        })
      }, _react.default.createElement(_eui.EuiFieldText, {
        id: "username",
        name: "username",
        "data-test-subj": "loginUsername",
        value: _this.state.username,
        onChange: _this.onUsernameChange,
        disabled: !_this.isLoadingState(LoadingStateType.None),
        isInvalid: false,
        "aria-required": true,
        inputRef: _this.setUsernameInputRef
      })), _react.default.createElement(_eui.EuiFormRow, {
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.login.basicLoginForm.passwordFormRowLabel",
          defaultMessage: "Password"
        })
      }, _react.default.createElement(_eui.EuiFieldText, {
        autoComplete: "off",
        id: "password",
        name: "password",
        "data-test-subj": "loginPassword",
        type: "password",
        value: _this.state.password,
        onChange: _this.onPasswordChange,
        disabled: !_this.isLoadingState(LoadingStateType.None),
        isInvalid: false,
        "aria-required": true
      })), _react.default.createElement(_eui.EuiButton, {
        fill: true,
        type: "submit",
        color: "primary",
        onClick: _this.submitLoginForm,
        isDisabled: !_this.isLoadingState(LoadingStateType.None),
        isLoading: _this.isLoadingState(LoadingStateType.Form),
        "data-test-subj": "loginSubmit"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.login.basicLoginForm.logInButtonLabel",
        defaultMessage: "Log in"
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "renderLoginAssistanceMessage", function () {
      if (!_this.props.loginAssistanceMessage) {
        return null;
      }

      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement(_reactMarkdown.default, null, _this.props.loginAssistanceMessage)));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMessage", function () {
      var message = _this.state.message;

      if (message.type === MessageType.Danger) {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
          size: "s",
          color: "danger",
          "data-test-subj": "loginErrorMessage",
          title: message.content,
          role: "alert"
        }), _react.default.createElement(_eui.EuiSpacer, {
          size: "l"
        }));
      }

      if (message.type === MessageType.Info) {
        return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
          size: "s",
          color: "primary",
          "data-test-subj": "loginInfoMessage",
          title: message.content,
          role: "status"
        }), _react.default.createElement(_eui.EuiSpacer, {
          size: "l"
        }));
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelector", function () {
      var showLoginSelector = _this.props.selector.enabled && _this.props.selector.providers.length > 0;

      if (!showLoginSelector) {
        return null;
      }

      var loginSelectorAndLoginFormSeparator = showLoginSelector && _this.props.showLoginForm && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiText, {
        textAlign: "center",
        color: "subdued"
      }, "\u2015\u2015\u2015\xA0\xA0", _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.loginPage.loginSelectorOR",
        defaultMessage: "OR"
      }), "\xA0\xA0\u2015\u2015\u2015"), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }));

      return _react.default.createElement(_react.default.Fragment, null, _this.props.selector.providers.map(function (provider, index) {
        var _provider$description;

        return _react.default.createElement(_react.Fragment, {
          key: index
        }, _react.default.createElement(_eui.EuiButton, {
          key: provider.name,
          fullWidth: true,
          isDisabled: !_this.isLoadingState(LoadingStateType.None),
          isLoading: _this.isLoadingState(LoadingStateType.Selector, provider.name),
          onClick: function onClick() {
            return _this.loginWithSelector(provider.type, provider.name);
          }
        }, (_provider$description = provider.description) !== null && _provider$description !== void 0 ? _provider$description : _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.loginPage.loginProviderDescription",
          defaultMessage: "Login with {providerType}/{providerName}",
          values: {
            providerType: provider.type,
            providerName: provider.name
          }
        })), _react.default.createElement(_eui.EuiSpacer, {
          size: "m"
        }));
      }), loginSelectorAndLoginFormSeparator);
    });

    _defineProperty(_assertThisInitialized(_this), "isFormValid", function () {
      var _this$state = _this.state,
          username = _this$state.username,
          password = _this$state.password;
      return username && password;
    });

    _defineProperty(_assertThisInitialized(_this), "onUsernameChange", function (e) {
      _this.setState({
        username: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPasswordChange", function (e) {
      _this.setState({
        password: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "submitLoginForm",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(e) {
        var http, _this$state2, username, password, _response, message;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();

                if (_this.isFormValid()) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                _this.setState({
                  loadingState: {
                    type: LoadingStateType.Form
                  },
                  message: {
                    type: MessageType.None
                  }
                });

                http = _this.props.http;
                _this$state2 = _this.state, username = _this$state2.username, password = _this$state2.password;
                _context.prev = 6;
                _context.next = 9;
                return http.post('/internal/security/login', {
                  body: JSON.stringify({
                    username: username,
                    password: password
                  })
                });

              case 9:
                window.location.href = (0, _parse_next.parseNext)(window.location.href, http.basePath.serverBasePath);
                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](6);
                message = ((_response = _context.t0.response) === null || _response === void 0 ? void 0 : _response.status) === 401 ? _i18n.i18n.translate('xpack.security.login.basicLoginForm.invalidUsernameOrPasswordErrorMessage', {
                  defaultMessage: 'Invalid username or password. Please try again.'
                }) : _i18n.i18n.translate('xpack.security.login.basicLoginForm.unknownErrorMessage', {
                  defaultMessage: 'Oops! Error. Try again.'
                });

                _this.setState({
                  message: {
                    type: MessageType.Danger,
                    content: message
                  },
                  loadingState: {
                    type: LoadingStateType.None
                  }
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 12]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "loginWithSelector",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(providerType, providerName) {
        var _ref3, location;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.setState({
                  loadingState: {
                    type: LoadingStateType.Selector,
                    providerName: providerName
                  },
                  message: {
                    type: MessageType.None
                  }
                });

                _context2.prev = 1;
                _context2.next = 4;
                return _this.props.http.post('/internal/security/login_with', {
                  body: JSON.stringify({
                    providerType: providerType,
                    providerName: providerName,
                    currentURL: window.location.href
                  })
                });

              case 4:
                _ref3 = _context2.sent;
                location = _ref3.location;
                window.location.href = location;
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);

                _this.props.notifications.toasts.addError(_context2.t0, {
                  title: _i18n.i18n.translate('xpack.security.loginPage.loginSelectorErrorMessage', {
                    defaultMessage: 'Could not perform login.'
                  })
                });

                _this.setState({
                  loadingState: {
                    type: LoadingStateType.None
                  }
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }());

    return _this;
  }

  _createClass(LoginForm, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.Fragment, null, this.renderLoginAssistanceMessage(), this.renderMessage(), this.renderSelector(), this.renderLoginForm());
    }
  }, {
    key: "setUsernameInputRef",
    value: function setUsernameInputRef(ref) {
      if (ref) {
        ref.focus();
      }
    }
  }, {
    key: "isLoadingState",
    value: function isLoadingState(type, providerName) {
      var loadingState = this.state.loadingState;

      if (loadingState.type !== type) {
        return false;
      }

      return loadingState.type !== LoadingStateType.Selector || loadingState.providerName === providerName;
    }
  }]);

  return LoginForm;
}(_react.Component);

exports.LoginForm = LoginForm;