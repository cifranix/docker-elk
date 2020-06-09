"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWatchHistory = void 0;

var _test_utils = require("../../../../test_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getWatchHistory = ({
  startTime = '2019-06-03T19:44:11.088Z',
  id = (0, _test_utils.getRandomString)(),
  watchId = (0, _test_utils.getRandomString)(),
  watchStatus = {
    state: 'OK'
  },
  details = {}
} = {}) => ({
  startTime,
  id,
  watchId,
  watchStatus,
  details
});

exports.getWatchHistory = getWatchHistory;