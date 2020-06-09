"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBucketSize = getBucketSize;

var _moment = _interopRequireDefault(require("moment"));

var _calculate_auto = require("./calculate_auto");

var _unit_to_seconds = require("./unit_to_seconds");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
function getBucketSize(start, end, interval) {
  const duration = _moment.default.duration(end - start, 'ms');

  const bucketSize = Math.max(_calculate_auto.calculateAuto.near(100, duration).asSeconds(), 1);
  const intervalString = `${bucketSize}s`;
  const matches = interval && interval.match(/^([\d]+)([shmdwMy]|ms)$/);
  const minBucketSize = matches ? Number(matches[1]) * (0, _unit_to_seconds.unitToSeconds)(matches[2]) : 0;

  if (bucketSize < minBucketSize) {
    return {
      bucketSize: minBucketSize,
      intervalString: interval
    };
  }

  return {
    bucketSize,
    intervalString
  };
}