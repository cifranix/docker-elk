"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlResultsService = void 0;

var _result_service_rx = require("./result_service_rx");

var _results_service = require("./results_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mlResultsService = {
  getScoresByBucket: _results_service.getScoresByBucket,
  getScheduledEventsByBucket: _result_service_rx.getScheduledEventsByBucket,
  getTopInfluencers: _results_service.getTopInfluencers,
  getTopInfluencerValues: _results_service.getTopInfluencerValues,
  getOverallBucketScores: _results_service.getOverallBucketScores,
  getInfluencerValueMaxScoreByTime: _results_service.getInfluencerValueMaxScoreByTime,
  getRecordInfluencers: _results_service.getRecordInfluencers,
  getRecordsForInfluencer: _results_service.getRecordsForInfluencer,
  getRecordsForDetector: _results_service.getRecordsForDetector,
  getRecords: _results_service.getRecords,
  getRecordsForCriteria: _result_service_rx.getRecordsForCriteria,
  getMetricData: _result_service_rx.getMetricData,
  getEventRateData: _results_service.getEventRateData,
  getEventDistributionData: _results_service.getEventDistributionData,
  getModelPlotOutput: _result_service_rx.getModelPlotOutput,
  getRecordMaxScoreByTime: _results_service.getRecordMaxScoreByTime,
  fetchPartitionFieldsValues: _result_service_rx.fetchPartitionFieldsValues
};
exports.mlResultsService = mlResultsService;