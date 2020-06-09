"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWatch = void 0;

var _test_utils = require("../../../../test_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getWatch = ({
  id = (0, _test_utils.getRandomString)(),
  name = (0, _test_utils.getRandomString)(),
  type = 'json',
  timeField,
  triggerIntervalSize,
  triggerIntervalUnit,
  aggType,
  termSize,
  thresholdComparator,
  timeWindowSize,
  timeWindowUnit,
  threshold,
  isSystemWatch = false,
  watchStatus = {
    state: 'OK',
    isActive: true
  }
} = {}) => ({
  id,
  name,
  type,
  timeField,
  triggerIntervalSize,
  triggerIntervalUnit,
  aggType,
  termSize,
  thresholdComparator,
  timeWindowSize,
  timeWindowUnit,
  threshold,
  isSystemWatch,
  watchStatus
});

exports.getWatch = getWatch;