"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basePath = basePath;
exports.ml = void 0;

var _http_service = require("../http_service");

var _annotations = require("./annotations");

var _data_frame_analytics = require("./data_frame_analytics");

var _filters = require("./filters");

var _results = require("./results");

var _jobs = require("./jobs");

var _datavisualizer = require("./datavisualizer");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function basePath() {
  return '/api/ml';
}

var ml = {
  getJobs: function getJobs(obj) {
    var jobId = obj && obj.jobId ? "/".concat(obj.jobId) : '';
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors").concat(jobId)
    });
  },
  getJobStats: function getJobStats(obj) {
    var jobId = obj && obj.jobId ? "/".concat(obj.jobId) : '';
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors").concat(jobId, "/_stats")
    });
  },
  addJob: function addJob(_ref) {
    var jobId = _ref.jobId,
        job = _ref.job;
    var body = JSON.stringify(job);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/").concat(jobId),
      method: 'PUT',
      body: body
    });
  },
  openJob: function openJob(_ref2) {
    var jobId = _ref2.jobId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/").concat(jobId, "/_open"),
      method: 'POST'
    });
  },
  closeJob: function closeJob(_ref3) {
    var jobId = _ref3.jobId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/").concat(jobId, "/_close"),
      method: 'POST'
    });
  },
  deleteJob: function deleteJob(_ref4) {
    var jobId = _ref4.jobId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/").concat(jobId),
      method: 'DELETE'
    });
  },
  forceDeleteJob: function forceDeleteJob(_ref5) {
    var jobId = _ref5.jobId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/").concat(jobId, "?force=true"),
      method: 'DELETE'
    });
  },
  updateJob: function updateJob(_ref6) {
    var jobId = _ref6.jobId,
        job = _ref6.job;
    var body = JSON.stringify(job);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/").concat(jobId, "/_update"),
      method: 'POST',
      body: body
    });
  },
  estimateBucketSpan: function estimateBucketSpan(obj) {
    var body = JSON.stringify(obj);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/validate/estimate_bucket_span"),
      method: 'POST',
      body: body
    });
  },
  validateJob: function validateJob(payload) {
    var body = JSON.stringify(payload);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/validate/job"),
      method: 'POST',
      body: body
    });
  },
  validateCardinality$: function validateCardinality$(job) {
    var body = JSON.stringify(job);
    return (0, _http_service.http$)({
      path: "".concat(basePath(), "/validate/cardinality"),
      method: 'POST',
      body: body
    });
  },
  getDatafeeds: function getDatafeeds(obj) {
    var datafeedId = obj && obj.datafeedId ? "/".concat(obj.datafeedId) : '';
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds").concat(datafeedId)
    });
  },
  getDatafeedStats: function getDatafeedStats(obj) {
    var datafeedId = obj && obj.datafeedId ? "/".concat(obj.datafeedId) : '';
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds").concat(datafeedId, "/_stats")
    });
  },
  addDatafeed: function addDatafeed(_ref7) {
    var datafeedId = _ref7.datafeedId,
        datafeedConfig = _ref7.datafeedConfig;
    var body = JSON.stringify(datafeedConfig);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds/").concat(datafeedId),
      method: 'PUT',
      body: body
    });
  },
  updateDatafeed: function updateDatafeed(_ref8) {
    var datafeedId = _ref8.datafeedId,
        datafeedConfig = _ref8.datafeedConfig;
    var body = JSON.stringify(datafeedConfig);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds/").concat(datafeedId, "/_update"),
      method: 'POST',
      body: body
    });
  },
  deleteDatafeed: function deleteDatafeed(_ref9) {
    var datafeedId = _ref9.datafeedId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds/").concat(datafeedId),
      method: 'DELETE'
    });
  },
  forceDeleteDatafeed: function forceDeleteDatafeed(_ref10) {
    var datafeedId = _ref10.datafeedId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds/").concat(datafeedId, "?force=true"),
      method: 'DELETE'
    });
  },
  startDatafeed: function startDatafeed(_ref11) {
    var datafeedId = _ref11.datafeedId,
        start = _ref11.start,
        end = _ref11.end;
    var body = JSON.stringify(_objectSpread({}, start !== undefined ? {
      start: start
    } : {}, {}, end !== undefined ? {
      end: end
    } : {}));
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds/").concat(datafeedId, "/_start"),
      method: 'POST',
      body: body
    });
  },
  stopDatafeed: function stopDatafeed(_ref12) {
    var datafeedId = _ref12.datafeedId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds/").concat(datafeedId, "/_stop"),
      method: 'POST'
    });
  },
  datafeedPreview: function datafeedPreview(_ref13) {
    var datafeedId = _ref13.datafeedId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/datafeeds/").concat(datafeedId, "/_preview"),
      method: 'GET'
    });
  },
  validateDetector: function validateDetector(_ref14) {
    var detector = _ref14.detector;
    var body = JSON.stringify(detector);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/_validate/detector"),
      method: 'POST',
      body: body
    });
  },
  forecast: function forecast(_ref15) {
    var jobId = _ref15.jobId,
        duration = _ref15.duration;
    var body = JSON.stringify(_objectSpread({}, duration !== undefined ? {
      duration: duration
    } : {}));
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/").concat(jobId, "/_forecast"),
      method: 'POST',
      body: body
    });
  },
  overallBuckets: function overallBuckets(_ref16) {
    var jobId = _ref16.jobId,
        topN = _ref16.topN,
        bucketSpan = _ref16.bucketSpan,
        start = _ref16.start,
        end = _ref16.end;
    var body = JSON.stringify({
      topN: topN,
      bucketSpan: bucketSpan,
      start: start,
      end: end
    });
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/anomaly_detectors/").concat(jobId, "/results/overall_buckets"),
      method: 'POST',
      body: body
    });
  },
  hasPrivileges: function hasPrivileges(obj) {
    var body = JSON.stringify(obj);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/_has_privileges"),
      method: 'POST',
      body: body
    });
  },
  checkMlPrivileges: function checkMlPrivileges() {
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/ml_capabilities"),
      method: 'GET'
    });
  },
  checkManageMLPrivileges: function checkManageMLPrivileges() {
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/ml_capabilities"),
      method: 'GET',
      query: {
        ignoreSpaces: true
      }
    });
  },
  getNotificationSettings: function getNotificationSettings() {
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/notification_settings"),
      method: 'GET'
    });
  },
  getFieldCaps: function getFieldCaps(_ref17) {
    var index = _ref17.index,
        fields = _ref17.fields;
    var body = JSON.stringify(_objectSpread({}, index !== undefined ? {
      index: index
    } : {}, {}, fields !== undefined ? {
      fields: fields
    } : {}));
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/indices/field_caps"),
      method: 'POST',
      body: body
    });
  },
  recognizeIndex: function recognizeIndex(_ref18) {
    var indexPatternTitle = _ref18.indexPatternTitle;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/modules/recognize/").concat(indexPatternTitle),
      method: 'GET'
    });
  },
  listDataRecognizerModules: function listDataRecognizerModules() {
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/modules/get_module"),
      method: 'GET'
    });
  },
  getDataRecognizerModule: function getDataRecognizerModule(_ref19) {
    var moduleId = _ref19.moduleId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/modules/get_module/").concat(moduleId),
      method: 'GET'
    });
  },
  dataRecognizerModuleJobsExist: function dataRecognizerModuleJobsExist(_ref20) {
    var moduleId = _ref20.moduleId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/modules/jobs_exist/").concat(moduleId),
      method: 'GET'
    });
  },
  setupDataRecognizerConfig: function setupDataRecognizerConfig(_ref21) {
    var moduleId = _ref21.moduleId,
        prefix = _ref21.prefix,
        groups = _ref21.groups,
        indexPatternName = _ref21.indexPatternName,
        query = _ref21.query,
        useDedicatedIndex = _ref21.useDedicatedIndex,
        startDatafeed = _ref21.startDatafeed,
        start = _ref21.start,
        end = _ref21.end,
        jobOverrides = _ref21.jobOverrides,
        estimateModelMemory = _ref21.estimateModelMemory;
    var body = JSON.stringify({
      prefix: prefix,
      groups: groups,
      indexPatternName: indexPatternName,
      query: query,
      useDedicatedIndex: useDedicatedIndex,
      startDatafeed: startDatafeed,
      start: start,
      end: end,
      jobOverrides: jobOverrides,
      estimateModelMemory: estimateModelMemory
    });
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/modules/setup/").concat(moduleId),
      method: 'POST',
      body: body
    });
  },
  getVisualizerFieldStats: function getVisualizerFieldStats(_ref22) {
    var indexPatternTitle = _ref22.indexPatternTitle,
        query = _ref22.query,
        timeFieldName = _ref22.timeFieldName,
        earliest = _ref22.earliest,
        latest = _ref22.latest,
        samplerShardSize = _ref22.samplerShardSize,
        interval = _ref22.interval,
        fields = _ref22.fields,
        maxExamples = _ref22.maxExamples;
    var body = JSON.stringify({
      query: query,
      timeFieldName: timeFieldName,
      earliest: earliest,
      latest: latest,
      samplerShardSize: samplerShardSize,
      interval: interval,
      fields: fields,
      maxExamples: maxExamples
    });
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/data_visualizer/get_field_stats/").concat(indexPatternTitle),
      method: 'POST',
      body: body
    });
  },
  getVisualizerOverallStats: function getVisualizerOverallStats(_ref23) {
    var indexPatternTitle = _ref23.indexPatternTitle,
        query = _ref23.query,
        timeFieldName = _ref23.timeFieldName,
        earliest = _ref23.earliest,
        latest = _ref23.latest,
        samplerShardSize = _ref23.samplerShardSize,
        aggregatableFields = _ref23.aggregatableFields,
        nonAggregatableFields = _ref23.nonAggregatableFields;
    var body = JSON.stringify({
      query: query,
      timeFieldName: timeFieldName,
      earliest: earliest,
      latest: latest,
      samplerShardSize: samplerShardSize,
      aggregatableFields: aggregatableFields,
      nonAggregatableFields: nonAggregatableFields
    });
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/data_visualizer/get_overall_stats/").concat(indexPatternTitle),
      method: 'POST',
      body: body
    });
  },

  /**
   * Gets a list of calendars
   * @param obj
   * @returns {Promise<Calendar[]>}
   */
  calendars: function calendars(obj) {
    var _ref24 = obj || {},
        calendarId = _ref24.calendarId,
        calendarIds = _ref24.calendarIds;

    var calendarIdsPathComponent = '';

    if (calendarId) {
      calendarIdsPathComponent = "/".concat(calendarId);
    } else if (calendarIds) {
      calendarIdsPathComponent = "/".concat(calendarIds.join(','));
    }

    return (0, _http_service.http)({
      path: "".concat(basePath(), "/calendars").concat(calendarIdsPathComponent),
      method: 'GET'
    });
  },
  addCalendar: function addCalendar(obj) {
    var body = JSON.stringify(obj);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/calendars"),
      method: 'PUT',
      body: body
    });
  },
  updateCalendar: function updateCalendar(obj) {
    var calendarId = obj && obj.calendarId ? "/".concat(obj.calendarId) : '';
    var body = JSON.stringify(obj);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/calendars").concat(calendarId),
      method: 'PUT',
      body: body
    });
  },
  deleteCalendar: function deleteCalendar(_ref25) {
    var calendarId = _ref25.calendarId;
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/calendars/").concat(calendarId),
      method: 'DELETE'
    });
  },
  mlNodeCount: function mlNodeCount() {
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/ml_node_count"),
      method: 'GET'
    });
  },
  mlInfo: function mlInfo() {
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/info"),
      method: 'GET'
    });
  },
  calculateModelMemoryLimit: function calculateModelMemoryLimit(_ref26) {
    var analysisConfig = _ref26.analysisConfig,
        indexPattern = _ref26.indexPattern,
        query = _ref26.query,
        timeFieldName = _ref26.timeFieldName,
        earliestMs = _ref26.earliestMs,
        latestMs = _ref26.latestMs;
    var body = JSON.stringify({
      analysisConfig: analysisConfig,
      indexPattern: indexPattern,
      query: query,
      timeFieldName: timeFieldName,
      earliestMs: earliestMs,
      latestMs: latestMs
    });
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/validate/calculate_model_memory_limit"),
      method: 'POST',
      body: body
    });
  },
  getCardinalityOfFields: function getCardinalityOfFields(_ref27) {
    var index = _ref27.index,
        fieldNames = _ref27.fieldNames,
        query = _ref27.query,
        timeFieldName = _ref27.timeFieldName,
        earliestMs = _ref27.earliestMs,
        latestMs = _ref27.latestMs;
    var body = JSON.stringify({
      index: index,
      fieldNames: fieldNames,
      query: query,
      timeFieldName: timeFieldName,
      earliestMs: earliestMs,
      latestMs: latestMs
    });
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/fields_service/field_cardinality"),
      method: 'POST',
      body: body
    });
  },
  getTimeFieldRange: function getTimeFieldRange(_ref28) {
    var index = _ref28.index,
        timeFieldName = _ref28.timeFieldName,
        query = _ref28.query;
    var body = JSON.stringify({
      index: index,
      timeFieldName: timeFieldName,
      query: query
    });
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/fields_service/time_field_range"),
      method: 'POST',
      body: body
    });
  },
  esSearch: function esSearch(obj) {
    var body = JSON.stringify(obj);
    return (0, _http_service.http)({
      path: "".concat(basePath(), "/es_search"),
      method: 'POST',
      body: body
    });
  },
  esSearch$: function esSearch$(obj) {
    var body = JSON.stringify(obj);
    return (0, _http_service.http$)({
      path: "".concat(basePath(), "/es_search"),
      method: 'POST',
      body: body
    });
  },
  getIndices: function getIndices() {
    var tempBasePath = '/api';
    return (0, _http_service.http)({
      path: "".concat(tempBasePath, "/index_management/indices"),
      method: 'GET'
    });
  },
  annotations: _annotations.annotations,
  dataFrameAnalytics: _data_frame_analytics.dataFrameAnalytics,
  filters: _filters.filters,
  results: _results.results,
  jobs: _jobs.jobs,
  fileDatavisualizer: _datavisualizer.fileDatavisualizer
};
exports.ml = ml;