"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultsContentPage = exports.LogEntryRateResultsContent = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _react = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _log_analysis = require("../../../../common/log_analysis");

var _loading_overlay_wrapper = require("../../../components/loading_overlay_wrapper");

var _use_interval = require("../../../hooks/use_interval");

var _use_kibana_ui_setting = require("../../../utils/use_kibana_ui_setting");

var _anomalies = require("./sections/anomalies");

var _log_rate = require("./sections/log_rate");

var _use_log_entry_rate_module = require("./use_log_entry_rate_module");

var _use_log_entry_rate_results = require("./use_log_entry_rate_results");

var _use_log_entry_rate_results_url_state = require("./use_log_entry_rate_results_url_state");

var _log_analysis_results = require("../../../components/logging/log_analysis_results");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 0 0%;\n\n  .euiFlexGroup--responsive > .euiFlexItem {\n    flex-basis: auto !important;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JOB_STATUS_POLLING_INTERVAL = 30000;

var LogEntryRateResultsContent = function LogEntryRateResultsContent() {
  (0, _public.useTrackPageview)({
    app: 'infra_logs',
    path: 'log_entry_rate_results'
  });
  (0, _public.useTrackPageview)({
    app: 'infra_logs',
    path: 'log_entry_rate_results',
    delay: 15000
  });

  var _useKibanaUiSetting = (0, _use_kibana_ui_setting.useKibanaUiSetting)('dateFormat', 'MMMM D, YYYY h:mm A'),
      _useKibanaUiSetting2 = _slicedToArray(_useKibanaUiSetting, 1),
      dateFormat = _useKibanaUiSetting2[0];

  var _useLogEntryRateModul = (0, _use_log_entry_rate_module.useLogEntryRateModuleContext)(),
      fetchJobStatus = _useLogEntryRateModul.fetchJobStatus,
      jobStatus = _useLogEntryRateModul.jobStatus,
      setupStatus = _useLogEntryRateModul.setupStatus,
      viewSetupForReconfiguration = _useLogEntryRateModul.viewSetupForReconfiguration,
      viewSetupForUpdate = _useLogEntryRateModul.viewSetupForUpdate,
      jobIds = _useLogEntryRateModul.jobIds,
      sourceId = _useLogEntryRateModul.sourceConfiguration.sourceId;

  var _useLogAnalysisResult = (0, _use_log_entry_rate_results_url_state.useLogAnalysisResultsUrlState)(),
      selectedTimeRange = _useLogAnalysisResult.timeRange,
      setSelectedTimeRange = _useLogAnalysisResult.setTimeRange,
      autoRefresh = _useLogAnalysisResult.autoRefresh,
      setAutoRefresh = _useLogAnalysisResult.setAutoRefresh;

  var _useState = (0, _react2.useState)(function () {
    return {
      value: stringToNumericTimeRange(selectedTimeRange),
      lastChangedTime: Date.now()
    };
  }),
      _useState2 = _slicedToArray(_useState, 2),
      queryTimeRange = _useState2[0],
      setQueryTimeRange = _useState2[1];

  var bucketDuration = (0, _react2.useMemo)(function () {
    return getBucketDuration(queryTimeRange.value.startTime, queryTimeRange.value.endTime);
  }, [queryTimeRange.value.endTime, queryTimeRange.value.startTime]);

  var _useLogEntryRateResul = (0, _use_log_entry_rate_results.useLogEntryRateResults)({
    sourceId: sourceId,
    startTime: queryTimeRange.value.startTime,
    endTime: queryTimeRange.value.endTime,
    bucketDuration: bucketDuration
  }),
      getLogEntryRate = _useLogEntryRateResul.getLogEntryRate,
      isLoading = _useLogEntryRateResul.isLoading,
      logEntryRate = _useLogEntryRateResul.logEntryRate;

  var hasResults = (0, _react2.useMemo)(function () {
    var _ref, _logEntryRate$histogr;

    return ((_ref = logEntryRate === null || logEntryRate === void 0 ? void 0 : (_logEntryRate$histogr = logEntryRate.histogramBuckets) === null || _logEntryRate$histogr === void 0 ? void 0 : _logEntryRate$histogr.length) !== null && _ref !== void 0 ? _ref : 0) > 0;
  }, [logEntryRate]);
  var handleQueryTimeRangeChange = (0, _react2.useCallback)(function (_ref2) {
    var startTime = _ref2.start,
        endTime = _ref2.end;
    setQueryTimeRange({
      value: stringToNumericTimeRange({
        startTime: startTime,
        endTime: endTime
      }),
      lastChangedTime: Date.now()
    });
  }, [setQueryTimeRange]);
  var handleSelectedTimeRangeChange = (0, _react2.useCallback)(function (selectedTime) {
    if (selectedTime.isInvalid) {
      return;
    }

    setSelectedTimeRange({
      startTime: selectedTime.start,
      endTime: selectedTime.end
    });
    handleQueryTimeRangeChange(selectedTime);
  }, [setSelectedTimeRange, handleQueryTimeRangeChange]);
  var handleChartTimeRangeChange = (0, _react2.useCallback)(function (_ref3) {
    var startTime = _ref3.startTime,
        endTime = _ref3.endTime;
    handleSelectedTimeRangeChange({
      end: new Date(endTime).toISOString(),
      isInvalid: false,
      start: new Date(startTime).toISOString()
    });
  }, [handleSelectedTimeRangeChange]);
  var handleAutoRefreshChange = (0, _react2.useCallback)(function (_ref4) {
    var isPaused = _ref4.isPaused,
        interval = _ref4.refreshInterval;
    setAutoRefresh({
      isPaused: isPaused,
      interval: interval
    });
  }, [setAutoRefresh]);
  var isFirstUse = (0, _react2.useMemo)(function () {
    return setupStatus === 'hiddenAfterSuccess';
  }, [setupStatus]);
  (0, _react2.useEffect)(function () {
    getLogEntryRate();
  }, [getLogEntryRate, queryTimeRange.lastChangedTime]);
  (0, _use_interval.useInterval)(function () {
    fetchJobStatus();
  }, JOB_STATUS_POLLING_INTERVAL);
  (0, _use_interval.useInterval)(function () {
    handleQueryTimeRangeChange({
      start: selectedTimeRange.startTime,
      end: selectedTimeRange.endTime
    });
  }, autoRefresh.isPaused ? null : autoRefresh.interval);
  return _react2.default.createElement(ResultsContentPage, null, _react2.default.createElement(_eui.EuiFlexGroup, {
    direction: "column"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, logEntryRate ? _react2.default.createElement(_loading_overlay_wrapper.LoadingOverlayWrapper, {
    isLoading: isLoading
  }, _react2.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.analysis.logRateResultsToolbarText",
    defaultMessage: "Analyzed {numberOfLogs} log entries from {startTime} to {endTime}",
    values: {
      numberOfLogs: _react2.default.createElement(_eui.EuiBadge, {
        color: "primary"
      }, _react2.default.createElement(_eui.EuiText, {
        size: "s",
        color: "ghost"
      }, (0, _numeral.default)(logEntryRate.totalNumberOfLogEntries).format('0.00a'))),
      startTime: _react2.default.createElement("b", null, (0, _moment.default)(queryTimeRange.value.startTime).format(dateFormat)),
      endTime: _react2.default.createElement("b", null, (0, _moment.default)(queryTimeRange.value.endTime).format(dateFormat))
    }
  }))) : null), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiSuperDatePicker, {
    start: selectedTimeRange.startTime,
    end: selectedTimeRange.endTime,
    onTimeChange: handleSelectedTimeRangeChange,
    isPaused: autoRefresh.isPaused,
    refreshInterval: autoRefresh.interval,
    onRefreshChange: handleAutoRefreshChange
  }))))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, isFirstUse && !hasResults ? _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_log_analysis_results.FirstUseCallout, null), _react2.default.createElement(_eui.EuiSpacer, null)) : null, _react2.default.createElement(_log_rate.LogRateResults, {
    isLoading: isLoading,
    results: logEntryRate,
    setTimeRange: handleChartTimeRangeChange,
    timeRange: queryTimeRange.value
  }))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react2.default.createElement(_anomalies.AnomaliesResults, {
    isLoading: isLoading,
    jobStatus: jobStatus['log-entry-rate'],
    viewSetupForReconfiguration: viewSetupForReconfiguration,
    viewSetupForUpdate: viewSetupForUpdate,
    results: logEntryRate,
    setTimeRange: handleChartTimeRangeChange,
    setupStatus: setupStatus,
    timeRange: queryTimeRange.value,
    jobId: jobIds['log-entry-rate']
  })))));
};

