"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexFailure = exports.getSnapshot = void 0;

var _test_utils = require("../../../../test_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getSnapshot = ({
  repository = 'my-repo',
  snapshot = (0, _test_utils.getRandomString)(),
  uuid = (0, _test_utils.getRandomString)(),
  state = 'SUCCESS',
  indexFailures = [],
  totalIndices = (0, _test_utils.getRandomNumber)()
} = {}) => ({
  repository,
  snapshot,
  uuid,
  versionId: 8000099,
  version: '8.0.0',
  indices: new Array(totalIndices).fill('').map(_test_utils.getRandomString),
  includeGlobalState: 1,
  state,
  startTime: '2019-05-23T06:25:15.896Z',
  startTimeInMillis: 1558592715896,
  endTime: '2019-05-23T06:25:16.603Z',
  endTimeInMillis: 1558592716603,
  durationInMillis: 707,
  indexFailures,
  shards: {
    total: 3,
    failed: 0,
    successful: 3
  }
});

exports.getSnapshot = getSnapshot;

const getIndexFailure = (index = (0, _test_utils.getRandomString)()) => ({
  index,
  failures: new Array((0, _test_utils.getRandomNumber)({
    min: 1,
    max: 5
  })).fill('').map(() => ({
    status: 400,
    reason: (0, _test_utils.getRandomString)(),
    shard_id: (0, _test_utils.getRandomString)()
  }))
});

exports.getIndexFailure = getIndexFailure;