"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerStartSingleton = registerStartSingleton;
exports.npStart = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var npStart;
exports.npStart = npStart;

function registerStartSingleton(start) {
  exports.npStart = npStart = start;
}