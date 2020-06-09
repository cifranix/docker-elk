"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.amountAndUnitToObject = amountAndUnitToObject;
exports.amountAndUnitToString = amountAndUnitToString;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function amountAndUnitToObject(value) {
  // matches any postive and negative number and its unit.
  const [, amount = '', unit = ''] = value.match(/(^-?\d+)?(\w+)?/) || [];
  return {
    amount,
    unit
  };
}

function amountAndUnitToString({
  amount,
  unit
}) {
  return `${amount}${unit}`;
}