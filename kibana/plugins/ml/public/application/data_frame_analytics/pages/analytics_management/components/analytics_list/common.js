"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDataFrameAnalyticsFailed = isDataFrameAnalyticsFailed;
exports.isDataFrameAnalyticsRunning = isDataFrameAnalyticsRunning;
exports.isDataFrameAnalyticsStopped = isDataFrameAnalyticsStopped;
exports.isDataFrameAnalyticsStats = isDataFrameAnalyticsStats;
exports.getDataFrameAnalyticsProgress = getDataFrameAnalyticsProgress;
exports.isCompletedAnalyticsJob = isCompletedAnalyticsJob;
exports.getResultsUrl = getResultsUrl;
Object.defineProperty(exports, "Query", {
  enumerable: true,
  get: function get() {
    return _eui.Query;
  }
});
Object.defineProperty(exports, "DATA_FRAME_TASK_STATE", {
  enumerable: true,
  get: function get() {
    return _data_frame_task_state.DATA_FRAME_TASK_STATE;
  }
});
exports.DataFrameAnalyticsListColumn = exports.DATA_FRAME_MODE = void 0;

var _eui = require("@elastic/eui");

var _data_frame_task_state = require("./data_frame_task_state");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DATA_FRAME_MODE;
exports.DATA_FRAME_MODE = DATA_FRAME_MODE;

(function (DATA_FRAME_MODE) {
  DATA_FRAME_MODE["BATCH"] = "batch";
  DATA_FRAME_MODE["CONTINUOUS"] = "continuous";
})(DATA_FRAME_MODE || (exports.DATA_FRAME_MODE = DATA_FRAME_MODE = {}));

function isDataFrameAnalyticsFailed(state) {
  return state === _data_frame_task_state.DATA_FRAME_TASK_STATE.FAILED;
}

function isDataFrameAnalyticsRunning(state) {
  return state === _data_frame_task_state.DATA_FRAME_TASK_STATE.ANALYZING || state === _data_frame_task_state.DATA_FRAME_TASK_STATE.REINDEXING || state === _data_frame_task_state.DATA_FRAME_TASK_STATE.STARTED || state === _data_frame_task_state.DATA_FRAME_TASK_STATE.STARTING;
}

function isDataFrameAnalyticsStopped(state) {
  return state === _data_frame_task_state.DATA_FRAME_TASK_STATE.STOPPED;
}

function isDataFrameAnalyticsStats(arg) {
  return _typeof(arg) === 'object' && arg !== null && {}.hasOwnProperty.call(arg, 'state') && Object.values(_data_frame_task_state.DATA_FRAME_TASK_STATE).includes(arg.state) && {}.hasOwnProperty.call(arg, 'progress') && Array.isArray(arg.progress);
}

function getDataFrameAnalyticsProgress(stats) {
  if (isDataFrameAnalyticsStats(stats)) {
    return Math.round(stats.progress.reduce(function (p, c) {
      return p + c.progress_percent;
    }, 0) / stats.progress.length);
  }

  return undefined;
}

// Used to pass on attribute names to table columns
var DataFrameAnalyticsListColumn;
exports.DataFrameAnalyticsListColumn = DataFrameAnalyticsListColumn;

(function (DataFrameAnalyticsListColumn) {
  DataFrameAnalyticsListColumn["configDestIndex"] = "config.dest.index";
  DataFrameAnalyticsListColumn["configSourceIndex"] = "config.source.index";
  DataFrameAnalyticsListColumn["configCreateTime"] = "config.create_time";
  DataFrameAnalyticsListColumn["description"] = "config.description";
  DataFrameAnalyticsListColumn["id"] = "id";
})(DataFrameAnalyticsListColumn || (exports.DataFrameAnalyticsListColumn = DataFrameAnalyticsListColumn = {}));

function isCompletedAnalyticsJob(stats) {
  var progress = getDataFrameAnalyticsProgress(stats);
  return stats.state === _data_frame_task_state.DATA_FRAME_TASK_STATE.STOPPED && progress === 100;
}

function getResultsUrl(jobId, analysisType) {
  return "ml#/data_frame_analytics/exploration?_g=(ml:(jobId:".concat(jobId, ",analysisType:").concat(analysisType, "))");
}