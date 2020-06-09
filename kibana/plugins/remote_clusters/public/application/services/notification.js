"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.fatalError = exports.toasts = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var toasts;
exports.toasts = toasts;
var fatalError;
exports.fatalError = fatalError;

function init(_toasts, _fatalError) {
  exports.toasts = toasts = _toasts;
  exports.fatalError = fatalError = _fatalError;
}