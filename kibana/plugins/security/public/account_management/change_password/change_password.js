"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangePassword = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _model = require("../../../common/model");

var _change_password_form = require("../../management/users/components/change_password_form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ChangePassword =
/*#__PURE__*/
function (_Component) {
  _inherits(ChangePassword, _Component);

  function ChangePassword() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ChangePassword);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChangePassword)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getChangePasswordForm", function (changePasswordTitle) {
      return _react.default.createElement(_eui.EuiDescribedFormGroup, {
        fullWidth: true,
        title: _react.default.createElement("h2", null, changePasswordTitle),
        description: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.account.changePasswordDescription",
          defaultMessage: "Change the password for your account."
        }))
      }, _react.default.createElement(_change_password_form.ChangePasswordForm, {
        user: _this.props.user,
        isUserChangingOwnPassword: true,
        userAPIClient: _this.props.userAPIClient,
        notifications: _this.props.notifications
      }));
    });

    return _this;
  }

  _createClass(ChangePassword, [{
    key: "render",
    value: function render() {
      var canChangePassword = (0, _model.canUserChangePassword)(this.props.user);

      var changePasswordTitle = _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.account.changePasswordTitle",
        defaultMessage: "Password"
      });

      if (canChangePassword) {
        return this.getChangePasswordForm(changePasswordTitle);
      }

      return this.getChangePasswordUnavailable(changePasswordTitle);
    }
  }, {
    key: "getChangePasswordUnavailable",
    value: function getChangePasswordUnavailable(changePasswordTitle) {
      return _react.default.createElement(_eui.EuiDescribedFormGroup, {
        fullWidth: true,
        title: _react.default.createElement("h3", null, changePasswordTitle),
        description: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.account.changePasswordNotSupportedText",
          defaultMessage: "You cannot change the password for this account."
        }))
      }, _react.default.createElement("div", null));
    }
  }]);

  return ChangePassword;
}(_react.Component);

exports.ChangePassword = ChangePassword;