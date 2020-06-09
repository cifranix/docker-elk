"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogEntryRateResponsePayloadRT = exports.getLogEntryRateSuccessReponsePayloadRT = exports.logEntryRateHistogramBucketRT = exports.logEntryRatePartitionRT = exports.logEntryRateAnomalyRT = exports.getLogEntryRateRequestPayloadRT = exports.LOG_ANALYSIS_GET_LOG_ENTRY_RATE_PATH = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _shared = require("../../shared");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ANALYSIS_GET_LOG_ENTRY_RATE_PATH = '/api/infra/log_analysis/results/log_entry_rate';
/**
 * request
 */

exports.LOG_ANALYSIS_GET_LOG_ENTRY_RATE_PATH = LOG_ANALYSIS_GET_LOG_ENTRY_RATE_PATH;
const getLogEntryRateRequestPayloadRT = rt.type({
  data: rt.type({
    bucketDuration: rt.number,
    sourceId: rt.string,
    timeRange: _shared.timeRangeRT
  })
});
exports.getLogEntryRateRequestPayloadRT = getLogEntryRateRequestPayloadRT;

/**
 * response
 */
const logEntryRateAnomalyRT = rt.type({
  actualLogEntryRate: rt.number,
  anomalyScore: rt.number,
  duration: rt.number,
  startTime: rt.number,
  typicalLogEntryRate: rt.number
});
exports.logEntryRateAnomalyRT = logEntryRateAnomalyRT;
const logEntryRatePartitionRT = rt.type({
  analysisBucketCount: rt.number,
  anomalies: rt.array(logEntryRateAnomalyRT),
  averageActualLogEntryRate: rt.number,
  maximumAnomalyScore: rt.number,
  numberOfLogEntries: rt.number,
  partitionId: rt.string
});
exports.logEntryRatePartitionRT = logEntryRatePartitionRT;
const logEntryRateHistogramBucketRT = rt.type({
  partitions: rt.array(logEntryRatePartitionRT),
  startTime: rt.number
});
exports.logEntryRateHistogramBucketRT = logEntryRateHistogramBucketRT;
const getLogEntryRateSuccessReponsePayloadRT = rt.type({
  data: rt.type({
    bucketDuration: rt.number,
    histogramBuckets: rt.array(logEntryRateHistogramBucketRT),
    totalNumberOfLogEntries: rt.number
  })
});
exports.getLogEntryRateSuccessReponsePayloadRT = getLogEntryRateSuccessReponsePayloadRT;
const getLogEntryRateResponsePayloadRT = rt.union([getLogEntryRateSuccessReponsePayloadRT, _shared.badRequestErrorRT, _shared.conflictErrorRT, _shared.forbiddenErrorRT]);
exports.getLogEntryRateResponsePayloadRT = getLogEntryRateResponsePayloadRT;