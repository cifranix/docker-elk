"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeseriesTransformer = timeseriesTransformer;
exports.getTpmBuckets = getTpmBuckets;

var _lodash = require("lodash");

var _i18n = require("../../../../../common/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function timeseriesTransformer({
  timeseriesResponse,
  bucketSize
}) {
  const aggs = timeseriesResponse.aggregations;
  const overallAvgDuration = (aggs === null || aggs === void 0 ? void 0 : aggs.overall_avg_duration.value) || null;
  const responseTimeBuckets = (aggs === null || aggs === void 0 ? void 0 : aggs.response_times.buckets) || [];
  const {
    avg,
    p95,
    p99
  } = getResponseTime(responseTimeBuckets);
  const transactionResultBuckets = (aggs === null || aggs === void 0 ? void 0 : aggs.transaction_results.buckets) || [];
  const tpmBuckets = getTpmBuckets(transactionResultBuckets, bucketSize);
  return {
    responseTimes: {
      avg,
      p95,
      p99
    },
    tpmBuckets,
    overallAvgDuration
  };
}

function getTpmBuckets(transactionResultBuckets = [], bucketSize) {
  const buckets = transactionResultBuckets.map(({
    key: resultKey,
    timeseries
  }) => {
    const dataPoints = timeseries.buckets.map(bucket => {
      return {
        x: bucket.key,
        y: (0, _lodash.round)(bucket.doc_count * (60 / bucketSize), 1)
      };
    }); // Handle empty string result keys

    const key = resultKey === '' ? _i18n.NOT_AVAILABLE_LABEL : resultKey;
    return {
      key,
      dataPoints
    };
  });
  return (0, _lodash.sortBy)(buckets, bucket => bucket.key.toString().replace(/^HTTP (\d)xx$/, '00$1') // ensure that HTTP 3xx are sorted at the top
  );
}

function getResponseTime(responseTimeBuckets = []) {
  return responseTimeBuckets.reduce((acc, bucket) => {
    const {
      '95.0': p95,
      '99.0': p99
    } = bucket.pct.values;
    acc.avg.push({
      x: bucket.key,
      y: bucket.avg.value
    });
    acc.p95.push({
      x: bucket.key,
      y: (0, _lodash.isNumber)(p95) ? p95 : null
    });
    acc.p99.push({
      x: bucket.key,
      y: (0, _lodash.isNumber)(p99) ? p99 : null
    });
    return acc;
  }, {
    avg: [],
    p95: [],
    p99: []
  });
}