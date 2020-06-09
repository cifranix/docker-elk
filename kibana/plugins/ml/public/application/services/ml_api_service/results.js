"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.results = void 0;

var _http_service = require("../http_service");

var _index = require("./index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Service for obtaining data for the ML Results dashboards.
var results = {
  getAnomaliesTableData: function getAnomaliesTableData(jobIds, criteriaFields, influencers, aggregationInterval, threshold, earliestMs, latestMs, dateFormatTz, maxRecords, maxExamples, influencersFilterQuery) {
    var body = JSON.stringify({
      jobIds: jobIds,
      criteriaFields: criteriaFields,
      influencers: influencers,
      aggregationInterval: aggregationInterval,
      threshold: threshold,
      earliestMs: earliestMs,
      latestMs: latestMs,
      dateFormatTz: dateFormatTz,
      maxRecords: maxRecords,
      maxExamples: maxExamples,
      influencersFilterQuery: influencersFilterQuery
    });
    return (0, _http_service.http$)({
      path: "".concat((0, _index.basePath)(), "/results/anomalies_table_data"),
      method: 'POST',
      body: body
    });
  },
  getMaxAnomalyScore: function getMaxAnomalyScore(jobIds, earliestMs, latestMs) {
    var body = JSON.stringify({
      jobIds: jobIds,
      earliestMs: earliestMs,
      latestMs: latestMs
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/results/max_anomaly_score"),
      method: 'POST',
      body: body
    });
  },
  getCategoryDefinition: function getCategoryDefinition(jobId, categoryId) {
    var body = JSON.stringify({
      jobId: jobId,
      categoryId: categoryId
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/results/category_definition"),
      method: 'POST',
      body: body
    });
  },
  getCategoryExamples: function getCategoryExamples(jobId, categoryIds, maxExamples) {
    var body = JSON.stringify({
      jobId: jobId,
      categoryIds: categoryIds,
      maxExamples: maxExamples
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/results/category_examples"),
      method: 'POST',
      body: body
    });
  },
  fetchPartitionFieldsValues: function fetchPartitionFieldsValues(jobId, searchTerm, criteriaFields, earliestMs, latestMs) {
    var body = JSON.stringify({
      jobId: jobId,
      searchTerm: searchTerm,
      criteriaFields: criteriaFields,
      earliestMs: earliestMs,
      latestMs: latestMs
    });
    return (0, _http_service.http$)({
      path: "".concat((0, _index.basePath)(), "/results/partition_fields_values"),
      method: 'POST',
      body: body
    });
  }
};
exports.results = results;