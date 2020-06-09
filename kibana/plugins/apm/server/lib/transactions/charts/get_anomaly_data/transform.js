"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anomalySeriesTransform = anomalySeriesTransform;
exports.getAnomalyScoreDataPoints = getAnomalyScoreDataPoints;
exports.getAnomalyBoundaryDataPoints = getAnomalyBoundaryDataPoints;
exports.replaceFirstAndLastBucket = replaceFirstAndLastBucket;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getBucket(bucket) {
  return {
    x: bucket.key,
    anomalyScore: bucket.anomaly_score.value,
    lower: bucket.lower.value,
    upper: bucket.upper.value
  };
}

function anomalySeriesTransform(response, mlBucketSize, bucketSize, timeSeriesDates) {
  var _response$aggregation;

  const buckets = ((_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : _response$aggregation.ml_avg_response_times.buckets.map(getBucket)) || [];
  const bucketSizeInMillis = Math.max(bucketSize, mlBucketSize) * 1000;
  return {
    anomalyScore: getAnomalyScoreDataPoints(buckets, timeSeriesDates, bucketSizeInMillis),
    anomalyBoundaries: getAnomalyBoundaryDataPoints(buckets, timeSeriesDates)
  };
}

function getAnomalyScoreDataPoints(buckets, timeSeriesDates, bucketSizeInMillis) {
  const ANOMALY_THRESHOLD = 75;
  const firstDate = (0, _lodash.first)(timeSeriesDates);
  const lastDate = (0, _lodash.last)(timeSeriesDates);
  return buckets.filter(bucket => bucket.anomalyScore !== null && bucket.anomalyScore > ANOMALY_THRESHOLD).filter(isInDateRange(firstDate, lastDate)).map(bucket => {
    return {
      x0: bucket.x,
      x: Math.min(bucket.x + bucketSizeInMillis, lastDate) // don't go beyond last date

    };
  });
}

function getAnomalyBoundaryDataPoints(buckets, timeSeriesDates) {
  return replaceFirstAndLastBucket(buckets, timeSeriesDates).filter(bucket => bucket.lower !== null).map(bucket => {
    return {
      x: bucket.x,
      y0: bucket.lower,
      y: bucket.upper
    };
  });
}

function replaceFirstAndLastBucket(buckets, timeSeriesDates) {
  const firstDate = (0, _lodash.first)(timeSeriesDates);
  const lastDate = (0, _lodash.last)(timeSeriesDates);
  const preBucketWithValue = buckets.filter(p => p.x <= firstDate).reverse().find(p => p.lower !== null);
  const bucketsInRange = buckets.filter(isInDateRange(firstDate, lastDate)); // replace first bucket if it is null

  const firstBucket = (0, _lodash.first)(bucketsInRange);

  if (preBucketWithValue && firstBucket && firstBucket.lower === null) {
    firstBucket.lower = preBucketWithValue.lower;
    firstBucket.upper = preBucketWithValue.upper;
  }

  const lastBucketWithValue = [...buckets].reverse().find(p => p.lower !== null); // replace last bucket if it is null

  const lastBucket = (0, _lodash.last)(bucketsInRange);

  if (lastBucketWithValue && lastBucket && lastBucket.lower === null) {
    lastBucket.lower = lastBucketWithValue.lower;
    lastBucket.upper = lastBucketWithValue.upper;
  }

  return bucketsInRange;
} // anomaly time series contain one or more buckets extra in the beginning
// these extra buckets should be removed


function isInDateRange(firstDate, lastDate) {
  return p => p.x >= firstDate && p.x <= lastDate;
}