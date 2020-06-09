"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionDistribution = getTransactionDistribution;

var _get_buckets = require("./get_buckets");

var _get_distribution_max = require("./get_distribution_max");

var _round_to_nearest_five_or_ten = require("../../helpers/round_to_nearest_five_or_ten");

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getBucketSize(max) {
  const bucketSize = max / _constants.BUCKET_TARGET_COUNT;
  return (0, _round_to_nearest_five_or_ten.roundToNearestFiveOrTen)(bucketSize > _constants.MINIMUM_BUCKET_SIZE ? bucketSize : _constants.MINIMUM_BUCKET_SIZE);
}

async function getTransactionDistribution({
  serviceName,
  transactionName,
  transactionType,
  transactionId,
  traceId,
  setup
}) {
  const distributionMax = await (0, _get_distribution_max.getDistributionMax)(serviceName, transactionName, transactionType, setup);

  if (distributionMax == null) {
    return {
      noHits: true,
      buckets: [],
      bucketSize: 0
    };
  }

  const bucketSize = getBucketSize(distributionMax);
  const {
    buckets,
    noHits
  } = await (0, _get_buckets.getBuckets)(serviceName, transactionName, transactionType, transactionId, traceId, distributionMax, bucketSize, setup);
  return {
    noHits,
    buckets,
    bucketSize
  };
}