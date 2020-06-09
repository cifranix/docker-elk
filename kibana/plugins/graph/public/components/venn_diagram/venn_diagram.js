"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VennDiagram = VennDiagram;

var _venn = require("venn.js");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
function getRadius(area) {
  return Math.sqrt(area / Math.PI);
}

function VennDiagram(_ref) {
  var leftValue = _ref.leftValue,
      rightValue = _ref.rightValue,
      overlap = _ref.overlap;
  var leftRadius = getRadius(leftValue);
  var rightRadius = getRadius(rightValue);
  var maxRadius = Math.max(leftRadius, rightRadius);
  var imageHeight = maxRadius * 2;
  var imageWidth = maxRadius * 4;
  var leftCenter = leftRadius;
  var rightCenter = leftCenter + (0, _venn.distanceFromIntersectArea)(leftRadius, rightRadius, overlap); // blank width is what's left after the right venn circle - it is used as padding

  var blankWidth = imageWidth - (rightCenter + rightRadius);
  var padding = blankWidth / 2;
  var viewBoxDims = "0 0 ".concat(imageWidth, " ").concat(imageHeight);
  return _react.default.createElement("div", null, _react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: 100,
    height: 60,
    viewBox: viewBoxDims
  }, _react.default.createElement("g", null, _react.default.createElement("circle", {
    cx: leftCenter + padding,
    cy: maxRadius,
    r: leftRadius,
    className: "gphVennDiagram__left"
  }), _react.default.createElement("circle", {
    cx: rightCenter + padding,
    cy: maxRadius,
    r: rightRadius,
    className: "gphVennDiagram__right"
  }))));
}