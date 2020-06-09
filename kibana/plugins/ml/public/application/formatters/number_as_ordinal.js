"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberAsOrdinal = numberAsOrdinal;

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore

/**
 * Formats the supplied number as ordinal e.g. 15 as 15th.
 * Formatting first converts the supplied number to an integer by flooring.
 * @param {number} value to format as an ordinal
 * @return {string} number formatted as an ordinal e.g. 15th
 */
function numberAsOrdinal(num) {
  var int = Math.floor(num);
  return "".concat((0, _numeral.default)(int).format('0o'));
}