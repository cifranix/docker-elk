"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChartType = exports.getChartColor = exports.getChartName = exports.getMaxMinTimestamp = exports.seriesHasLessThen2DataPoints = exports.getFormatter = void 0;

var _color = _interopRequireDefault(require("color"));

var _lodash = require("lodash");

var _formatters = require("../../../utils/formatters");

var _types = require("../../../../common/inventory_models/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Returns a formatter
 */
var getFormatter = function getFormatter() {
  var formatter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'number';
  var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{{value}}';
  return function (val) {
    return val != null ? (0, _formatters.createFormatter)(formatter, template)(val) : '';
  };
};
/**
 * Does a series have more then two points?
 */


exports.getFormatter = getFormatter;

var seriesHasLessThen2DataPoints = function seriesHasLessThen2DataPoints(series) {
  return series.data.length < 2;
};
/**
 * Returns the minimum and maximum timestamp for a metric
 */


exports.seriesHasLessThen2DataPoints = seriesHasLessThen2DataPoints;

var getMaxMinTimestamp = function getMaxMinTimestamp(metric) {
  if (metric.series.some(seriesHasLessThen2DataPoints)) {
    return [0, 0];
  }

  var values = metric.series.reduce(function (acc, item) {
    var firstRow = (0, _lodash.first)(item.data);
    var lastRow = (0, _lodash.last)(item.data);
    return acc.concat([firstRow && firstRow.timestamp || 0, lastRow && lastRow.timestamp || 0]);
  }, []);
  return [(0, _lodash.min)(values), (0, _lodash.max)(values)];
};
/**
 * Returns the chart name from the visConfig based on the series id, otherwise it
 * just returns the seriesId
 */


exports.getMaxMinTimestamp = getMaxMinTimestamp;

var getChartName = function getChartName(seriesOverrides, seriesId, label) {
  if (!seriesOverrides) {
    return label;
  }

  return (0, _lodash.get)(seriesOverrides, [seriesId, 'name'], label);
};
/**
 * Returns the chart color from the visConfig based on the series id, otherwise it
 * just returns null if the color doesn't exists in the overrides.
 */


exports.getChartName = getChartName;

var getChartColor = function getChartColor(seriesOverrides, seriesId) {
  var rawColor = seriesOverrides ? (0, _lodash.get)(seriesOverrides, [seriesId, 'color']) : null;

  if (!rawColor) {
    return null;
  }

  var color = new _color.default(rawColor);
  return color.hex().toString();
};
/**
 * Gets the chart type based on the section and seriesId
 */


exports.getChartColor = getChartColor;

var getChartType = function getChartType(seriesOverrides, type, seriesId) {
  if (!seriesOverrides || !type) {
    return 'line';
  }

  var overrideValue = (0, _lodash.get)(seriesOverrides, [seriesId, 'type']);

  if (_types.InventoryVisTypeRT.is(overrideValue)) {
    return overrideValue;
  }

  if (_types.InventoryVisTypeRT.is(type)) {
    return type;
  }

  return 'line';
};

exports.getChartType = getChartType;