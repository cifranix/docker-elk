"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockLogger = mockLogger;
exports.resolvable = resolvable;
exports.sleep = sleep;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * A handful of helper functions for testing the task manager.
 */
// Caching this here to avoid setTimeout mocking affecting our tests.
const nativeTimeout = setTimeout;
/**
 * Creates a mock task manager Logger.
 */

function mockLogger() {
  return {
    info: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
}

/**
 * Creates a promise which can be resolved externally, useful for
 * coordinating async tests.
 */
function resolvable() {
  let resolve;
  const result = new Promise(r => resolve = r);

  result.resolve = () => nativeTimeout(resolve, 0);

  return result;
}
/**
 * A simple helper for waiting a specified number of milliseconds.
 *
 * @param {number} ms
 */


async function sleep(ms) {
  return new Promise(r => nativeTimeout(r, ms));
}