"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeSeriesExplorerUrlStateManager = exports.timeSeriesExplorerRoute = void 0;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactUse = require("react-use");

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var _timeseriesexplorer = require("../../timeseriesexplorer");

var _explorer_utils = require("../../explorer/explorer_utils");

var _ml_api_service = require("../../services/ml_api_service");

var _job_service = require("../../services/job_service");

var _forecast_service = require("../../services/forecast_service");

var _timeseriesexplorer_constants = require("../../timeseriesexplorer/timeseriesexplorer_constants");

var _timeseriesexplorer_utils = require("../../timeseriesexplorer/timeseriesexplorer_utils");

var _timeseriesexplorer_page = require("../../timeseriesexplorer/timeseriesexplorer_page");

var _timeseriesexplorer_no_jobs_found = require("../../timeseriesexplorer/components/timeseriesexplorer_no_jobs_found");

var _url_state = require("../../util/url_state");

var _select_interval = require("../../components/controls/select_interval");

var _select_severity = require("../../components/controls/select_severity");

var _router = require("../router");

var _use_refresh = require("../use_refresh");

var _use_resolver = require("../use_resolver");

var _resolvers = require("../resolvers");

var _breadcrumbs = require("../breadcrumbs");

var _kibana = require("../../contexts/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var timeSeriesExplorerRoute = {
  path: '/timeseriesexplorer',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.ANOMALY_DETECTION_BREADCRUMB, {
    text: _i18n.i18n.translate('xpack.ml.anomalyDetection.singleMetricViewerLabel', {
      defaultMessage: 'Single Metric Viewer'
    }),
    href: ''
  }]
};
exports.timeSeriesExplorerRoute = timeSeriesExplorerRoute;

var PageWrapper = function PageWrapper(_ref) {
  var deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)('', undefined, deps.config, _objectSpread({}, (0, _resolvers.basicResolvers)(deps), {
    jobs: _job_service.mlJobService.loadJobsWrapper,
    jobsWithTimeRange: function jobsWithTimeRange() {
      return _ml_api_service.ml.jobs.jobsWithTimerange((0, _explorer_utils.getDateFormatTz)());
    }
  })),
      context = _useResolver.context,
      results = _useResolver.results;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(TimeSeriesExplorerUrlStateManager, {
    config: deps.config,
    jobsWithTimeRange: results.jobsWithTimeRange.jobs
  }));
};

