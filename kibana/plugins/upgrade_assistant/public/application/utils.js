"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegExpString = void 0;

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var validateRegExpString = function validateRegExpString(s) {
  return (0, _pipeable.pipe)((0, _Either.tryCatch)(function () {
    return new RegExp(s);
  }, function (e) {
    return e.message;
  }), (0, _Either.fold)(function (errorMessage) {
    return errorMessage;
  }, function () {
    return '';
  }));
};

exports.validateRegExpString = validateRegExpString;