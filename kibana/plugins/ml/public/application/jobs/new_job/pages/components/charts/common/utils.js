"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYRange = getYRange;
exports.getXRange = getXRange;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getYRange(chartData) {
  if (chartData.length === 0) {
    return {
      min: 0,
      max: 0
    };
  }

  var max = Number.MIN_VALUE;
  var min = Number.MAX_VALUE;
  chartData.forEach(function (r) {
    max = Math.max(r.value, max);
    min = Math.min(r.value, min);
  });
  var padding = (max - min) * 0.1;
  max += padding;
  min -= padding;
  return {
    min: min,
    max: max
  };
}

function getXRange(lineChartData) {
  if (lineChartData.length === 0) {
    return {
      min: 0,
      max: 0
    };
  }

  return {
    min: lineChartData[0].time,
    max: lineChartData[lineChartData.length - 1].time
  };
}