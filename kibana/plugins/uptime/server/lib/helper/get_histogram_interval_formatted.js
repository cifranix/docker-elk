"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHistogramIntervalFormatted = void 0;

var _get_histogram_interval = require("./get_histogram_interval");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getHistogramIntervalFormatted = (dateRangeStart, dateRangeEnd, bucketCount) => `${(0, _get_histogram_interval.getHistogramInterval)(dateRangeStart, dateRangeEnd, bucketCount)}ms`;

exports.getHistogramIntervalFormatted = getHistogramIntervalFormatted;