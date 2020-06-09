"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraWaffleMapDataFormat = exports.InfraFormatterType = exports.InfraWaffleMapRuleOperator = exports.InfraWaffleMapLegendMode = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: replace AxiosRequestConfig with something more defined
var InfraWaffleMapLegendMode;
exports.InfraWaffleMapLegendMode = InfraWaffleMapLegendMode;

(function (InfraWaffleMapLegendMode) {
  InfraWaffleMapLegendMode["step"] = "step";
  InfraWaffleMapLegendMode["gradient"] = "gradient";
})(InfraWaffleMapLegendMode || (exports.InfraWaffleMapLegendMode = InfraWaffleMapLegendMode = {}));

var InfraWaffleMapRuleOperator;
exports.InfraWaffleMapRuleOperator = InfraWaffleMapRuleOperator;

(function (InfraWaffleMapRuleOperator) {
  InfraWaffleMapRuleOperator["gt"] = "gt";
  InfraWaffleMapRuleOperator["gte"] = "gte";
  InfraWaffleMapRuleOperator["lt"] = "lt";
  InfraWaffleMapRuleOperator["lte"] = "lte";
  InfraWaffleMapRuleOperator["eq"] = "eq";
})(InfraWaffleMapRuleOperator || (exports.InfraWaffleMapRuleOperator = InfraWaffleMapRuleOperator = {}));

var InfraFormatterType;
exports.InfraFormatterType = InfraFormatterType;

(function (InfraFormatterType) {
  InfraFormatterType["number"] = "number";
  InfraFormatterType["abbreviatedNumber"] = "abbreviatedNumber";
  InfraFormatterType["bytes"] = "bytes";
  InfraFormatterType["bits"] = "bits";
  InfraFormatterType["percent"] = "percent";
})(InfraFormatterType || (exports.InfraFormatterType = InfraFormatterType = {}));

var InfraWaffleMapDataFormat;
exports.InfraWaffleMapDataFormat = InfraWaffleMapDataFormat;

(function (InfraWaffleMapDataFormat) {
  InfraWaffleMapDataFormat["bytesDecimal"] = "bytesDecimal";
  InfraWaffleMapDataFormat["bitsDecimal"] = "bitsDecimal";
  InfraWaffleMapDataFormat["abbreviatedNumber"] = "abbreviatedNumber";
})(InfraWaffleMapDataFormat || (exports.InfraWaffleMapDataFormat = InfraWaffleMapDataFormat = {}));