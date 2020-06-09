"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorRangeLegend = void 0;

var _react = _interopRequireWildcard(require("react"));

var _d = _interopRequireDefault(require("d3"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var COLOR_RANGE_RESOLUTION = 10;

/**
 * Component to render a legend for color ranges to be used for color coding
 * table cells and visualizations.
 *
 * This current version supports normalized value ranges (0-1) only.
 *
 * @param props ColorRangeLegendProps
 */
var ColorRangeLegend = function ColorRangeLegend(_ref) {
  var colorRange = _ref.colorRange,
      _ref$justifyTicks = _ref.justifyTicks,
      justifyTicks = _ref$justifyTicks === void 0 ? false : _ref$justifyTicks,
      _ref$showTicks = _ref.showTicks,
      showTicks = _ref$showTicks === void 0 ? true : _ref$showTicks,
      title = _ref.title,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 250 : _ref$width;
  var d3Container = (0, _react.useRef)(null);

  var scale = _d.default.range(COLOR_RANGE_RESOLUTION + 1).map(function (d) {
    return {
      offset: d / COLOR_RANGE_RESOLUTION * 100,
      stopColor: colorRange(d / COLOR_RANGE_RESOLUTION)
    };
  });

  (0, _react.useEffect)(function () {
    if (d3Container.current === null) {
      return;
    }

    var wrapperHeight = 32;
    var wrapperWidth = width; // top: 2        — adjust vertical alignment with title text
    // bottom: 20    — room for axis ticks and labels
    // left/right: 1 — room for first and last axis tick
    // when justifyTicks is enabled, the left margin is increased to not cut off the first tick label

    var margin = {
      top: 2,
      bottom: 20,
      left: justifyTicks || !showTicks ? 1 : 4,
      right: 1
    };
    var legendWidth = wrapperWidth - margin.left - margin.right;
    var legendHeight = wrapperHeight - margin.top - margin.bottom; // remove, then redraw the legend

    _d.default.select(d3Container.current).selectAll('*').remove();

    var wrapper = _d.default.select(d3Container.current).classed('mlColorRangeLegend', true).attr('width', wrapperWidth).attr('height', wrapperHeight).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // append gradient bar


    var gradient = wrapper.append('defs').append('linearGradient').attr('id', 'mlColorRangeGradient').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%').attr('spreadMethod', 'pad');
    scale.forEach(function (d) {
      gradient.append('stop').attr('offset', "".concat(d.offset, "%")).attr('stop-color', d.stopColor).attr('stop-opacity', 1);
    });
    wrapper.append('rect').attr('x1', 0).attr('y1', 0).attr('width', legendWidth).attr('height', legendHeight).style('fill', 'url(#mlColorRangeGradient)');

    var axisScale = _d.default.scale.linear().domain([0, 1]).range([0, legendWidth]); // Using this formatter ensures we get e.g. `0` and not `0.0`, but still `0.1`, `0.2` etc.


    var tickFormat = _d.default.format('');

    var legendAxis = _d.default.svg.axis().scale(axisScale).orient('bottom').tickFormat(tickFormat).tickSize(legendHeight + 4).ticks(legendWidth / 40);

    wrapper.append('g').attr('class', 'legend axis').attr('transform', 'translate(0, 0)').call(legendAxis); // Adjust the alignment of the first and last tick text
    // so that the tick labels don't overflow the color range.

    if (justifyTicks || !showTicks) {
      var text = wrapper.selectAll('text')[0];

      if (text.length > 1) {
        _d.default.select(text[0]).style('text-anchor', 'start');

        _d.default.select(text[text.length - 1]).style('text-anchor', 'end');
      }
    }

    if (!showTicks) {
      wrapper.selectAll('.axis line').style('display', 'none');
    }
  }, [JSON.stringify(scale), d3Container.current]);

  if (title === undefined) {
    return _react.default.createElement("svg", {
      ref: d3Container
    });
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement("strong", null, title))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("svg", {
    ref: d3Container
  })));
};

exports.ColorRangeLegend = ColorRangeLegend;