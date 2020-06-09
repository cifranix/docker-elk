"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMlPrefix = getMlPrefix;
exports.getMlJobId = getMlJobId;
exports.getMlIndex = getMlIndex;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getMlPrefix(serviceName, transactionType) {
  const maybeTransactionType = transactionType ? `${transactionType}-` : '';
  return `${serviceName}-${maybeTransactionType}`.toLowerCase();
}

function getMlJobId(serviceName, transactionType) {
  return `${getMlPrefix(serviceName, transactionType)}high_mean_response_time`;
}

function getMlIndex(serviceName, transactionType) {
  return `.ml-anomalies-${getMlJobId(serviceName, transactionType)}`;
}