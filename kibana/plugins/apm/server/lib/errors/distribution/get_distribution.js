"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrorDistribution = getErrorDistribution;

var _get_buckets = require("./get_buckets");

var _constants = require("../../transactions/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getBucketSize({
  start,
  end
}) {
  return Math.floor((end - start) / _constants.BUCKET_TARGET_COUNT);
}

async function getErrorDistribution({
  serviceName,
  groupId,
  setup
}) {
  const bucketSize = getBucketSize({
    start: setup.start,
    end: setup.end
  });
  const {
    buckets,
    noHits
  } = await (0, _get_buckets.getBuckets)({
    serviceName,
    groupId,
    bucketSize,
    setup
  });
  return {
    noHits,
    buckets,
    bucketSize
  };
}