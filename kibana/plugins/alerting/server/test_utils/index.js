"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvable = resolvable;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Creates a promise which can be resolved externally, useful for
 * coordinating async tests.
 */
function resolvable() {
  let resolve;
  const result = new Promise(r => {
    resolve = r;
  });

  result.resolve = arg => resolve(arg);

  return result;
}