"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundToDecimalPlace = roundToDecimalPlace;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function roundToDecimalPlace(num) {
  var dp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (num % 1 === 0) {
    // no decimal place
    return num;
  }

  if (Math.abs(num) < Math.pow(10, -dp)) {
    return Number.parseFloat(String(num)).toExponential(2);
  }

  var m = Math.pow(10, dp);
  return Math.round(num * m) / m;
}