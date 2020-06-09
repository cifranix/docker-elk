"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateMathFormat = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDateMathFormat = function getDateMathFormat(timeUnit, timeValue) {
  var now = 'now';

  if (timeValue === 0) {
    return now;
  }

  return "".concat(now, "+").concat(timeValue).concat(timeUnit);
};

exports.getDateMathFormat = getDateMathFormat;