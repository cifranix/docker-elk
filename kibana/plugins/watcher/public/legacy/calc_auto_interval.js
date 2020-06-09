"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcAutoIntervalNear = calcAutoIntervalNear;
exports.calcAutoIntervalLessThan = calcAutoIntervalLessThan;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var boundsDescending = [{
  bound: Infinity,
  interval: Number(_moment.default.duration(1, 'year'))
}, {
  bound: Number(_moment.default.duration(1, 'year')),
  interval: Number(_moment.default.duration(1, 'month'))
}, {
  bound: Number(_moment.default.duration(3, 'week')),
  interval: Number(_moment.default.duration(1, 'week'))
}, {
  bound: Number(_moment.default.duration(1, 'week')),
  interval: Number(_moment.default.duration(1, 'd'))
}, {
  bound: Number(_moment.default.duration(24, 'hour')),
  interval: Number(_moment.default.duration(12, 'hour'))
}, {
  bound: Number(_moment.default.duration(6, 'hour')),
  interval: Number(_moment.default.duration(3, 'hour'))
}, {
  bound: Number(_moment.default.duration(2, 'hour')),
  interval: Number(_moment.default.duration(1, 'hour'))
}, {
  bound: Number(_moment.default.duration(45, 'minute')),
  interval: Number(_moment.default.duration(30, 'minute'))
}, {
  bound: Number(_moment.default.duration(20, 'minute')),
  interval: Number(_moment.default.duration(10, 'minute'))
}, {
  bound: Number(_moment.default.duration(9, 'minute')),
  interval: Number(_moment.default.duration(5, 'minute'))
}, {
  bound: Number(_moment.default.duration(3, 'minute')),
  interval: Number(_moment.default.duration(1, 'minute'))
}, {
  bound: Number(_moment.default.duration(45, 'second')),
  interval: Number(_moment.default.duration(30, 'second'))
}, {
  bound: Number(_moment.default.duration(15, 'second')),
  interval: Number(_moment.default.duration(10, 'second'))
}, {
  bound: Number(_moment.default.duration(7.5, 'second')),
  interval: Number(_moment.default.duration(5, 'second'))
}, {
  bound: Number(_moment.default.duration(5, 'second')),
  interval: Number(_moment.default.duration(1, 'second'))
}, {
  bound: Number(_moment.default.duration(500, 'ms')),
  interval: Number(_moment.default.duration(100, 'ms'))
}];

function getPerBucketMs(count, duration) {
  var ms = duration / count;
  return isFinite(ms) ? ms : NaN;
}

function normalizeMinimumInterval(targetMs) {
  var value = isNaN(targetMs) ? 0 : Math.max(Math.floor(targetMs), 1);
  return _moment.default.duration(value);
}
/**
 * Using some simple rules we pick a "pretty" interval that will
 * produce around the number of buckets desired given a time range.
 *
 * @param targetBucketCount desired number of buckets
 * @param duration time range the agg covers
 */


function calcAutoIntervalNear(targetBucketCount, duration) {
  var targetPerBucketMs = getPerBucketMs(targetBucketCount, duration); // Find the first bound which is smaller than our target.

  var lowerBoundIndex = boundsDescending.findIndex(function (_ref) {
    var bound = _ref.bound;
    var boundMs = Number(bound);
    return boundMs <= targetPerBucketMs;
  }); // The bound immediately preceeding that lower bound contains the
  // interval most closely matching our target.

  if (lowerBoundIndex !== -1) {
    var nearestInterval = boundsDescending[lowerBoundIndex - 1].interval;
    return _moment.default.duration(nearestInterval);
  } // If the target is smaller than any of our bounds, then we'll use it for the interval as-is.


  return normalizeMinimumInterval(targetPerBucketMs);
}
/**
 * Pick a "pretty" interval that produces no more than the maxBucketCount
 * for the given time range.
 *
 * @param maxBucketCount maximum number of buckets to create
 * @param duration amount of time covered by the agg
 */


function calcAutoIntervalLessThan(maxBucketCount, duration) {
  var maxPerBucketMs = getPerBucketMs(maxBucketCount, duration);

  for (var _i = 0, _boundsDescending = boundsDescending; _i < _boundsDescending.length; _i++) {
    var interval = _boundsDescending[_i].interval;

    // Find the highest interval which meets our per bucket limitation.
    if (interval <= maxPerBucketMs) {
      return _moment.default.duration(interval);
    }
  } // If the max is smaller than any of our intervals, then we'll use it for the interval as-is.


  return normalizeMinimumInterval(maxPerBucketMs);
}