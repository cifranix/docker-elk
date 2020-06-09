"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogMinimap = void 0;

var _d3Scale = require("d3-scale");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _density_chart = require("./density_chart");

var _highlighted_interval = require("./highlighted_interval");

var _search_markers = require("./search_markers");

var _time_ruler = require("./time_ruler");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  fill: ", ";\n  & ", " {\n    visibility: hidden;\n  }\n  &:hover ", " {\n    visibility: visible;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  pointer-events: none;\n  stroke-width: 1px;\n  stroke: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  stroke: ", ";\n  stroke-width: 1px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Wide enough to fit "September"
var TIMERULER_WIDTH = 50;

function calculateYScale(start, end, height) {
  return (0, _d3Scale.scaleLinear)().domain([start || 0, end || 0]).range([0, height]);
}

var LogMinimap =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LogMinimap, _React$Component);

  function LogMinimap(props) {
    var _this;

    _classCallCheck(this, LogMinimap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LogMinimap).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      var minimapTop = event.currentTarget.getBoundingClientRect().top;
      var clickedYPosition = event.clientY - minimapTop;
      var clickedTime = Math.floor(_this.getYScale().invert(clickedYPosition));

      _this.props.jumpToTarget({
        tiebreaker: 0,
        time: clickedTime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getYScale", function () {
      var _this$props = _this.props,
          start = _this$props.start,
          end = _this$props.end,
          height = _this$props.height;
      return calculateYScale(start, end, height);
    });

    _defineProperty(_assertThisInitialized(_this), "getPositionOfTime", function (time) {
      return _this.getYScale()(time);
    });

    _defineProperty(_assertThisInitialized(_this), "updateTimeCursor", function (event) {
      var svgPosition = event.currentTarget.getBoundingClientRect();
      var timeCursorY = event.clientY - svgPosition.top;

      _this.setState({
        timeCursorY: timeCursorY
      });
    });

    _this.state = {
      timeCursorY: 0,
      target: props.target
    };
    return _this;
  }

  _createClass(LogMinimap, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          start = _this$props2.start,
          end = _this$props2.end,
          className = _this$props2.className,
          height = _this$props2.height,
          highlightedInterval = _this$props2.highlightedInterval,
          jumpToTarget = _this$props2.jumpToTarget,
          summaryBuckets = _this$props2.summaryBuckets,
          summaryHighlightBuckets = _this$props2.summaryHighlightBuckets,
          width = _this$props2.width;
      var _this$state = this.state,
          timeCursorY = _this$state.timeCursorY,
          target = _this$state.target;

      var _calculateYScale$doma = calculateYScale(start, end, height).domain(),
          _calculateYScale$doma2 = _slicedToArray(_calculateYScale$doma, 2),
          minTime = _calculateYScale$doma2[0],
          maxTime = _calculateYScale$doma2[1];

      var tickCount = height ? Math.floor(height / 50) : 12;
      return React.createElement(MinimapWrapper, {
        className: className,
        height: height,
        preserveAspectRatio: "none",
        viewBox: "0 0 ".concat(width, " ").concat(height),
        width: width,
        onClick: this.handleClick,
        onMouseMove: this.updateTimeCursor
      }, React.createElement(MinimapBorder, {
        x1: TIMERULER_WIDTH,
        x2: TIMERULER_WIDTH,
        y1: 0,
        y2: height
      }), React.createElement(_time_ruler.TimeRuler, {
        start: minTime,
        end: maxTime,
        width: TIMERULER_WIDTH,
        height: height,
        tickCount: tickCount
      }), React.createElement("g", {
        transform: "translate(".concat(TIMERULER_WIDTH, ", 0)")
      }, React.createElement(_density_chart.DensityChart, {
        buckets: summaryBuckets,
        start: minTime,
        end: maxTime,
        width: width - TIMERULER_WIDTH,
        height: height
      }), React.createElement(_search_markers.SearchMarkers, {
        buckets: summaryHighlightBuckets || [],
        start: minTime,
        end: maxTime,
        width: width - TIMERULER_WIDTH,
        height: height,
        jumpToTarget: jumpToTarget
      })), highlightedInterval ? React.createElement(_highlighted_interval.HighlightedInterval, {
        end: highlightedInterval.end,
        getPositionOfTime: this.getPositionOfTime,
        start: highlightedInterval.start,
        targetWidth: TIMERULER_WIDTH,
        width: width,
        target: target
      }) : null, React.createElement(TimeCursor, {
        x1: TIMERULER_WIDTH,
        x2: width,
        y1: timeCursorY,
        y2: timeCursorY
      }));
    }
  }]);

  return LogMinimap;
}(React.Component);

exports.LogMinimap = LogMinimap;

var MinimapBorder = _public.euiStyled.line(_templateObject(), function (props) {
  return props.theme.eui.euiColorMediumShade;
});

var TimeCursor = _public.euiStyled.line(_templateObject2(), function (props) {
  return props.theme.darkMode ? props.theme.eui.euiColorDarkestShade : props.theme.eui.euiColorDarkShade;
});

var MinimapWrapper = _public.euiStyled.svg(_templateObject3(), function (props) {
  return props.theme.eui.euiColorEmptyShade;
}, TimeCursor, TimeCursor);