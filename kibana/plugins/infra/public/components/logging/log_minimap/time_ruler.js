"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeRuler = void 0;

var _d3Scale = require("d3-scale");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _time_label_formatter = require("./time_label_formatter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  stroke: ", ";\n  stroke-opacity: 0.5;\n  stroke-width: 1px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 9px;\n  line-height: ", ";\n  fill: ", ";\n  user-select: none;\n  pointer-events: none;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TimeRuler = function TimeRuler(_ref) {
  var end = _ref.end,
      height = _ref.height,
      start = _ref.start,
      tickCount = _ref.tickCount,
      width = _ref.width;
  var yScale = (0, _d3Scale.scaleTime)().domain([start, end]).range([0, height]);
  var ticks = yScale.ticks(tickCount);
  var formatTick = yScale.tickFormat(tickCount, (0, _time_label_formatter.getTimeLabelFormat)(start, end));
  return React.createElement("g", null, ticks.map(function (tick, tickIndex) {
    var y = yScale(tick);
    return React.createElement("g", {
      key: "tick".concat(tickIndex)
    }, React.createElement(TimeRulerTickLabel, {
      x: 0,
      y: y - 4
    }, formatTick(tick)), React.createElement(TimeRulerGridLine, {
      x1: 0,
      y1: y,
      x2: width,
      y2: y
    }));
  }));
};

exports.TimeRuler = TimeRuler;
TimeRuler.displayName = 'TimeRuler';

var TimeRulerTickLabel = _public.euiStyled.text(_templateObject(), function (props) {
  return props.theme.eui.euiLineHeight;
}, function (props) {
  return props.theme.eui.textColors.subdued;
});

var TimeRulerGridLine = _public.euiStyled.line(_templateObject2(), function (props) {
  return props.theme.darkMode ? props.theme.eui.euiColorDarkestShade : props.theme.eui.euiColorDarkShade;
});