"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callWithoutRepeats = callWithoutRepeats;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function callWithoutRepeats(func) {
  var isArgsEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _lodash.isEqual;
  var previousArgs;
  var previousResult;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!isArgsEqual(args, previousArgs)) {
      previousArgs = args;
      previousResult = func.apply(void 0, args);
    }

    return previousResult;
  };
}