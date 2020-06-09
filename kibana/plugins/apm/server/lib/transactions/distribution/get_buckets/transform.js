"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bucketTransformer = bucketTransformer;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getBucket(bucket) {
  const samples = bucket.samples.items.hits.hits.map(({
    _source
  }) => ({
    traceId: _source.trace.id,
    transactionId: _source.transaction.id
  }));
  return {
    key: bucket.key,
    count: bucket.doc_count,
    samples
  };
}

function bucketTransformer(response) {
  var _response$aggregation;

  const buckets = ((_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : _response$aggregation.distribution.buckets.map(getBucket)) || [];
  return {
    noHits: response.hits.total.value === 0,
    buckets
  };
}