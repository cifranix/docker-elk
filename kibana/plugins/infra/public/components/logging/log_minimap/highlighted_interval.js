"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HighlightedInterval = void 0;

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  fill: ", ";\n  fill-opacity: 0.3;\n  stroke: ", ";\n  stroke-width: 1;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  stroke: ", ";\n  stroke-width: 1;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var HighlightedInterval = function HighlightedInterval(_ref) {
  var className = _ref.className,
      end = _ref.end,
      getPositionOfTime = _ref.getPositionOfTime,
      start = _ref.start,
      targetWidth = _ref.targetWidth,
      width = _ref.width,
      target = _ref.target;
  var yStart = getPositionOfTime(start);
  var yEnd = getPositionOfTime(end);
  var yTarget = target && getPositionOfTime(target);
  return React.createElement(React.Fragment, null, yTarget && React.createElement(HighlightTargetMarker, {
    className: className,
    x1: 0,
    x2: targetWidth,
    y1: yTarget,
    y2: yTarget
  }), React.createElement(HighlightPolygon, {
    className: className,
    points: " ".concat(targetWidth, ",").concat(yStart, " ").concat(width, ",").concat(yStart, " ").concat(width, ",").concat(yEnd, "  ").concat(targetWidth, ",").concat(yEnd)
  }));
};

exports.HighlightedInterval = HighlightedInterval;
HighlightedInterval.displayName = 'HighlightedInterval';

var HighlightTargetMarker = _public.euiStyled.line(_templateObject(), function (props) {
  return props.theme.eui.euiColorPrimary;
});

var HighlightPolygon = _public.euiStyled.polygon(_templateObject2(), function (props) {
  return props.theme.eui.euiColorPrimary;
}, function (props) {
  return props.theme.eui.euiColorPrimary;
});