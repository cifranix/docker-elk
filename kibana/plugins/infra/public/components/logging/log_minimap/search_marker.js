"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchMarker = void 0;

var _react = require("@kbn/i18n/react");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _search_marker_tooltip = require("./search_marker_tooltip");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  fill: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  fill: ", ";\n  opacity: 0;\n  transition: opacity ", " ease-in;\n  cursor: pointer;\n\n  ", ":hover & {\n    opacity: 0.3;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  animation: ", " ", " ease-in both;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"]);

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

var SearchMarker =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SearchMarker, _React$PureComponent);

  function SearchMarker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchMarker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchMarker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hoveredPosition: null
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (evt) {
      evt.stopPropagation();

      _this.props.jumpToTarget(_this.props.bucket.representativeKey);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function (evt) {
      _this.setState({
        hoveredPosition: evt.currentTarget.getBoundingClientRect()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      _this.setState({
        hoveredPosition: null
      });
    });

    return _this;
  }

  _createClass(SearchMarker, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          bucket = _this$props.bucket,
          height = _this$props.height,
          width = _this$props.width;
      var hoveredPosition = this.state.hoveredPosition;
      var bulge = bucket.entriesCount > 1 ? React.createElement(SearchMarkerForegroundRect, {
        x: "-2",
        y: "-2",
        width: "4",
        height: height + 2,
        rx: "2",
        ry: "2"
      }) : React.createElement(React.Fragment, null, React.createElement(SearchMarkerForegroundRect, {
        x: "-1",
        y: "0",
        width: "2",
        height: height
      }), React.createElement(SearchMarkerForegroundRect, {
        x: "-2",
        y: height / 2 - 2,
        width: "4",
        height: "4",
        rx: "2",
        ry: "2"
      }));
      return React.createElement(React.Fragment, null, hoveredPosition ? React.createElement(_search_marker_tooltip.SearchMarkerTooltip, {
        markerPosition: hoveredPosition
      }, React.createElement(_react.FormattedMessage, {
        id: "xpack.infra.logs.searchResultTooltip",
        defaultMessage: "{bucketCount, plural, one {# highlighted entry} other {# highlighted entries}}",
        values: {
          bucketCount: bucket.entriesCount
        }
      })) : null, React.createElement(SearchMarkerGroup, {
        onClick: this.handleClick,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, React.createElement(SearchMarkerBackgroundRect, {
        x: "0",
        y: "0",
        width: width,
        height: height
      }), bulge));
    }
  }]);

  return SearchMarker;
}(React.PureComponent);

exports.SearchMarker = SearchMarker;
var fadeInAnimation = (0, _public.keyframes)(_templateObject());

var SearchMarkerGroup = _public.euiStyled.g(_templateObject2(), fadeInAnimation, function (props) {
  return props.theme.eui.euiAnimSpeedExtraSlow;
});

var SearchMarkerBackgroundRect = _public.euiStyled.rect(_templateObject3(), function (props) {
  return props.theme.eui.euiColorAccent;
}, function (props) {
  return props.theme.eui.euiAnimSpeedNormal;
}, SearchMarkerGroup);

var SearchMarkerForegroundRect = _public.euiStyled.rect(_templateObject4(), function (props) {
  return props.theme.eui.euiColorAccent;
});