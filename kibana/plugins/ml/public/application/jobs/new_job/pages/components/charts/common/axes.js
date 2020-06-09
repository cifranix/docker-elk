"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Axes = void 0;

var _react = _interopRequireWildcard(require("react"));

var _charts = require("@elastic/charts");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var dateFormatter = (0, _charts.timeFormatter)((0, _charts.niceTimeFormatByDay)(3));

// round to 2dp
function tickFormatter(d) {
  return (Math.round(d * 100) / 100).toString();
}

var Axes = function Axes(_ref) {
  var chartData = _ref.chartData;
  var yDomain = chartData !== undefined ? (0, _utils.getYRange)(chartData) : undefined;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_charts.Axis, {
    id: "bottom",
    position: _charts.Position.Bottom,
    showOverlappingTicks: true,
    tickFormat: dateFormatter
  }), _react.default.createElement(_charts.Axis, {
    id: "left",
    position: _charts.Position.Left,
    tickFormat: tickFormatter,
    domain: yDomain
  }));
};

exports.Axes = Axes;