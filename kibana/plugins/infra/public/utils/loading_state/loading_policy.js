"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIntervalLoadingPolicy = exports.isManualLoadingPolicy = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isManualLoadingPolicy = function isManualLoadingPolicy(loadingPolicy) {
  return loadingPolicy.policy === 'manual';
};

exports.isManualLoadingPolicy = isManualLoadingPolicy;

var isIntervalLoadingPolicy = function isIntervalLoadingPolicy(loadingPolicy) {
  return loadingPolicy.policy === 'interval';
};

exports.isIntervalLoadingPolicy = isIntervalLoadingPolicy;