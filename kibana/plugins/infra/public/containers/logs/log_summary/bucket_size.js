"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBucketSize = useBucketSize;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SUMMARY_BUCKET_COUNT = 100;

function useBucketSize(startTimestamp, endTimestamp) {
  var bucketSize = (0, _react.useMemo)(function () {
    if (!startTimestamp || !endTimestamp) {
      return null;
    }

    return (endTimestamp - startTimestamp) / SUMMARY_BUCKET_COUNT;
  }, [startTimestamp, endTimestamp]);
  return bucketSize;
}