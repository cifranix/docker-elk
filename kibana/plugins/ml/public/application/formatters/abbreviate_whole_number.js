"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abbreviateWholeNumber = abbreviateWholeNumber;

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Formatter to abbreviate large whole numbers with metric prefixes.
 * Uses numeral.js to format numbers longer than the specified number of
 * digits with metric abbreviations e.g. 12345 as 12k, or 98000000 as 98m.
 */
function abbreviateWholeNumber(value) {
  var maxDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

  if (Math.abs(value) < Math.pow(10, maxDigits)) {
    return value;
  } else {
    return (0, _numeral.default)(value).format('0a');
  }
}