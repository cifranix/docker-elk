"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCategoryIdFilters = exports.createResultTypeFilters = exports.createTimeRangeFilters = exports.defaultRequestParameters = exports.getMlResultIndex = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ML_ANOMALY_INDEX_PREFIX = '.ml-anomalies-';

const getMlResultIndex = jobId => `${ML_ANOMALY_INDEX_PREFIX}${jobId}`;

exports.getMlResultIndex = getMlResultIndex;
const defaultRequestParameters = {
  allowNoIndices: true,
  ignoreUnavailable: true,
  trackScores: false,
  trackTotalHits: false
};
exports.defaultRequestParameters = defaultRequestParameters;

const createTimeRangeFilters = (startTime, endTime) => [{
  range: {
    timestamp: {
      gte: startTime,
      lte: endTime
    }
  }
}];

exports.createTimeRangeFilters = createTimeRangeFilters;

const createResultTypeFilters = resultType => [{
  term: {
    result_type: {
      value: resultType
    }
  }
}];

exports.createResultTypeFilters = createResultTypeFilters;

const createCategoryIdFilters = categoryIds => [{
  terms: {
    category_id: categoryIds
  }
}];

exports.createCategoryIdFilters = createCategoryIdFilters;