exports.LogEntryRateResultsContent = LogEntryRateResultsContent;

var stringToNumericTimeRange = function stringToNumericTimeRange(timeRange) {
  return {
    startTime: (0, _moment.default)(_datemath.default.parse(timeRange.startTime, {
      momentInstance: _moment.default
    })).valueOf(),
    endTime: (0, _moment.default)(_datemath.default.parse(timeRange.endTime, {
      momentInstance: _moment.default,
      roundUp: true
    })).valueOf()
  };
};
/**
 * This function takes the current time range in ms,
 * works out the bucket interval we'd need to always
 * display 100 data points, and then takes that new
 * value and works out the nearest multiple of
 * 900000 (15 minutes) to it, so that we don't end up with
 * jaggy bucket boundaries between the ML buckets and our
 * aggregation buckets.
 */


var getBucketDuration = function getBucketDuration(startTime, endTime) {
  var msRange = (0, _moment.default)(endTime).diff((0, _moment.default)(startTime));
  var bucketIntervalInMs = msRange / 100;
  var result = _log_analysis.bucketSpan * Math.round(bucketIntervalInMs / _log_analysis.bucketSpan);
  var roundedResult = parseInt(Number(result).toFixed(0), 10);
  return roundedResult < _log_analysis.bucketSpan ? _log_analysis.bucketSpan : roundedResult;
}; // This is needed due to the flex-basis: 100% !important; rule that
// kicks in on small screens via media queries breaking when using direction="column"


var ResultsContentPage = (0, _public.euiStyled)(_eui.EuiPage)(_templateObject());
exports.ResultsContentPage = ResultsContentPage;