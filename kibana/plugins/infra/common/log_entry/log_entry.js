"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEqual = isEqual;
exports.isLess = isLess;
exports.isLessOrEqual = isLessOrEqual;
exports.isBetween = isBetween;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isEqual(time1, time2) {
  return time1.time === time2.time && time1.tiebreaker === time2.tiebreaker;
}

function isLess(time1, time2) {
  return time1.time < time2.time || time1.time === time2.time && time1.tiebreaker < time2.tiebreaker;
}

function isLessOrEqual(time1, time2) {
  return time1.time < time2.time || time1.time === time2.time && time1.tiebreaker <= time2.tiebreaker;
}

function isBetween(min, max, operand) {
  return isLessOrEqual(min, operand) && isLessOrEqual(operand, max);
}