"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultsContentPage = exports.LogEntryCategoriesResultsContent = void 0;

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../src/plugins/kibana_react/public");

var _public2 = require("../../../../../observability/public");

var _log_analysis_job_status = require("../../../components/logging/log_analysis_job_status");

var _log_analysis_results = require("../../../components/logging/log_analysis_results");

var _use_interval = require("../../../hooks/use_interval");

var _top_categories = require("./sections/top_categories");

var _use_log_entry_categories_module = require("./use_log_entry_categories_module");

var _use_log_entry_categories_results = require("./use_log_entry_categories_results");

var _use_log_entry_categories_results_url_state = require("./use_log_entry_categories_results_url_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  flex: 1 0 0%;\n  flex-direction: column;\n\n  .euiFlexGroup--responsive > .euiFlexItem {\n    flex-basis: auto !important;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JOB_STATUS_POLLING_INTERVAL = 30000;

var LogEntryCategoriesResultsContent = function LogEntryCategoriesResultsContent() {
  (0, _public2.useTrackPageview)({
    app: 'infra_logs',
    path: 'log_entry_categories_results'
  });
  (0, _public2.useTrackPageview)({
    app: 'infra_logs',
    path: 'log_entry_categories_results',
    delay: 15000
  });

  var _useLogEntryCategorie = (0, _use_log_entry_categories_module.useLogEntryCategoriesModuleContext)(),
      fetchJobStatus = _useLogEntryCategorie.fetchJobStatus,
      jobStatus = _useLogEntryCategorie.jobStatus,
      setupStatus = _useLogEntryCategorie.setupStatus,
      viewSetupForReconfiguration = _useLogEntryCategorie.viewSetupForReconfiguration,
      viewSetupForUpdate = _useLogEntryCategorie.viewSetupForUpdate,
      jobIds = _useLogEntryCategorie.jobIds,
      sourceId = _useLogEntryCategorie.sourceConfiguration.sourceId;

  var _useLogEntryCategorie2 = (0, _use_log_entry_categories_results_url_state.useLogEntryCategoriesResultsUrlState)(),
      selectedTimeRange = _useLogEntryCategorie2.timeRange,
      setSelectedTimeRange = _useLogEntryCategorie2.setTimeRange,
      autoRefresh = _useLogEntryCategorie2.autoRefresh,
      setAutoRefresh = _useLogEntryCategorie2.setAutoRefresh;

  var _useState = (0, _react.useState)(function () {
    return {
      lastChangedTime: Date.now(),
      timeRange: stringToNumericTimeRange(selectedTimeRange)
    };
  }),
      _useState2 = _slicedToArray(_useState, 2),
      categoryQueryTimeRange = _useState2[0],
      setCategoryQueryTimeRange = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      categoryQueryDatasets = _useState4[0],
      setCategoryQueryDatasets = _useState4[1];

  var _useKibana = (0, _public.useKibana)(),
      services = _useKibana.services;

  var showLoadDataErrorNotification = (0, _react.useCallback)(function (error) {
    var _services$notificatio;

    // eslint-disable-next-line no-unused-expressions
    (_services$notificatio = services.notifications) === null || _services$notificatio === void 0 ? void 0 : _services$notificatio.toasts.addError(error, {
      title: loadDataErrorTitle
    });
  }, [services.notifications]);

  var _useLogEntryCategorie3 = (0, _use_log_entry_categories_results.useLogEntryCategoriesResults)({
    categoriesCount: 25,
    endTime: categoryQueryTimeRange.timeRange.endTime,
    filteredDatasets: categoryQueryDatasets,
    onGetTopLogEntryCategoriesError: showLoadDataErrorNotification,
    sourceId: sourceId,
    startTime: categoryQueryTimeRange.timeRange.startTime
  }),
      getLogEntryCategoryDatasets = _useLogEntryCategorie3.getLogEntryCategoryDatasets,
      getTopLogEntryCategories = _useLogEntryCategorie3.getTopLogEntryCategories,
      isLoadingLogEntryCategoryDatasets = _useLogEntryCategorie3.isLoadingLogEntryCategoryDatasets,
      isLoadingTopLogEntryCategories = _useLogEntryCategorie3.isLoadingTopLogEntryCategories,
      logEntryCategoryDatasets = _useLogEntryCategorie3.logEntryCategoryDatasets,
      topLogEntryCategories = _useLogEntryCategorie3.topLogEntryCategories;

  var handleQueryTimeRangeChange = (0, _react.useCallback)(function (_ref) {
    var startTime = _ref.start,
        endTime = _ref.end;
    setCategoryQueryTimeRange(function (previousQueryParameters) {
      return _objectSpread({}, previousQueryParameters, {
        timeRange: stringToNumericTimeRange({
          startTime: startTime,
          endTime: endTime
        }),
        lastChangedTime: Date.now()
      });
    });
  }, [setCategoryQueryTimeRange]);
  var handleSelectedTimeRangeChange = (0, _react.useCallback)(function (selectedTime) {
    if (selectedTime.isInvalid) {
      return;
    }

    setSelectedTimeRange({
      startTime: selectedTime.start,
      endTime: selectedTime.end
    });
    handleQueryTimeRangeChange(selectedTime);
  }, [setSelectedTimeRange, handleQueryTimeRangeChange]);
  var handleAutoRefreshChange = (0, _react.useCallback)(function (_ref2) {
    var isPaused = _ref2.isPaused,
        interval = _ref2.refreshInterval;
    setAutoRefresh({
      isPaused: isPaused,
      interval: interval
    });
  }, [setAutoRefresh]);
  var isFirstUse = (0, _react.useMemo)(function () {
    return setupStatus === 'hiddenAfterSuccess';
  }, [setupStatus]);
  var hasResults = (0, _react.useMemo)(function () {
    return topLogEntryCategories.length > 0;
  }, [topLogEntryCategories.length]);
  (0, _react.useEffect)(function () {
    getTopLogEntryCategories();
  }, [getTopLogEntryCategories, categoryQueryDatasets, categoryQueryTimeRange.lastChangedTime]);
  (0, _react.useEffect)(function () {
    getLogEntryCategoryDatasets();
  }, [getLogEntryCategoryDatasets, categoryQueryTimeRange.lastChangedTime]);
  (0, _use_interval.useInterval)(function () {
    fetchJobStatus();
  }, JOB_STATUS_POLLING_INTERVAL);
  (0, _use_interval.useInterval)(function () {
    handleQueryTimeRangeChange({
      start: selectedTimeRange.startTime,
      end: selectedTimeRange.endTime
    });
  }, autoRefresh.isPaused ? null : autoRefresh.interval);
  return _react.default.createElement(ResultsContentPage, null, _react.default.createElement(_eui.EuiFlexGroup, {
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSuperDatePicker, {
    start: selectedTimeRange.startTime,
    end: selectedTimeRange.endTime,
    onTimeChange: handleSelectedTimeRangeChange,
    isPaused: autoRefresh.isPaused,
    refreshInterval: autoRefresh.interval,
    onRefreshChange: handleAutoRefreshChange
  }))))), (0, _log_analysis_job_status.jobHasProblem)(jobStatus['log-entry-categories-count'], setupStatus) ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_analysis_job_status.LogAnalysisJobProblemIndicator, {
    jobStatus: jobStatus['log-entry-categories-count'],
    onRecreateMlJobForReconfiguration: viewSetupForReconfiguration,
    onRecreateMlJobForUpdate: viewSetupForUpdate,
    setupStatus: setupStatus
  })) : null, isFirstUse && !hasResults ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_log_analysis_results.FirstUseCallout, null)) : null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiPanel, {
    paddingSize: "m"
  }, _react.default.createElement(_top_categories.TopCategoriesSection, {
    availableDatasets: logEntryCategoryDatasets,
    isLoadingDatasets: isLoadingLogEntryCategoryDatasets,
    isLoadingTopCategories: isLoadingTopLogEntryCategories,
    jobId: jobIds['log-entry-categories-count'],
    onChangeDatasetSelection: setCategoryQueryDatasets,
    onRequestRecreateMlJob: viewSetupForReconfiguration,
    selectedDatasets: categoryQueryDatasets,
    sourceId: sourceId,
    timeRange: categoryQueryTimeRange.timeRange,
    topCategories: topLogEntryCategories
  })))));
};

exports.LogEntryCategoriesResultsContent = LogEntryCategoriesResultsContent;

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
}; // This is needed due to the flex-basis: 100% !important; rule that
// kicks in on small screens via media queries breaking when using direction="column"


var ResultsContentPage = (0, _public2.euiStyled)(_eui.EuiPage)(_templateObject());
exports.ResultsContentPage = ResultsContentPage;

var loadDataErrorTitle = _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.loadDataErrorTitle', {
  defaultMessage: 'Failed to load category data'
});