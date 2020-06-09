"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIsCloudEnabled = getIsCloudEnabled;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getIsCloudEnabled(cloudId) {
  return typeof cloudId === 'string';
}