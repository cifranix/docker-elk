"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DensityChart = void 0;

var _d3Scale = require("d3-scale");

var _d3Shape = require("d3-shape");

var _lodash = require("lodash");

var React = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  fill: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fill: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var DensityChart = function DensityChart(_ref) {
  var buckets = _ref.buckets,
      start = _ref.start,
      end = _ref.end,
      width = _ref.width,
      height = _ref.height;

  if (start >= end || height <= 0 || width <= 0 || buckets.length <= 0) {
    return null;
  }

  var yScale = (0, _d3Scale.scaleTime)().domain([start, end]).range([0, height]);
  var xMax = (0, _lodash.max)(buckets.map(function (bucket) {
    return bucket.entriesCount;
  })) || 0;
  var xScale = (0, _d3Scale.scaleLinear)().domain([0, xMax]).range([0, width]);
  var path = (0, _d3Shape.area)().x0(xScale(0)).x1(function (bucket) {
    return xScale(bucket.entriesCount);
  }).y0(function (bucket) {
    return yScale(bucket.start);
  }).y1(function (bucket) {
    return yScale(bucket.end);
  }).curve(_d3Shape.curveMonotoneY);
  var firstBucket = buckets[0];
  var lastBucket = buckets[buckets.length - 1];
  var pathBuckets = [// Make sure the graph starts at the count of the first point
  {
    start: start,
    end: start,
    entriesCount: firstBucket.entriesCount
  }].concat(_toConsumableArray(buckets), [// Make sure the line ends at the height of the last point
  {
    start: lastBucket.end,
    end: lastBucket.end,
    entriesCount: lastBucket.entriesCount
  }, // If the last point is not at the end of the minimap, make sure it doesn't extend indefinitely and goes to 0
  {
    start: end,
    end: end,
    entriesCount: 0
  }]);
  var pathData = path(pathBuckets);
  return React.createElement("g", null, React.createElement(DensityChartPositiveBackground, {
    width: width,
    height: height
  }), React.createElement(PositiveAreaPath, {
    d: pathData || ''
  }));
};

exports.DensityChart = DensityChart;

var DensityChartPositiveBackground = _public.euiStyled.rect(_templateObject(), function (props) {
  return props.theme.darkMode ? props.theme.eui.euiColorLightShade : props.theme.eui.euiColorLightestShade;
});

var PositiveAreaPath = _public.euiStyled.path(_templateObject2(), function (props) {
  return props.theme.darkMode ? props.theme.eui.euiColorMediumShade : props.theme.eui.euiColorLightShade;
});