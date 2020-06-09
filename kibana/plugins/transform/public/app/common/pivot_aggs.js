"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPivotAggsConfigWithUiSupport = isPivotAggsConfigWithUiSupport;
exports.isPivotAggsConfigPercentiles = isPivotAggsConfigPercentiles;
exports.getEsAggFromAggConfig = getEsAggFromAggConfig;
exports.pivotAggsFieldSupport = exports.PERCENTILES_AGG_DEFAULT_PERCENTS = exports.PIVOT_SUPPORTED_AGGS = void 0;

var _common = require("../../../../../../src/plugins/data/common");

var _pivotAggsFieldSuppor;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PIVOT_SUPPORTED_AGGS;
exports.PIVOT_SUPPORTED_AGGS = PIVOT_SUPPORTED_AGGS;

(function (PIVOT_SUPPORTED_AGGS) {
  PIVOT_SUPPORTED_AGGS["AVG"] = "avg";
  PIVOT_SUPPORTED_AGGS["CARDINALITY"] = "cardinality";
  PIVOT_SUPPORTED_AGGS["MAX"] = "max";
  PIVOT_SUPPORTED_AGGS["MIN"] = "min";
  PIVOT_SUPPORTED_AGGS["PERCENTILES"] = "percentiles";
  PIVOT_SUPPORTED_AGGS["SUM"] = "sum";
  PIVOT_SUPPORTED_AGGS["VALUE_COUNT"] = "value_count";
})(PIVOT_SUPPORTED_AGGS || (exports.PIVOT_SUPPORTED_AGGS = PIVOT_SUPPORTED_AGGS = {}));

var PERCENTILES_AGG_DEFAULT_PERCENTS = [1, 5, 25, 50, 75, 95, 99];
exports.PERCENTILES_AGG_DEFAULT_PERCENTS = PERCENTILES_AGG_DEFAULT_PERCENTS;
var pivotAggsFieldSupport = (_pivotAggsFieldSuppor = {}, _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.ATTACHMENT, [PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.BOOLEAN, [PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.DATE, [PIVOT_SUPPORTED_AGGS.MAX, PIVOT_SUPPORTED_AGGS.MIN, PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.GEO_POINT, [PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.GEO_SHAPE, [PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.IP, [PIVOT_SUPPORTED_AGGS.CARDINALITY, PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.MURMUR3, [PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.NUMBER, [PIVOT_SUPPORTED_AGGS.AVG, PIVOT_SUPPORTED_AGGS.CARDINALITY, PIVOT_SUPPORTED_AGGS.MAX, PIVOT_SUPPORTED_AGGS.MIN, PIVOT_SUPPORTED_AGGS.PERCENTILES, PIVOT_SUPPORTED_AGGS.SUM, PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.STRING, [PIVOT_SUPPORTED_AGGS.CARDINALITY, PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES._SOURCE, [PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.UNKNOWN, [PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _defineProperty(_pivotAggsFieldSuppor, _common.KBN_FIELD_TYPES.CONFLICT, [PIVOT_SUPPORTED_AGGS.VALUE_COUNT]), _pivotAggsFieldSuppor);
exports.pivotAggsFieldSupport = pivotAggsFieldSupport;

function isPivotAggsConfigWithUiSupport(arg) {
  return arg.hasOwnProperty('agg') && arg.hasOwnProperty('aggName') && arg.hasOwnProperty('dropDownName') && arg.hasOwnProperty('field') && Object.values(PIVOT_SUPPORTED_AGGS).includes(arg.agg);
}

function isPivotAggsConfigPercentiles(arg) {
  return arg.hasOwnProperty('agg') && arg.hasOwnProperty('field') && arg.hasOwnProperty('percents') && arg.agg === PIVOT_SUPPORTED_AGGS.PERCENTILES;
}

function getEsAggFromAggConfig(groupByConfig) {
  var esAgg = _objectSpread({}, groupByConfig);

  delete esAgg.agg;
  delete esAgg.aggName;
  delete esAgg.dropDownName;
  return _defineProperty({}, groupByConfig.agg, esAgg);
}