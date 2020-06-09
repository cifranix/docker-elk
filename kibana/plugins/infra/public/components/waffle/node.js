"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Node = void 0;

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _conditional_tooltip = require("./conditional_tooltip");

var _public = require("../../../../observability/public");

var _color_from_value = require("./lib/color_from_value");

var _node_context_menu = require("./node_context_menu");

var _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  font-size: 0.7em;\n  margin-bottom: 0.7em;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  font-weight: bold;\n  font-size: 0.9em;\n  line-height: 1.2em;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  text-align: center;\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  flex: 1 0 auto;\n  color: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  line-height: 1.2em;\n  align-items: center;\n  align-content: center;\n  padding: 1em;\n  overflow: hidden;\n  flex-wrap: wrap;\n  width: 100%;\n  border: none;\n  &:focus {\n    outline: none !important;\n    border: ", " solid\n      ", ";\n    box-shadow: none;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 2px;\n  left: 0;\n  border-radius: 3px;\n  background-color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  bottom: 4px;\n  right: 4px;\n  background-color: ", ";\n  border-radius: 3px;\n  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);

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

var initialState = {
  isPopoverOpen: false
};
var Node = (_temp =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Node, _React$PureComponent);

  function Node() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Node);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Node)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", initialState);

    _defineProperty(_assertThisInitialized(_this), "togglePopover", function () {
      _this.setState(function (prevState) {
        return {
          isPopoverOpen: !prevState.isPopoverOpen
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      if (_this.state.isPopoverOpen) {
        _this.setState({
          isPopoverOpen: false
        });
      }
    });

    return _this;
  }

  _createClass(Node, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          nodeType = _this$props.nodeType,
          node = _this$props.node,
          options = _this$props.options,
          squareSize = _this$props.squareSize,
          bounds = _this$props.bounds,
          formatter = _this$props.formatter,
          currentTime = _this$props.currentTime;
      var isPopoverOpen = this.state.isPopoverOpen;
      var metric = node.metric;
      var valueMode = squareSize > 70;
      var ellipsisMode = squareSize > 30;
      var rawValue = metric && metric.value || 0;
      var color = (0, _color_from_value.colorFromValue)(options.legend, rawValue, bounds);
      var value = formatter(rawValue);

      var nodeAriaLabel = _i18n.i18n.translate('xpack.infra.node.ariaLabel', {
        defaultMessage: '{nodeName}, click to open menu',
        values: {
          nodeName: node.name
        }
      });

      return _react.default.createElement(_node_context_menu.NodeContextMenu, {
        node: node,
        nodeType: nodeType,
        isPopoverOpen: isPopoverOpen,
        closePopover: this.closePopover,
        options: options,
        currentTime: currentTime,
        popoverPosition: "downCenter"
      }, _react.default.createElement(_conditional_tooltip.ConditionalToolTip, {
        delay: "regular",
        hidden: isPopoverOpen,
        position: "top",
        content: "".concat(node.name, " | ").concat(value)
      }, _react.default.createElement(NodeContainer, {
        "data-test-subj": "nodeContainer",
        style: {
          width: squareSize || 0,
          height: squareSize || 0
        },
        onClick: this.togglePopover
      }, _react.default.createElement(SquareOuter, {
        color: color
      }, _react.default.createElement(SquareInner, {
        color: color
      }, valueMode ? _react.default.createElement(ValueInner, {
        "aria-label": nodeAriaLabel
      }, _react.default.createElement(Label, {
        color: color
      }, node.name), _react.default.createElement(Value, {
        color: color
      }, value)) : ellipsisMode && _react.default.createElement(ValueInner, {
        "aria-label": nodeAriaLabel
      }, _react.default.createElement(Label, {
        color: color
      }, "...")))))));
    }
  }]);

  return Node;
}(_react.default.PureComponent), _temp);
exports.Node = Node;

var NodeContainer = _public.euiStyled.div(_templateObject());

var SquareOuter = _public.euiStyled.div(_templateObject2(), function (props) {
  return (0, _polished.darken)(0.1, props.color);
});

var SquareInner = _public.euiStyled.div(_templateObject3(), function (props) {
  return props.color;
});

var ValueInner = _public.euiStyled.button(_templateObject4(), function (params) {
  return params.theme.eui.euiFocusRingSize;
}, function (params) {
  return params.theme.eui.euiFocusRingColor;
});

var SquareTextContent = _public.euiStyled.div(_templateObject5(), function (props) {
  return (0, _polished.readableColor)(props.color);
});

var Value = (0, _public.euiStyled)(SquareTextContent)(_templateObject6());
var Label = (0, _public.euiStyled)(SquareTextContent)(_templateObject7());