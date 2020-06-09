"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangePasswordForm = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getInitialState() {
  return {
    shouldValidate: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    currentPasswordError: false,
    changeInProgress: false
  };
}

var ChangePasswordForm =
/*#__PURE__*/
function (_Component) {
  _inherits(ChangePasswordForm, _Component);

  function ChangePasswordForm(props) {
    var _this;

    _classCallCheck(this, ChangePasswordForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChangePasswordForm).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getForm", function () {
      return _react2.default.createElement(_eui.EuiForm, null, _this.props.isUserChangingOwnPassword && _react2.default.createElement(_eui.EuiFormRow, _extends({}, _this.validateCurrentPassword(), {
        fullWidth: true,
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.account.changePasswordForm.currentPasswordLabel",
          defaultMessage: "Current password"
        })
      }), _react2.default.createElement(_eui.EuiFieldText, {
        autoComplete: "off",
        "data-test-subj": "currentPassword",
        type: "password",
        value: _this.state.currentPassword,
        onChange: _this.onCurrentPasswordChange,
        disabled: _this.state.changeInProgress,
        fullWidth: true
      })), _react2.default.createElement(_eui.EuiFormRow, _extends({
        helpText: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.account.changePasswordForm.passwordRequirements",
          defaultMessage: "Use at least 6 characters."
        })
      }, _this.validateNewPassword(), {
        fullWidth: true,
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.account.changePasswordForm.newPasswordLabel",
          defaultMessage: "New password"
        })
      }), _react2.default.createElement(_eui.EuiFieldText, {
        autoComplete: "new-password",
        "data-test-subj": "newPassword",
        type: "password",
        value: _this.state.newPassword,
        onChange: _this.onNewPasswordChange,
        disabled: _this.state.changeInProgress,
        fullWidth: true
      })), _react2.default.createElement(_eui.EuiFormRow, _extends({}, _this.validateConfirmPassword(), {
        fullWidth: true,
        label: _react2.default.createElement(_react.FormattedMessage, {
          id: "xpack.security.account.changePasswordForm.confirmPasswordLabel",
          defaultMessage: "Confirm new password"
        })
      }), _react2.default.createElement(_eui.EuiFieldText, {
        autoComplete: "new-password",
        "data-test-subj": "confirmNewPassword",
        type: "password",
        value: _this.state.confirmPassword,
        onChange: _this.onConfirmPasswordChange,
        disabled: _this.state.changeInProgress,
        fullWidth: true
      })), _react2.default.createElement(_eui.EuiFormRow, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        responsive: false
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButton, {
        onClick: _this.onChangePasswordClick,
        fill: true,
        isLoading: _this.state.changeInProgress,
        "data-test-subj": "changePasswordButton"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.account.changePasswordForm.saveChangesButtonLabel",
        defaultMessage: "Change password"
      }))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiButtonEmpty, {
        onClick: _this.onCancelClick,
        isDisabled: _this.state.changeInProgress
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.account.changePasswordForm.cancelButtonLabel",
        defaultMessage: "Reset"
      }))))));
    });

    _defineProperty(_assertThisInitialized(_this), "onCurrentPasswordChange", function (e) {
      _this.setState({
        currentPassword: e.target.value,
        currentPasswordError: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onNewPasswordChange", function (e) {
      _this.setState({
        newPassword: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmPasswordChange", function (e) {
      _this.setState({
        confirmPassword: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelClick", function () {
      _this.setState(getInitialState());
    });

    _defineProperty(_assertThisInitialized(_this), "onChangePasswordClick",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                shouldValidate: true,
                currentPasswordError: false
              }, function () {
                var _this$validateForm = _this.validateForm(),
                    isInvalid = _this$validateForm.isInvalid;

                if (isInvalid) {
                  return;
                }

                _this.setState({
                  changeInProgress: true
                }, function () {
                  return _this.performPasswordChange();
                });
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "validateCurrentPassword", function () {
      var shouldValidate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.shouldValidate;

      if (!shouldValidate || !_this.props.isUserChangingOwnPassword) {
        return {
          isInvalid: false
        };
      }

      if (_this.state.currentPasswordError) {
        return {
          isInvalid: true,
          error: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.account.changePasswordForm.invalidPassword",
            defaultMessage: "Current password is incorrect."
          })
        };
      }

      if (!_this.state.currentPassword) {
        return {
          isInvalid: true,
          error: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.account.currentPasswordRequired",
            defaultMessage: "Current password is required."
          })
        };
      }

      return {
        isInvalid: false
      };
    });

    _defineProperty(_assertThisInitialized(_this), "validateNewPassword", function () {
      var shouldValidate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.shouldValidate;
      var newPassword = _this.state.newPassword;
      var minPasswordLength = 6;

      if (shouldValidate && newPassword.length < minPasswordLength) {
        return {
          isInvalid: true,
          error: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.account.passwordLengthDescription",
            defaultMessage: "Password is too short."
          })
        };
      }

      return {
        isInvalid: false
      };
    });

    _defineProperty(_assertThisInitialized(_this), "validateConfirmPassword", function () {
      var shouldValidate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.shouldValidate;
      var _this$state = _this.state,
          newPassword = _this$state.newPassword,
          confirmPassword = _this$state.confirmPassword;

      if (shouldValidate && newPassword !== confirmPassword) {
        return {
          isInvalid: true,
          error: _react2.default.createElement(_react.FormattedMessage, {
            id: "xpack.security.account.passwordsDoNotMatch",
            defaultMessage: "Passwords do not match."
          })
        };
      }

      return {
        isInvalid: false
      };
    });

    _defineProperty(_assertThisInitialized(_this), "validateForm", function () {
      var validation = [_this.validateCurrentPassword(true), _this.validateNewPassword(true), _this.validateConfirmPassword(true)];
      var firstFailure = validation.find(function (result) {
        return result.isInvalid;
      });

      if (firstFailure) {
        return firstFailure;
      }

      return {
        isInvalid: false
      };
    });

    _defineProperty(_assertThisInitialized(_this), "performPasswordChange",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _this.props.userAPIClient.changePassword(_this.props.user.username, _this.state.newPassword, _this.state.currentPassword);

            case 3:
              _this.handleChangePasswordSuccess();

              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);

              _this.handleChangePasswordFailure(_context2.t0);

            case 9:
              _context2.prev = 9;

              _this.setState({
                changeInProgress: false
              });

              return _context2.finish(9);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6, 9, 12]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "handleChangePasswordSuccess", function () {
      _this.props.notifications.toasts.addSuccess({
        title: _i18n.i18n.translate('xpack.security.account.changePasswordSuccess', {
          defaultMessage: 'Your password has been changed.'
        }),
        'data-test-subj': 'passwordUpdateSuccess'
      });

      _this.setState({
        currentPasswordError: false,
        shouldValidate: false,
        newPassword: '',
        currentPassword: '',
        confirmPassword: ''
      });

      if (_this.props.onChangePassword) {
        _this.props.onChangePassword();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChangePasswordFailure", function (error) {
      if (error.body && error.body.statusCode === 403) {
        _this.setState({
          currentPasswordError: true
        });
      } else {
        _this.props.notifications.toasts.addDanger(_i18n.i18n.translate('xpack.security.management.users.editUser.settingPasswordErrorMessage', {
          defaultMessage: 'Error setting password: {message}',
          values: {
            message: _.get(error, 'body.message')
          }
        }));
      }
    });

    _this.state = getInitialState();
    return _this;
  }

  _createClass(ChangePasswordForm, [{
    key: "render",
    value: function render() {
      return this.getForm();
    }
  }]);

  return ChangePasswordForm;
}(_react2.Component);

exports.ChangePasswordForm = ChangePasswordForm;