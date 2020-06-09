"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGroupByDateHistogram = isGroupByDateHistogram;
exports.isGroupByHistogram = isGroupByHistogram;
exports.isGroupByTerms = isGroupByTerms;
exports.isPivotGroupByConfigWithUiSupport = isPivotGroupByConfigWithUiSupport;
exports.getEsAggFromGroupByConfig = getEsAggFromGroupByConfig;
exports.dateHistogramIntervalFormatRegex = exports.histogramIntervalFormatRegex = exports.pivotGroupByFieldSupport = exports.PIVOT_SUPPORTED_GROUP_BY_AGGS = void 0;

var _common = require("../../../../../../src/plugins/data/common");

var _pivotGroupByFieldSup;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PIVOT_SUPPORTED_GROUP_BY_AGGS;
exports.PIVOT_SUPPORTED_GROUP_BY_AGGS = PIVOT_SUPPORTED_GROUP_BY_AGGS;

(function (PIVOT_SUPPORTED_GROUP_BY_AGGS) {
  PIVOT_SUPPORTED_GROUP_BY_AGGS["DATE_HISTOGRAM"] = "date_histogram";
  PIVOT_SUPPORTED_GROUP_BY_AGGS["HISTOGRAM"] = "histogram";
  PIVOT_SUPPORTED_GROUP_BY_AGGS["TERMS"] = "terms";
})(PIVOT_SUPPORTED_GROUP_BY_AGGS || (exports.PIVOT_SUPPORTED_GROUP_BY_AGGS = PIVOT_SUPPORTED_GROUP_BY_AGGS = {}));

var pivotGroupByFieldSupport = (_pivotGroupByFieldSup = {}, _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.ATTACHMENT, []), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.BOOLEAN, []), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.DATE, [PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM]), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.GEO_POINT, []), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.GEO_SHAPE, []), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.IP, [PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS]), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.MURMUR3, []), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.NUMBER, [PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM]), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.STRING, [PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS]), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES._SOURCE, []), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.UNKNOWN, []), _defineProperty(_pivotGroupByFieldSup, _common.KBN_FIELD_TYPES.CONFLICT, []), _pivotGroupByFieldSup);
exports.pivotGroupByFieldSupport = pivotGroupByFieldSupport;
// Don't allow an interval of '0', but allow a float interval of '0.1' with a leading zero.
var histogramIntervalFormatRegex = /^([1-9][0-9]*((\.)([0-9]+))?|([0](\.)([0-9]+)))$/; // Don't allow intervals of '0', don't allow floating intervals.

exports.histogramIntervalFormatRegex = histogramIntervalFormatRegex;
var dateHistogramIntervalFormatRegex = /^[1-9][0-9]*(ms|s|m|h|d|w|M|q|y)$/;
exports.dateHistogramIntervalFormatRegex = dateHistogramIntervalFormatRegex;

function isGroupByDateHistogram(arg) {
  return arg.hasOwnProperty('agg') && arg.hasOwnProperty('field') && arg.hasOwnProperty('calendar_interval') && arg.agg === PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM;
}

function isGroupByHistogram(arg) {
  return arg.hasOwnProperty('agg') && arg.hasOwnProperty('field') && arg.hasOwnProperty('interval') && arg.agg === PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM;
}

function isGroupByTerms(arg) {
  return arg.hasOwnProperty('agg') && arg.hasOwnProperty('field') && arg.agg === PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS;
}

function isPivotGroupByConfigWithUiSupport(arg) {
  return isGroupByDateHistogram(arg) || isGroupByHistogram(arg) || isGroupByTerms(arg);
}

function getEsAggFromGroupByConfig(groupByConfig) {
  var esAgg = _objectSpread({}, groupByConfig);

  delete esAgg.agg;
  delete esAgg.aggName;
  delete esAgg.dropDownName;
  return _defineProperty({}, groupByConfig.agg, esAgg);
}