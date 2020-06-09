"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMetricsDateHistogramParams = getMetricsDateHistogramParams;

var _get_bucket_size = require("./get_bucket_size");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getMetricsDateHistogramParams(start, end) {
  const {
    bucketSize
  } = (0, _get_bucket_size.getBucketSize)(start, end, 'auto');
  return {
    field: '@timestamp',
    // ensure minimum bucket size of 30s since this is the default resolution for metric data
    fixed_interval: `${Math.max(bucketSize, 30)}s`,
    min_doc_count: 0,
    extended_bounds: {
      min: start,
      max: end
    }
  };
}