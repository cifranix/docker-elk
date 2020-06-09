"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApmTimeseriesData = getApmTimeseriesData;

var _get_bucket_size = require("../../../helpers/get_bucket_size");

var _fetcher = require("./fetcher");

var _transform = require("./transform");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getApmTimeseriesData(options) {
  const {
    start,
    end
  } = options.setup;
  const {
    bucketSize
  } = (0, _get_bucket_size.getBucketSize)(start, end, 'auto');
  const timeseriesResponse = await (0, _fetcher.timeseriesFetcher)(options);
  return (0, _transform.timeseriesTransformer)({
    timeseriesResponse,
    bucketSize
  });
}