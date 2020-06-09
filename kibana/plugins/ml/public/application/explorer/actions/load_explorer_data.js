"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExplorerData = exports.isLoadExplorerDataConfig = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _lodash = require("lodash");

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _explorer_charts_container_service = require("../explorer_charts/explorer_charts_container_service");

var _explorer_dashboard_service = require("../explorer_dashboard_service");

var _explorer_utils = require("../explorer_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Memoize the data fetching methods.
// wrapWithLastRefreshArg() wraps any given function and preprends a `lastRefresh` argument
// which will be considered by memoizeOne. This way we can add the `lastRefresh` argument as a
// caching parameter without having to change all the original functions which shouldn't care
// about this parameter. The generic type T retains and returns the type information of
// the original function.
var memoizeIsEqual = function memoizeIsEqual(newArgs, lastArgs) {
  return (0, _lodash.isEqual)(newArgs, lastArgs);
};

var wrapWithLastRefreshArg = function wrapWithLastRefreshArg(func) {
  return function (lastRefresh) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return func.apply(null, args);
  };
};

var memoize = function memoize(func) {
  return (0, _memoizeOne.default)(wrapWithLastRefreshArg(func), memoizeIsEqual);
};

var memoizedAnomalyDataChange = memoize(_explorer_charts_container_service.anomalyDataChange);
var memoizedLoadAnnotationsTableData = memoize(_explorer_utils.loadAnnotationsTableData);
var memoizedLoadDataForCharts = memoize(_explorer_utils.loadDataForCharts);
var memoizedLoadFilteredTopInfluencers = memoize(_explorer_utils.loadFilteredTopInfluencers);
var memoizedLoadOverallData = memoize(_explorer_utils.loadOverallData);
var memoizedLoadTopInfluencers = memoize(_explorer_utils.loadTopInfluencers);
var memoizedLoadViewBySwimlane = memoize(_explorer_utils.loadViewBySwimlane);
var memoizedLoadAnomaliesTableData = memoize(_explorer_utils.loadAnomaliesTableData);

var isLoadExplorerDataConfig = function isLoadExplorerDataConfig(arg) {
  return arg !== undefined && arg.bounds !== undefined && arg.selectedJobs !== undefined && arg.selectedJobs !== null && arg.viewBySwimlaneFieldName !== undefined;
};
/**
 * Fetches the data necessary for the Anomaly Explorer using observables.
 *
 * @param config LoadExplorerDataConfig
 *
 * @return Partial<ExplorerState>
 */


exports.isLoadExplorerDataConfig = isLoadExplorerDataConfig;