var TimeSeriesExplorerUrlStateManager = function TimeSeriesExplorerUrlStateManager(_ref2) {
  var _globalState$time, _globalState$time2, _globalState$ml, _appState$mlTimeSerie, _appState$mlTimeSerie2, _appState$mlTimeSerie3, _appState$mlTimeSerie4, _bounds$min, _bounds$max, _appState$mlTimeSerie5;

  var config = _ref2.config,
      jobsWithTimeRange = _ref2.jobsWithTimeRange;

  var _useUrlState = (0, _url_state.useUrlState)('_a'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      appState = _useUrlState2[0],
      setAppState = _useUrlState2[1];

  var _useUrlState3 = (0, _url_state.useUrlState)('_g'),
      _useUrlState4 = _slicedToArray(_useUrlState3, 2),
      globalState = _useUrlState4[0],
      setGlobalState = _useUrlState4[1];

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      lastRefresh = _useState2[0],
      setLastRefresh = _useState2[1];

  var previousRefresh = (0, _reactUse.usePrevious)(lastRefresh);

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedJobId = _useState4[0],
      setSelectedJobId = _useState4[1];

  var timefilter = (0, _kibana.useTimefilter)({
    timeRangeSelector: true,
    autoRefreshSelector: true
  });
  var refresh = (0, _use_refresh.useRefresh)();
  (0, _react.useEffect)(function () {
    if (refresh !== undefined) {
      setLastRefresh(refresh === null || refresh === void 0 ? void 0 : refresh.lastRefresh);

      if (refresh.timeRange !== undefined) {
        var _refresh$timeRange = refresh.timeRange,
            start = _refresh$timeRange.start,
            end = _refresh$timeRange.end;
        setGlobalState('time', {
          from: start,
          to: end
        });
      }
    }
  }, [refresh === null || refresh === void 0 ? void 0 : refresh.lastRefresh]); // We cannot simply infer bounds from the globalState's `time` attribute
  // with `moment` since it can contain custom strings such as `now-15m`.
  // So when globalState's `time` changes, we update the timefilter and use
  // `timefilter.getBounds()` to update `bounds` in this component's state.

  var _useState5 = (0, _react.useState)(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      bounds = _useState6[0],
      setBounds = _useState6[1];

  (0, _react.useEffect)(function () {
    if ((globalState === null || globalState === void 0 ? void 0 : globalState.time) !== undefined) {
      timefilter.setTime({
        from: globalState.time.from,
        to: globalState.time.to
      });
      var timefilterBounds = timefilter.getBounds(); // Only if both min/max bounds are valid moment times set the bounds.
      // An invalid string restored from globalState might return `undefined`.

      if ((timefilterBounds === null || timefilterBounds === void 0 ? void 0 : timefilterBounds.min) !== undefined && (timefilterBounds === null || timefilterBounds === void 0 ? void 0 : timefilterBounds.max) !== undefined) {
        setBounds(timefilter.getBounds());
      }
    }
  }, [globalState === null || globalState === void 0 ? void 0 : (_globalState$time = globalState.time) === null || _globalState$time === void 0 ? void 0 : _globalState$time.from, globalState === null || globalState === void 0 ? void 0 : (_globalState$time2 = globalState.time) === null || _globalState$time2 === void 0 ? void 0 : _globalState$time2.to]);
  var selectedJobIds = globalState === null || globalState === void 0 ? void 0 : (_globalState$ml = globalState.ml) === null || _globalState$ml === void 0 ? void 0 : _globalState$ml.jobIds; // Sort selectedJobIds so we can be sure comparison works when stringifying.

  if (Array.isArray(selectedJobIds)) {
    selectedJobIds.sort();
  } // When changing jobs we'll clear appState (detectorIndex, entities, forecastId).
  // To retore settings from the URL on initial load we also need to check against
  // `previousSelectedJobIds` to avoid wiping appState.


  var previousSelectedJobIds = (0, _reactUse.usePrevious)(selectedJobIds);
  var isJobChange = !(0, _lodash.isEqual)(previousSelectedJobIds, selectedJobIds); // Use a side effect to clear appState when changing jobs.

  (0, _react.useEffect)(function () {
    if (selectedJobIds !== undefined && previousSelectedJobIds !== undefined) {
      setLastRefresh(Date.now());
      appStateHandler(_timeseriesexplorer_constants.APP_STATE_ACTION.CLEAR);
    }

    var validatedJobId = (0, _timeseriesexplorer_utils.validateJobSelection)(jobsWithTimeRange, selectedJobIds, setGlobalState);

    if (typeof validatedJobId === 'string') {
      setSelectedJobId(validatedJobId);
    }
  }, [JSON.stringify(selectedJobIds)]); // Next we get globalState and appState information to pass it on as props later.
  // If a job change is going on, we fall back to defaults (as if appState was already cleared),
  // otherwise the page could break.

  var selectedDetectorIndex = isJobChange ? 0 : +(appState === null || appState === void 0 ? void 0 : (_appState$mlTimeSerie = appState.mlTimeSeriesExplorer) === null || _appState$mlTimeSerie === void 0 ? void 0 : _appState$mlTimeSerie.detectorIndex) || 0;
  var selectedEntities = isJobChange ? undefined : appState === null || appState === void 0 ? void 0 : (_appState$mlTimeSerie2 = appState.mlTimeSeriesExplorer) === null || _appState$mlTimeSerie2 === void 0 ? void 0 : _appState$mlTimeSerie2.entities;
  var selectedForecastId = isJobChange ? undefined : appState === null || appState === void 0 ? void 0 : (_appState$mlTimeSerie3 = appState.mlTimeSeriesExplorer) === null || _appState$mlTimeSerie3 === void 0 ? void 0 : _appState$mlTimeSerie3.forecastId;
  var zoom = isJobChange ? undefined : appState === null || appState === void 0 ? void 0 : (_appState$mlTimeSerie4 = appState.mlTimeSeriesExplorer) === null || _appState$mlTimeSerie4 === void 0 ? void 0 : _appState$mlTimeSerie4.zoom;
  var selectedJob = selectedJobId !== undefined ? _job_service.mlJobService.getJob(selectedJobId) : undefined;
  var timeSeriesJobs = (0, _timeseriesexplorer_utils.createTimeSeriesJobData)(_job_service.mlJobService.jobs);
  var autoZoomDuration;

  if (selectedJobId !== undefined && selectedJob !== undefined) {
    autoZoomDuration = (0, _timeseriesexplorer_utils.getAutoZoomDuration)(timeSeriesJobs, selectedJob);
  }

  var appStateHandler = (0, _react.useCallback)(function (action, payload) {
    var mlTimeSeriesExplorer = (appState === null || appState === void 0 ? void 0 : appState.mlTimeSeriesExplorer) !== undefined ? _objectSpread({}, appState.mlTimeSeriesExplorer) : {};

    switch (action) {
      case _timeseriesexplorer_constants.APP_STATE_ACTION.CLEAR:
        delete mlTimeSeriesExplorer.detectorIndex;
        delete mlTimeSeriesExplorer.entities;
        delete mlTimeSeriesExplorer.forecastId;
        delete mlTimeSeriesExplorer.zoom;
        break;

      case _timeseriesexplorer_constants.APP_STATE_ACTION.SET_DETECTOR_INDEX:
        mlTimeSeriesExplorer.detectorIndex = payload;
        break;

      case _timeseriesexplorer_constants.APP_STATE_ACTION.SET_ENTITIES:
        mlTimeSeriesExplorer.entities = payload;
        break;

      case _timeseriesexplorer_constants.APP_STATE_ACTION.SET_FORECAST_ID:
        mlTimeSeriesExplorer.forecastId = payload;
        delete mlTimeSeriesExplorer.zoom;
        break;

      case _timeseriesexplorer_constants.APP_STATE_ACTION.SET_ZOOM:
        mlTimeSeriesExplorer.zoom = payload;
        break;

      case _timeseriesexplorer_constants.APP_STATE_ACTION.UNSET_ZOOM:
        delete mlTimeSeriesExplorer.zoom;
        break;
    }

    setAppState('mlTimeSeriesExplorer', mlTimeSeriesExplorer);
  }, [JSON.stringify([appState, globalState])]);
  var boundsMinMs = bounds === null || bounds === void 0 ? void 0 : (_bounds$min = bounds.min) === null || _bounds$min === void 0 ? void 0 : _bounds$min.valueOf();
  var boundsMaxMs = bounds === null || bounds === void 0 ? void 0 : (_bounds$max = bounds.max) === null || _bounds$max === void 0 ? void 0 : _bounds$max.valueOf();

  var _useState7 = (0, _react.useState)(appState === null || appState === void 0 ? void 0 : (_appState$mlTimeSerie5 = appState.mlTimeSeriesExplorer) === null || _appState$mlTimeSerie5 === void 0 ? void 0 : _appState$mlTimeSerie5.forecastId),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedForecastIdProp = _useState8[0],
      setSelectedForecastIdProp = _useState8[1];

  (0, _react.useEffect)(function () {
    if (autoZoomDuration !== undefined && boundsMinMs !== undefined && boundsMaxMs !== undefined && selectedJob !== undefined && selectedForecastId !== undefined) {
      if (selectedForecastIdProp !== selectedForecastId) {
        setSelectedForecastIdProp(undefined);
      }

      _forecast_service.mlForecastService.getForecastDateRange(selectedJob, selectedForecastId).then(function (resp) {
        if (autoZoomDuration === undefined) {
          return;
        }

        var earliest = (0, _moment.default)(resp.earliest || boundsMinMs);
        var latest = (0, _moment.default)(resp.latest || boundsMaxMs);

        if (earliest.isBefore((0, _moment.default)(boundsMinMs)) || latest.isAfter((0, _moment.default)(boundsMaxMs))) {
          var earliestMs = Math.min(earliest.valueOf(), boundsMinMs);
          var latestMs = Math.max(latest.valueOf(), boundsMaxMs);
          setGlobalState('time', {
            from: (0, _moment.default)(earliestMs).toISOString(),
            to: (0, _moment.default)(latestMs).toISOString()
          });
        }

        setSelectedForecastIdProp(selectedForecastId);
      }).catch(function (resp) {
        // eslint-disable-next-line no-console
        console.error('Time series explorer - error loading time range of forecast from elasticsearch:', resp);
      });
    }
  }, [selectedForecastId]);

  var _useTableInterval = (0, _select_interval.useTableInterval)(),
      _useTableInterval2 = _slicedToArray(_useTableInterval, 1),
      tableInterval = _useTableInterval2[0];

  var _useTableSeverity = (0, _select_severity.useTableSeverity)(),
      _useTableSeverity2 = _slicedToArray(_useTableSeverity, 1),
      tableSeverity = _useTableSeverity2[0];

  var tzConfig = config.get('dateFormat:tz');
  var dateFormatTz = tzConfig !== 'Browser' ? tzConfig : _moment.default.tz.guess();

  if (timeSeriesJobs.length === 0) {
    return _react.default.createElement(_timeseriesexplorer_page.TimeSeriesExplorerPage, {
      dateFormatTz: dateFormatTz
    }, _react.default.createElement(_timeseriesexplorer_no_jobs_found.TimeseriesexplorerNoJobsFound, null));
  }

  if (selectedJobId === undefined || autoZoomDuration === undefined || bounds === undefined) {
    return null;
  }

  var zoomProp = typeof selectedForecastId === 'string' && selectedForecastIdProp === undefined ? undefined : zoom;
  return _react.default.createElement(_timeseriesexplorer.TimeSeriesExplorer, {
    appStateHandler: appStateHandler,
    autoZoomDuration: autoZoomDuration,
    bounds: bounds,
    dateFormatTz: dateFormatTz,
    lastRefresh: lastRefresh,
    previousRefresh: previousRefresh,
    selectedJobId: selectedJobId,
    selectedDetectorIndex: selectedDetectorIndex,
    selectedEntities: selectedEntities,
    selectedForecastId: selectedForecastIdProp,
    tableInterval: tableInterval.val,
    tableSeverity: tableSeverity.val,
    timefilter: timefilter,
    zoom: zoomProp
  });
};

exports.TimeSeriesExplorerUrlStateManager = TimeSeriesExplorerUrlStateManager;