"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEligibleTypes = getEligibleTypes;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getEligibleTypes({
  types,
  schema
}) {
  return types.filter(type => !schema.isNamespaceAgnostic(type));
}