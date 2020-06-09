"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeStateUpdaters = composeStateUpdaters;
exports.asChildFunctionRenderer = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var asChildFunctionRenderer = function asChildFunctionRenderer(hoc) {
  var _temp;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      onInitialize = _ref.onInitialize,
      onCleanup = _ref.onCleanup;

  return hoc((_temp =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ChildFunctionRenderer, _React$Component);

    function ChildFunctionRenderer() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ChildFunctionRenderer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChildFunctionRenderer)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "displayName", 'ChildFunctionRenderer');

      _defineProperty(_assertThisInitialized(_this), "getRendererArgs", function () {
        return (0, _lodash.omit)(_this.props, ['children', 'initializeOnMount', 'resetOnUnmount']);
      });

      return _this;
    }

    _createClass(ChildFunctionRenderer, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.initializeOnMount && onInitialize) {
          onInitialize(this.getRendererArgs());
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.resetOnUnmount && onCleanup) {
          onCleanup(this.getRendererArgs());
        }
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.children(this.getRendererArgs());
      }
    }]);

    return ChildFunctionRenderer;
  }(_react.default.Component), _temp));
};

exports.asChildFunctionRenderer = asChildFunctionRenderer;

function composeStateUpdaters() {
  for (var _len3 = arguments.length, updaters = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    updaters[_key3] = arguments[_key3];
  }

  return function (state, props) {
    return updaters.reduce(function (currentState, updater) {
      return updater(currentState, props) || currentState;
    }, state);
  };
}