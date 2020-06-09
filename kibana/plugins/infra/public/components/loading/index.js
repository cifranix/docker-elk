"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraLoadingStaticContentPanel = exports.InfraLoadingStaticPanel = exports.InfraLoadingPanel = void 0;

var _eui = require("@elastic/eui");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  flex: 0 0 auto;\n  align-self: center;\n  text-align: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n"]);

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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InfraLoadingPanel =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(InfraLoadingPanel, _React$PureComponent);

  function InfraLoadingPanel() {
    _classCallCheck(this, InfraLoadingPanel);

    return _possibleConstructorReturn(this, _getPrototypeOf(InfraLoadingPanel).apply(this, arguments));
  }

  _createClass(InfraLoadingPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          height = _this$props.height,
          text = _this$props.text,
          width = _this$props.width;
      return React.createElement(InfraLoadingStaticPanel, {
        style: {
          height: height,
          width: width
        }
      }, React.createElement(InfraLoadingStaticContentPanel, null, React.createElement(_eui.EuiPanel, null, React.createElement(_eui.EuiLoadingChart, {
        size: "m"
      }), React.createElement(_eui.EuiText, null, React.createElement("p", null, text)))));
    }
  }]);

  return InfraLoadingPanel;
}(React.PureComponent);

exports.InfraLoadingPanel = InfraLoadingPanel;

var InfraLoadingStaticPanel = _public.euiStyled.div(_templateObject());

exports.InfraLoadingStaticPanel = InfraLoadingStaticPanel;

var InfraLoadingStaticContentPanel = _public.euiStyled.div(_templateObject2());

exports.InfraLoadingStaticContentPanel = InfraLoadingStaticContentPanel;