"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupName = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  flex: 0 0 auto;\n  border-left: 1px solid ", ";\n  padding: 6px 10px;\n  font-size: 0.85em;\n  font-weight: normal;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 1 auto;\n  padding: 6px 10px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border: 1px solid ", ";\n  background-color: ", ";\n  border-radius: 4px;\n  box-shadow: 0px 2px 0px 0px ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  text-align: center;\n  font-size: 16px;\n  margin-bottom: 5px;\n  top: 20px;\n  display: flex;\n  justify-content: center;\n  padding: 0 10px;\n"]);

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

var GroupName =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(GroupName, _React$PureComponent);

  function GroupName() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GroupName);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GroupName)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      event.preventDefault();
      var groupBy = _this.props.options.groupBy; // When groupBy is empty that means there is nothing todo so let's just do nothing.

      if (groupBy.length === 0) {
        return;
      }

      var currentPath = _this.props.isChild && groupBy.length > 1 ? groupBy[1] : groupBy[0];

      _this.props.onDrilldown("".concat(currentPath.field, ": \"").concat(_this.props.group.name, "\""));
    });

    return _this;
  }

  _createClass(GroupName, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          group = _this$props.group,
          isChild = _this$props.isChild;
      var linkStyle = {
        fontSize: isChild ? '0.85em' : '1em'
      };
      return _react.default.createElement(GroupNameContainer, null, _react.default.createElement(Inner, {
        isChild: isChild
      }, _react.default.createElement(Name, null, _react.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: group.name
      }, _react.default.createElement(_eui.EuiLink, {
        style: linkStyle,
        onClickCapture: this.handleClick
      }, group.name))), _react.default.createElement(Count, null, group.count)));
    }
  }]);

  return GroupName;
}(_react.default.PureComponent);

exports.GroupName = GroupName;

var GroupNameContainer = _public.euiStyled.div(_templateObject());

var Inner = _public.euiStyled.div(_templateObject2(), function (props) {
  return props.theme.eui.euiBorderColor;
}, function (props) {
  return props.isChild ? props.theme.eui.euiColorLightestShade : props.theme.eui.euiColorEmptyShade;
}, function (props) {
  return props.theme.eui.euiBorderColor;
});

var Name = _public.euiStyled.div(_templateObject3());

var Count = _public.euiStyled.div(_templateObject4(), function (props) {
  return props.theme.eui.euiBorderColor;
});