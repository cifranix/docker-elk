"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogCustomizationMenu = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  min-width: 200px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LogCustomizationMenu =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LogCustomizationMenu, _React$Component);

  function LogCustomizationMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LogCustomizationMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LogCustomizationMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isShown: false
    });

    _defineProperty(_assertThisInitialized(_this), "show", function () {
      _this.setState({
        isShown: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hide", function () {
      _this.setState({
        isShown: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleVisibility", function () {
      _this.setState(function (state) {
        return {
          isShown: !state.isShown
        };
      });
    });

    return _this;
  }

  _createClass(LogCustomizationMenu, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var isShown = this.state.isShown;
      var menuButton = React.createElement(_eui.EuiButtonEmpty, {
        color: "text",
        iconType: "eye",
        onClick: this.toggleVisibility,
        size: "xs"
      }, React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.customizeLogs.customizeButtonLabel",
        defaultMessage: "Customize"
      }));
      return React.createElement(_eui.EuiPopover, {
        id: "customizePopover",
        button: menuButton,
        closePopover: this.hide,
        isOpen: isShown,
        anchorPosition: "downRight",
        ownFocus: true
      }, React.createElement(CustomizationMenuContent, null, children));
    }
  }]);

  return LogCustomizationMenu;
}(React.Component);

exports.LogCustomizationMenu = LogCustomizationMenu;

var CustomizationMenuContent = _public.euiStyled.div(_templateObject());