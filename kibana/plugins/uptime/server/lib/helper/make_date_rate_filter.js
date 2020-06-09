"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDateRangeFilter = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const makeDateRangeFilter = (dateRangeStart, dateRangeEnd) => {
  return {
    range: {
      '@timestamp': {
        gte: dateRangeStart,
        lte: dateRangeEnd
      }
    }
  };
};

exports.makeDateRangeFilter = makeDateRangeFilter;