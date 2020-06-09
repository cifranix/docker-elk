"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kibanaConfigMock = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var kibanaConfigMock = {
  get: function get(key) {
    return {};
  },
  has: function has(key) {
    return false;
  },
  set: function set(key, value) {}
};
exports.kibanaConfigMock = kibanaConfigMock;