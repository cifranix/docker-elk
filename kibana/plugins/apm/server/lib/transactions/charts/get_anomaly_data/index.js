"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnomalySeries = getAnomalySeries;

var _get_bucket_size = require("../../../helpers/get_bucket_size");

var _fetcher = require("./fetcher");

var _get_ml_bucket_size = require("./get_ml_bucket_size");

var _transform = require("./transform");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getAnomalySeries({
  serviceName,
  transactionType,
  transactionName,
  timeSeriesDates,
  setup
}) {
  // don't fetch anomalies for transaction details page
  if (transactionName) {
    return;
  } // don't fetch anomalies without a type


  if (!transactionType) {
    return;
  } // don't fetch anomalies if uiFilters are applied


  if (setup.uiFiltersES.length > 0) {
    return;
  }

  const mlBucketSize = await (0, _get_ml_bucket_size.getMlBucketSize)({
    serviceName,
    transactionType,
    setup
  });
  const {
    start,
    end
  } = setup;
  const {
    intervalString,
    bucketSize
  } = (0, _get_bucket_size.getBucketSize)(start, end, 'auto');
  const esResponse = await (0, _fetcher.anomalySeriesFetcher)({
    serviceName,
    transactionType,
    intervalString,
    mlBucketSize,
    setup
  });
  return esResponse ? (0, _transform.anomalySeriesTransform)(esResponse, mlBucketSize, bucketSize, timeSeriesDates) : undefined;
}