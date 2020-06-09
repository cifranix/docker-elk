"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizeOfSquares = sizeOfSquares;
exports.MIN_SIZE = exports.MAX_SIZE = exports.SCALE_FACTOR = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SCALE_FACTOR = 0.55;
exports.SCALE_FACTOR = SCALE_FACTOR;
var MAX_SIZE = Infinity;
exports.MAX_SIZE = MAX_SIZE;
var MIN_SIZE = 24;
exports.MIN_SIZE = MIN_SIZE;

function sizeOfSquares(width, height, totalItems) {
  var levels = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var levelFactor = levels > 1 ? levels * 0.7 : 1;
  var scale = SCALE_FACTOR / levelFactor;
  var x = width * scale;
  var y = height * scale;
  var possibleX = Math.ceil(Math.sqrt(totalItems * x / y));
  var newX;
  var newY;

  if (Math.floor(possibleX * y / x) * possibleX < totalItems) {
    newX = y / Math.ceil(possibleX * y / x);
  } else {
    newX = x / possibleX;
  }

  var possibleY = Math.ceil(Math.sqrt(totalItems * y / x));

  if (Math.floor(possibleY * x / y) * possibleY < totalItems) {
    // does not fit
    newY = x / Math.ceil(x * possibleY / y);
  } else {
    newY = y / possibleY;
  }

  var size = Math.max(newX, newY);
  return Math.min(Math.max(size, MIN_SIZE), MAX_SIZE);
}