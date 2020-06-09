"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFocusData = getFocusData;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _ml_api_service = require("../../services/ml_api_service");

var _search = require("../../../../common/constants/search");

var _timeseries_search_service = require("../timeseries_search_service");

var _results_service = require("../../services/results_service");

var _timeseriesexplorer_constants = require("../timeseriesexplorer_constants");

var _timeseriesexplorer_utils = require("./timeseriesexplorer_utils");

var _forecast_service = require("../../services/forecast_service");

var _job_utils = require("../../../../common/util/job_utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getFocusData(criteriaFields, detectorIndex, focusAggregationInterval, forecastId, modelPlotEnabled, nonBlankEntities, searchBounds, selectedJob) {
  return (0, _rxjs.forkJoin)([// Query 1 - load metric data across selected time range.
  _timeseries_search_service.mlTimeSeriesSearchService.getMetricData(selectedJob, detectorIndex, nonBlankEntities, searchBounds.min.valueOf(), searchBounds.max.valueOf(), focusAggregationInterval.expression), // Query 2 - load all the records across selected time range for the chart anomaly markers.
  _results_service.mlResultsService.getRecordsForCriteria([selectedJob.job_id], criteriaFields, 0, searchBounds.min.valueOf(), searchBounds.max.valueOf(), _search.ANOMALIES_TABLE_DEFAULT_QUERY_SIZE), // Query 3 - load any scheduled events for the selected job.
  _results_service.mlResultsService.getScheduledEventsByBucket([selectedJob.job_id], searchBounds.min.valueOf(), searchBounds.max.valueOf(), focusAggregationInterval.expression, 1, _timeseriesexplorer_constants.MAX_SCHEDULED_EVENTS), // Query 4 - load any annotations for the selected job.
  _ml_api_service.ml.annotations.getAnnotations({
    jobIds: [selectedJob.job_id],
    earliestMs: searchBounds.min.valueOf(),
    latestMs: searchBounds.max.valueOf(),
    maxAnnotations: _search.ANNOTATIONS_TABLE_DEFAULT_QUERY_SIZE
  }).pipe((0, _operators.catchError)(function () {
    // silent fail
    return (0, _rxjs.of)({
      annotations: {}
    });
  })), // Plus query for forecast data if there is a forecastId stored in the appState.
  forecastId !== undefined ? function () {
    var aggType;
    var detector = selectedJob.analysis_config.detectors[detectorIndex];
    var esAgg = (0, _job_utils.mlFunctionToESAggregation)(detector.function);

    if (!modelPlotEnabled && (esAgg === 'sum' || esAgg === 'count')) {
      aggType = {
        avg: 'sum',
        max: 'sum',
        min: 'sum'
      };
    }

    return _forecast_service.mlForecastService.getForecastData(selectedJob, detectorIndex, forecastId, nonBlankEntities, searchBounds.min.valueOf(), searchBounds.max.valueOf(), focusAggregationInterval.expression, aggType);
  }() : (0, _rxjs.of)(null)]).pipe((0, _operators.map)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 5),
        metricData = _ref2[0],
        recordsForCriteria = _ref2[1],
        scheduledEventsByBucket = _ref2[2],
        annotations = _ref2[3],
        forecastData = _ref2[4];

    // Sort in descending time order before storing in scope.
    var anomalyRecords = recordsForCriteria.records.sort(function (a, b) {
      return a[_timeseriesexplorer_constants.TIME_FIELD_NAME] - b[_timeseriesexplorer_constants.TIME_FIELD_NAME];
    }).reverse();
    var scheduledEvents = scheduledEventsByBucket.events[selectedJob.job_id];
    var focusChartData = (0, _timeseriesexplorer_utils.processMetricPlotResults)(metricData.results, modelPlotEnabled); // Tell the results container directives to render the focus chart.

    focusChartData = (0, _timeseriesexplorer_utils.processDataForFocusAnomalies)(focusChartData, anomalyRecords, focusAggregationInterval, modelPlotEnabled);
    focusChartData = (0, _timeseriesexplorer_utils.processScheduledEventsForChart)(focusChartData, scheduledEvents);
    var refreshFocusData = {
      scheduledEvents: scheduledEvents,
      anomalyRecords: anomalyRecords,
      focusChartData: focusChartData
    };

    if (annotations) {
      var _annotations$annotati;

      refreshFocusData.focusAnnotationData = ((_annotations$annotati = annotations.annotations[selectedJob.job_id]) !== null && _annotations$annotati !== void 0 ? _annotations$annotati : []).sort(function (a, b) {
        return a.timestamp - b.timestamp;
      }).map(function (d, i) {
        d.key = String.fromCharCode(65 + i);
        return d;
      });
    }

    if (forecastData) {
      refreshFocusData.focusForecastData = (0, _timeseriesexplorer_utils.processForecastResults)(forecastData.results);
      refreshFocusData.showForecastCheckbox = refreshFocusData.focusForecastData.length > 0;
    }

    return refreshFocusData;
  }));
}