"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorReporter = void 0;

var _Either = require("fp-ts/lib/Either");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var failure = function failure(validation) {
  return validation.map(function (e) {
    var path = [];
    var validationName = '';
    e.context.forEach(function (ctx, idx) {
      if (ctx.key) {
        path.push(ctx.key);
      }

      if (idx === e.context.length - 1) {
        validationName = ctx.type.name;
      }
    });
    var lastItemName = path[path.length - 1];
    return {
      path: path,
      message: 'Invalid value ' + JSON.stringify(e.value) + " supplied to ".concat(lastItemName, "(").concat(validationName, ")")
    };
  });
};

var empty = [];

var success = function success() {
  return empty;
};

var errorReporter = {
  report: (0, _Either.fold)(failure, success)
};
exports.errorReporter = errorReporter;