"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateDomain = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getMin = function getMin(values) {
  var minValue = (0, _lodash.min)(values);
  return (0, _lodash.isNumber)(minValue) && Number.isFinite(minValue) ? minValue : undefined;
};

var getMax = function getMax(values) {
  var maxValue = (0, _lodash.max)(values);
  return (0, _lodash.isNumber)(maxValue) && Number.isFinite(maxValue) ? maxValue : undefined;
};

var calculateDomain = function calculateDomain(series, metrics) {
  var stacked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var values = series.rows.reduce(function (acc, row) {
    var rowValues = metrics.map(function (m, index) {
      return row["metric_".concat(index)] || null;
    }).filter(function (v) {
      return (0, _lodash.isNumber)(v);
    });
    var minValue = getMin(rowValues); // For stacked domains we want to add 10% head room so the charts have
    // enough room to draw the 2 pixel line as well.

    var maxValue = stacked ? (0, _lodash.sum)(rowValues) * 1.1 : getMax(rowValues);
    return acc.concat([minValue || null, maxValue || null]);
  }, []).filter(function (v) {
    return (0, _lodash.isNumber)(v);
  });
  return {
    min: getMin(values) || 0,
    max: getMax(values) || 0
  };
};

exports.calculateDomain = calculateDomain;