function loadExplorerData(config) {
  if (!isLoadExplorerDataConfig(config)) {
    return (0, _rxjs.of)({});
  }

  var bounds = config.bounds,
      lastRefresh = config.lastRefresh,
      influencersFilterQuery = config.influencersFilterQuery,
      noInfluencersConfigured = config.noInfluencersConfigured,
      selectedCells = config.selectedCells,
      selectedJobs = config.selectedJobs,
      swimlaneBucketInterval = config.swimlaneBucketInterval,
      swimlaneLimit = config.swimlaneLimit,
      tableInterval = config.tableInterval,
      tableSeverity = config.tableSeverity,
      viewBySwimlaneFieldName = config.viewBySwimlaneFieldName;
  var selectionInfluencers = (0, _explorer_utils.getSelectionInfluencers)(selectedCells, viewBySwimlaneFieldName);
  var jobIds = (0, _explorer_utils.getSelectionJobIds)(selectedCells, selectedJobs);
  var timerange = (0, _explorer_utils.getSelectionTimeRange)(selectedCells, swimlaneBucketInterval.asSeconds(), bounds);
  var dateFormatTz = (0, _explorer_utils.getDateFormatTz)(); // First get the data where we have all necessary args at hand using forkJoin:
  // annotationsData, anomalyChartRecords, influencers, overallState, tableData, topFieldValues

  return (0, _rxjs.forkJoin)({
    annotationsData: memoizedLoadAnnotationsTableData(lastRefresh, selectedCells, selectedJobs, swimlaneBucketInterval.asSeconds(), bounds),
    anomalyChartRecords: memoizedLoadDataForCharts(lastRefresh, jobIds, timerange.earliestMs, timerange.latestMs, selectionInfluencers, selectedCells, influencersFilterQuery),
    influencers: selectionInfluencers.length === 0 ? memoizedLoadTopInfluencers(lastRefresh, jobIds, timerange.earliestMs, timerange.latestMs, [], noInfluencersConfigured, influencersFilterQuery) : Promise.resolve({}),
    overallState: memoizedLoadOverallData(lastRefresh, selectedJobs, swimlaneBucketInterval, bounds),
    tableData: memoizedLoadAnomaliesTableData(lastRefresh, selectedCells, selectedJobs, dateFormatTz, swimlaneBucketInterval.asSeconds(), bounds, viewBySwimlaneFieldName, tableInterval, tableSeverity, influencersFilterQuery),
    topFieldValues: selectedCells !== undefined && selectedCells.showTopFieldValues === true ? (0, _explorer_utils.loadViewByTopFieldValuesForSelectedTime)(timerange.earliestMs, timerange.latestMs, selectedJobs, viewBySwimlaneFieldName, swimlaneLimit, noInfluencersConfigured) : Promise.resolve([])
  }).pipe( // Trigger a side-effect action to reset view-by swimlane,
  // show the view-by loading indicator
  // and pass on the data we already fetched.
  (0, _operators.tap)(_explorer_dashboard_service.explorerService.setViewBySwimlaneLoading), // Trigger a side-effect to update the charts.
  (0, _operators.tap)(function (_ref) {
    var anomalyChartRecords = _ref.anomalyChartRecords;

    if (selectedCells !== undefined && Array.isArray(anomalyChartRecords)) {
      memoizedAnomalyDataChange(lastRefresh, anomalyChartRecords, timerange.earliestMs, timerange.latestMs, tableSeverity);
    } else {
      memoizedAnomalyDataChange(lastRefresh, [], timerange.earliestMs, timerange.latestMs, tableSeverity);
    }
  }), // Load view-by swimlane data and filtered top influencers.
  // mergeMap is used to have access to the already fetched data and act on it in arg #1.
  // In arg #2 of mergeMap we combine the data and pass it on in the action format
  // which can be consumed by explorerReducer() later on.
  (0, _operators.mergeMap)(function (_ref2) {
    var anomalyChartRecords = _ref2.anomalyChartRecords,
        influencers = _ref2.influencers,
        overallState = _ref2.overallState,
        topFieldValues = _ref2.topFieldValues;
    return (0, _rxjs.forkJoin)({
      influencers: (selectionInfluencers.length > 0 || influencersFilterQuery !== undefined) && anomalyChartRecords !== undefined && anomalyChartRecords.length > 0 ? memoizedLoadFilteredTopInfluencers(lastRefresh, jobIds, timerange.earliestMs, timerange.latestMs, anomalyChartRecords, selectionInfluencers, noInfluencersConfigured, influencersFilterQuery) : Promise.resolve(influencers),
      viewBySwimlaneState: memoizedLoadViewBySwimlane(lastRefresh, topFieldValues, {
        earliest: overallState.overallSwimlaneData.earliest,
        latest: overallState.overallSwimlaneData.latest
      }, selectedJobs, viewBySwimlaneFieldName, swimlaneLimit, influencersFilterQuery, noInfluencersConfigured)
    });
  }, function (_ref3, _ref4) {
    var annotationsData = _ref3.annotationsData,
        overallState = _ref3.overallState,
        tableData = _ref3.tableData;
    var influencers = _ref4.influencers,
        viewBySwimlaneState = _ref4.viewBySwimlaneState;
    return _objectSpread({
      annotationsData: annotationsData,
      influencers: influencers
    }, overallState, {}, viewBySwimlaneState, {
      tableData: tableData
    });
  }));
}

var loadExplorerData$ = new _rxjs.Subject();
var explorerData$ = loadExplorerData$.pipe((0, _operators.switchMap)(function (config) {
  return loadExplorerData(config);
}));

var useExplorerData = function useExplorerData() {
  var explorerData = (0, _useObservable.default)(explorerData$);
  return [explorerData, function (c) {
    return loadExplorerData$.next(c);
  }];
};

exports.useExplorerData = useExplorerData;