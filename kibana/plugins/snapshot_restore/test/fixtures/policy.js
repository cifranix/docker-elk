"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPolicy = void 0;

var _test_utils = require("../../../../test_utils");

var _constants = require("../../public/application/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @kbn/eslint/no-restricted-paths */
const dateNow = new Date();
const randomModifiedDateMillis = new Date().setDate(dateNow.getDate() - 1);
const randomExecutionDateMillis = new Date().setDate(dateNow.getDate() + 1);
const DEFAULT_STATS = {
  snapshotsTaken: 0,
  snapshotsFailed: 0,
  snapshotsDeleted: 0,
  snapshotDeletionFailures: 0
};

const getPolicy = ({
  name = `policy-${(0, _test_utils.getRandomString)()}`,
  config = {},
  modifiedDate = new Date(randomModifiedDateMillis).toString(),
  modifiedDateMillis = randomModifiedDateMillis,
  nextExecution = new Date(randomExecutionDateMillis).toString(),
  nextExecutionMillis = randomExecutionDateMillis,
  repository = `repo-${(0, _test_utils.getRandomString)()}`,
  retention = {},
  schedule = _constants.DEFAULT_POLICY_SCHEDULE,
  snapshotName = `snapshot-${(0, _test_utils.getRandomString)()}`,
  stats = DEFAULT_STATS,
  version = (0, _test_utils.getRandomNumber)(),
  isManagedPolicy = false
} = {}) => ({
  name,
  config,
  modifiedDate,
  modifiedDateMillis,
  nextExecution,
  nextExecutionMillis,
  repository,
  retention,
  schedule,
  snapshotName,
  stats,
  version,
  isManagedPolicy
});

exports.getPolicy = getPolicy;