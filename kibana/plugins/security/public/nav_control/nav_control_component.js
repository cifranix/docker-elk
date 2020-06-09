"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityNavControl = void 0;

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

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

var SecurityNavControl =
/*#__PURE__*/
function (_Component) {
  _inherits(SecurityNavControl, _Component);

  function SecurityNavControl(props) {
    var _this;

    _classCallCheck(this, SecurityNavControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SecurityNavControl).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onMenuButtonClick", function () {
      if (!_this.state.authenticatedUser) {
        return;
      }

      _this.setState({
        isOpen: !_this.state.isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeMenu", function () {
      _this.setState({
        isOpen: false
      });
    });

    _this.state = {
      isOpen: false,
      authenticatedUser: null
    };
    props.user.then(function (authenticatedUser) {
      _this.setState({
        authenticatedUser: authenticatedUser
      });
    });
    return _this;
  }

  _createClass(SecurityNavControl, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          editProfileUrl = _this$props.editProfileUrl,
          logoutUrl = _this$props.logoutUrl;
      var authenticatedUser = this.state.authenticatedUser;
      var name = authenticatedUser && (authenticatedUser.full_name || authenticatedUser.username) || '';
      var buttonContents = authenticatedUser ? _react2.default.createElement(_eui.EuiAvatar, {
        name: name,
        size: "s"
      }) : _react2.default.createElement(_eui.EuiLoadingSpinner, {
        size: "m"
      });

      var button = _react2.default.createElement(_eui.EuiHeaderSectionItemButton, {
        "aria-controls": "headerUserMenu",
        "aria-expanded": this.state.isOpen,
        "aria-haspopup": "true",
        "aria-label": _i18n.i18n.translate('xpack.security.navControlComponent.accountMenuAriaLabel', {
          defaultMessage: 'Account menu'
        }),
        onClick: this.onMenuButtonClick,
        "data-test-subj": "userMenuButton"
      }, buttonContents);

      return _react2.default.createElement(_eui.EuiPopover, {
        id: "headerUserMenu",
        ownFocus: true,
        button: button,
        isOpen: this.state.isOpen,
        anchorPosition: "downRight",
        repositionOnScroll: true,
        closePopover: this.closeMenu,
        panelPaddingSize: "none"
      }, _react2.default.createElement("div", {
        style: {
          width: 320
        },
        "data-test-subj": "userMenu"
      }, _react2.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "m",
        className: "euiHeaderProfile",
        responsive: false
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiAvatar, {
        name: name,
        size: "xl"
      })), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("p", {
        className: "eui-textBreakWord"
      }, name)), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiFlexGroup, null, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiLink, {
        href: editProfileUrl,
        "data-test-subj": "profileLink"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.navControlComponent.editProfileLinkText",
        defaultMessage: "Edit profile"
      }))), _react2.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react2.default.createElement(_eui.EuiLink, {
        href: logoutUrl,
        "data-test-subj": "logoutLink"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.security.navControlComponent.logoutLinkText",
        defaultMessage: "Log out"
      }))))))))));
    }
  }]);

  return SecurityNavControl;
}(_react2.Component);

exports.SecurityNavControl = SecurityNavControl;