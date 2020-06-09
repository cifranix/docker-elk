"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuckets = getBuckets;

var _fetcher = require("./fetcher");

var _transform = require("./transform");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getBuckets(serviceName, transactionName, transactionType, transactionId, traceId, distributionMax, bucketSize, setup) {
  const response = await (0, _fetcher.bucketFetcher)(serviceName, transactionName, transactionType, transactionId, traceId, distributionMax, bucketSize, setup);
  return (0, _transform.bucketTransformer)(response);
}