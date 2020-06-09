"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toSpaceIdentifier = toSpaceIdentifier;
exports.isValidSpaceIdentifier = isValidSpaceIdentifier;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function toSpaceIdentifier() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return value.toLowerCase().replace(/[^a-z0-9_]/g, '-');
}

function isValidSpaceIdentifier() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return value === toSpaceIdentifier(value);
}