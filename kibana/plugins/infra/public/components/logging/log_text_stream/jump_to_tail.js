"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogTextStreamJumpToTail = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: 8px 16px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  min-height: ", ";\n  width: ", "px;\n  position: fixed;\n  bottom: 0;\n  background-color: ", ";\n"]);

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

var LogTextStreamJumpToTail =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(LogTextStreamJumpToTail, _React$PureComponent);

  function LogTextStreamJumpToTail() {
    _classCallCheck(this, LogTextStreamJumpToTail);

    return _possibleConstructorReturn(this, _getPrototypeOf(LogTextStreamJumpToTail).apply(this, arguments));
  }

  _createClass(LogTextStreamJumpToTail, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onClickJump = _this$props.onClickJump,
          width = _this$props.width;
      return React.createElement(JumpToTailWrapper, {
        width: width
      }, React.createElement(MessageWrapper, null, React.createElement(_eui.EuiText, {
        color: "subdued"
      }, React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.streamingNewEntriesText",
        defaultMessage: "Streaming new entries"
      }))), React.createElement(_eui.EuiButtonEmpty, {
        size: "xs",
        onClick: onClickJump,
        iconType: "arrowDown"
      }, React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.jumpToTailText",
        defaultMessage: "Jump to most recent entries"
      })));
    }
  }]);

  return LogTextStreamJumpToTail;
}(React.PureComponent);

exports.LogTextStreamJumpToTail = LogTextStreamJumpToTail;

var JumpToTailWrapper = _public.euiStyled.div(_templateObject(), function (props) {
  return props.theme.eui.euiSizeXXL;
}, function (props) {
  return props.width;
}, function (props) {
  return props.theme.eui.euiColorEmptyShade;
});

var MessageWrapper = _public.euiStyled.div(_templateObject2());