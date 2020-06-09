"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobs = void 0;

var _http_service = require("../http_service");

var _index = require("./index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var jobs = {
  jobsSummary: function jobsSummary(jobIds) {
    var body = JSON.stringify({
      jobIds: jobIds
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/jobs_summary"),
      method: 'POST',
      body: body
    });
  },
  jobsWithTimerange: function jobsWithTimerange(dateFormatTz) {
    var body = JSON.stringify({
      dateFormatTz: dateFormatTz
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/jobs_with_time_range"),
      method: 'POST',
      body: body
    });
  },
  jobs: function jobs(jobIds) {
    var body = JSON.stringify({
      jobIds: jobIds
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/jobs"),
      method: 'POST',
      body: body
    });
  },
  groups: function groups() {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/groups"),
      method: 'GET'
    });
  },
  updateGroups: function updateGroups(updatedJobs) {
    var body = JSON.stringify({
      jobs: updatedJobs
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/update_groups"),
      method: 'POST',
      body: body
    });
  },
  forceStartDatafeeds: function forceStartDatafeeds(datafeedIds, start, end) {
    var body = JSON.stringify({
      datafeedIds: datafeedIds,
      start: start,
      end: end
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/force_start_datafeeds"),
      method: 'POST',
      body: body
    });
  },
  stopDatafeeds: function stopDatafeeds(datafeedIds) {
    var body = JSON.stringify({
      datafeedIds: datafeedIds
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/stop_datafeeds"),
      method: 'POST',
      body: body
    });
  },
  deleteJobs: function deleteJobs(jobIds) {
    var body = JSON.stringify({
      jobIds: jobIds
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/delete_jobs"),
      method: 'POST',
      body: body
    });
  },
  closeJobs: function closeJobs(jobIds) {
    var body = JSON.stringify({
      jobIds: jobIds
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/close_jobs"),
      method: 'POST',
      body: body
    });
  },
  jobAuditMessages: function jobAuditMessages(jobId, from) {
    var jobIdString = jobId !== undefined ? "/".concat(jobId) : '';
    var query = from !== undefined ? {
      from: from
    } : {};
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/job_audit_messages/messages").concat(jobIdString),
      method: 'GET',
      query: query
    });
  },
  deletingJobTasks: function deletingJobTasks() {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/deleting_jobs_tasks"),
      method: 'GET'
    });
  },
  jobsExist: function jobsExist(jobIds) {
    var body = JSON.stringify({
      jobIds: jobIds
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/jobs_exist"),
      method: 'POST',
      body: body
    });
  },
  newJobCaps: function newJobCaps(indexPatternTitle) {
    var isRollup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var query = isRollup === true ? {
      rollup: true
    } : {};
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/new_job_caps/").concat(indexPatternTitle),
      method: 'GET',
      query: query
    });
  },
  newJobLineChart: function newJobLineChart(indexPatternTitle, timeField, start, end, intervalMs, query, aggFieldNamePairs, splitFieldName, splitFieldValue) {
    var body = JSON.stringify({
      indexPatternTitle: indexPatternTitle,
      timeField: timeField,
      start: start,
      end: end,
      intervalMs: intervalMs,
      query: query,
      aggFieldNamePairs: aggFieldNamePairs,
      splitFieldName: splitFieldName,
      splitFieldValue: splitFieldValue
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/new_job_line_chart"),
      method: 'POST',
      body: body
    });
  },
  newJobPopulationsChart: function newJobPopulationsChart(indexPatternTitle, timeField, start, end, intervalMs, query, aggFieldNamePairs, splitFieldName) {
    var body = JSON.stringify({
      indexPatternTitle: indexPatternTitle,
      timeField: timeField,
      start: start,
      end: end,
      intervalMs: intervalMs,
      query: query,
      aggFieldNamePairs: aggFieldNamePairs,
      splitFieldName: splitFieldName
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/new_job_population_chart"),
      method: 'POST',
      body: body
    });
  },
  getAllJobAndGroupIds: function getAllJobAndGroupIds() {
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/all_jobs_and_group_ids"),
      method: 'GET'
    });
  },
  getLookBackProgress: function getLookBackProgress(jobId, start, end) {
    var body = JSON.stringify({
      jobId: jobId,
      start: start,
      end: end
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/look_back_progress"),
      method: 'POST',
      body: body
    });
  },
  categorizationFieldExamples: function categorizationFieldExamples(indexPatternTitle, query, size, field, timeField, start, end, analyzer) {
    var body = JSON.stringify({
      indexPatternTitle: indexPatternTitle,
      query: query,
      size: size,
      field: field,
      timeField: timeField,
      start: start,
      end: end,
      analyzer: analyzer
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/categorization_field_examples"),
      method: 'POST',
      body: body
    });
  },
  topCategories: function topCategories(jobId, count) {
    var body = JSON.stringify({
      jobId: jobId,
      count: count
    });
    return (0, _http_service.http)({
      path: "".concat((0, _index.basePath)(), "/jobs/top_categories"),
      method: 'POST',
      body: body
    });
  }
};
exports.jobs = jobs;