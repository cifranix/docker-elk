"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateGradientColor = exports.calculateStepColor = exports.colorFromValue = void 0;

var _lodash = require("lodash");

var _polished = require("polished");

var _lib = require("../../../lib/lib");

var _type_guards = require("./type_guards");

var _OPERATOR_TO_FN;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OPERATOR_TO_FN = (_OPERATOR_TO_FN = {}, _defineProperty(_OPERATOR_TO_FN, _lib.InfraWaffleMapRuleOperator.eq, _lodash.eq), _defineProperty(_OPERATOR_TO_FN, _lib.InfraWaffleMapRuleOperator.lt, _lodash.lt), _defineProperty(_OPERATOR_TO_FN, _lib.InfraWaffleMapRuleOperator.lte, _lodash.lte), _defineProperty(_OPERATOR_TO_FN, _lib.InfraWaffleMapRuleOperator.gte, _lodash.gte), _defineProperty(_OPERATOR_TO_FN, _lib.InfraWaffleMapRuleOperator.gt, _lodash.gt), _OPERATOR_TO_FN);

var convertToRgbString = function convertToRgbString(color) {
  return (0, _polished.toColorString)((0, _polished.parseToRgb)(color));
};

var colorFromValue = function colorFromValue(legend, value, bounds) {
  var defaultColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'rgba(217, 217, 217, 1)';

  try {
    if ((0, _type_guards.isInfraWaffleMapStepLegend)(legend)) {
      return convertToRgbString(calculateStepColor(legend, value, defaultColor));
    }

    if ((0, _type_guards.isInfraWaffleMapGradientLegend)(legend)) {
      return convertToRgbString(calculateGradientColor(legend, value, bounds, defaultColor));
    }

    return defaultColor;
  } catch (error) {
    return defaultColor;
  }
};

exports.colorFromValue = colorFromValue;

var normalizeValue = function normalizeValue(min, max, value) {
  return (value - min) / (max - min);
};

var calculateStepColor = function calculateStepColor(legend, value) {
  var defaultColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'rgba(217, 217, 217, 1)';
  return (0, _lodash.sortBy)(legend.rules, 'sortBy').reduce(function (color, rule) {
    var operatorFn = OPERATOR_TO_FN[rule.operator];

    if (operatorFn(value, rule.value)) {
      return rule.color;
    }

    return color;
  }, defaultColor);
};

exports.calculateStepColor = calculateStepColor;

var calculateGradientColor = function calculateGradientColor(legend, value, bounds) {
  var defaultColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'rgba(0, 179, 164, 1)';

  if (legend.rules.length === 0) {
    return defaultColor;
  }

  if (legend.rules.length === 1) {
    return (0, _lodash.last)(legend.rules).color;
  }

  var min = bounds.min,
      max = bounds.max;
  var sortedRules = (0, _lodash.sortBy)(legend.rules, 'value');
  var normValue = normalizeValue(min, max, Number(value));
  var startRule = sortedRules.reduce(function (acc, rule) {
    if (rule.value <= normValue) {
      return rule;
    }

    return acc;
  }, (0, _lodash.first)(sortedRules));
  var endRule = sortedRules.filter(function (r) {
    return r !== startRule;
  }).find(function (r) {
    return r.value >= normValue;
  });

  if (!endRule) {
    return startRule.color;
  }

  var mixValue = normalizeValue(startRule.value, endRule.value, normValue);
  return (0, _polished.mix)(mixValue, endRule.color, startRule.color);
};

exports.calculateGradientColor = calculateGradientColor;