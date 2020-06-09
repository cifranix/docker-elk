"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCurrentTimeRange = exports.selectTimeUpdatePolicyInterval = exports.selectIsAutoReloading = exports.selectCurrentTime = void 0;

var _reselect = require("reselect");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectCurrentTime = function selectCurrentTime(state) {
  return state.currentTime;
};

exports.selectCurrentTime = selectCurrentTime;

var selectIsAutoReloading = function selectIsAutoReloading(state) {
  return state.updatePolicy.policy === 'interval';
};

exports.selectIsAutoReloading = selectIsAutoReloading;

var selectTimeUpdatePolicyInterval = function selectTimeUpdatePolicyInterval(state) {
  return state.updatePolicy.policy === 'interval' ? state.updatePolicy.interval : null;
};

exports.selectTimeUpdatePolicyInterval = selectTimeUpdatePolicyInterval;
var selectCurrentTimeRange = (0, _reselect.createSelector)(selectCurrentTime, function (currentTime) {
  return {
    from: currentTime - 1000 * 60 * 5,
    interval: '1m',
    to: currentTime
  };
});
exports.selectCurrentTimeRange = selectCurrentTimeRange;