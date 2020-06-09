"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogEntryCategoriesResponsePayloadRT = exports.getLogEntryCategoriesSuccessReponsePayloadRT = exports.logEntryCategoryRT = exports.logEntryCategoryDatasetRT = exports.logEntryCategoryHistogramRT = exports.logEntryCategoryHistogramBucketRT = exports.getLogEntryCategoriesRequestPayloadRT = exports.LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORIES_PATH = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _shared = require("../../shared");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORIES_PATH = '/api/infra/log_analysis/results/log_entry_categories';
/**
 * request
 */

exports.LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORIES_PATH = LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORIES_PATH;
const logEntryCategoriesHistogramParametersRT = rt.type({
  id: rt.string,
  timeRange: _shared.timeRangeRT,
  bucketCount: rt.number
});
const getLogEntryCategoriesRequestPayloadRT = rt.type({
  data: rt.intersection([rt.type({
    // the number of categories to fetch
    categoryCount: rt.number,
    // the id of the source configuration
    sourceId: rt.string,
    // the time range to fetch the categories from
    timeRange: _shared.timeRangeRT,
    // a list of histograms to create
    histograms: rt.array(logEntryCategoriesHistogramParametersRT)
  }), rt.partial({
    // the datasets to filter for (optional, unfiltered if not present)
    datasets: rt.array(rt.string)
  })])
});
exports.getLogEntryCategoriesRequestPayloadRT = getLogEntryCategoriesRequestPayloadRT;

/**
 * response
 */
const logEntryCategoryHistogramBucketRT = rt.type({
  startTime: rt.number,
  bucketDuration: rt.number,
  logEntryCount: rt.number
});
exports.logEntryCategoryHistogramBucketRT = logEntryCategoryHistogramBucketRT;
const logEntryCategoryHistogramRT = rt.type({
  histogramId: rt.string,
  buckets: rt.array(logEntryCategoryHistogramBucketRT)
});
exports.logEntryCategoryHistogramRT = logEntryCategoryHistogramRT;
const logEntryCategoryDatasetRT = rt.type({
  name: rt.string,
  maximumAnomalyScore: rt.number
});
exports.logEntryCategoryDatasetRT = logEntryCategoryDatasetRT;
const logEntryCategoryRT = rt.type({
  categoryId: rt.number,
  datasets: rt.array(logEntryCategoryDatasetRT),
  histograms: rt.array(logEntryCategoryHistogramRT),
  logEntryCount: rt.number,
  maximumAnomalyScore: rt.number,
  regularExpression: rt.string
});
exports.logEntryCategoryRT = logEntryCategoryRT;
const getLogEntryCategoriesSuccessReponsePayloadRT = rt.intersection([rt.type({
  data: rt.type({
    categories: rt.array(logEntryCategoryRT)
  })
}), rt.partial({
  timing: _shared.routeTimingMetadataRT
})]);
exports.getLogEntryCategoriesSuccessReponsePayloadRT = getLogEntryCategoriesSuccessReponsePayloadRT;
const getLogEntryCategoriesResponsePayloadRT = rt.union([getLogEntryCategoriesSuccessReponsePayloadRT, _shared.badRequestErrorRT, _shared.forbiddenErrorRT]);
exports.getLogEntryCategoriesResponsePayloadRT = getLogEntryCategoriesResponsePayloadRT;