"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.explorerRoute = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _i18n = require("@kbn/i18n");

var _router = require("../router");

var _use_refresh = require("../use_refresh");

var _use_resolver = require("../use_resolver");

var _resolvers = require("../resolvers");

var _explorer = require("../../explorer");

var _use_selected_cells = require("../../explorer/hooks/use_selected_cells");

var _job_service = require("../../services/job_service");

var _ml_api_service = require("../../services/ml_api_service");

var _actions = require("../../explorer/actions");

var _explorer_dashboard_service = require("../../explorer/explorer_dashboard_service");

var _explorer_utils = require("../../explorer/explorer_utils");

var _select_limit = require("../../explorer/select_limit");

var _use_job_selection = require("../../components/job_selector/use_job_selection");

var _checkbox_showcharts = require("../../components/controls/checkbox_showcharts");

var _select_interval = require("../../components/controls/select_interval");

var _select_severity = require("../../components/controls/select_severity");

var _url_state = require("../../util/url_state");

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

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.ANOMALY_DETECTION_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.anomalyDetection.anomalyExplorerLabel', {
    defaultMessage: 'Anomaly Explorer'
  }),
  href: ''
}];
var explorerRoute = {
  path: '/explorer',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.explorerRoute = explorerRoute;

var PageWrapper = function PageWrapper(_ref) {
  var deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)(undefined, undefined, deps.config, _objectSpread({}, (0, _resolvers.basicResolvers)(deps), {
    jobs: _job_service.mlJobService.loadJobsWrapper,
    jobsWithTimeRange: function jobsWithTimeRange() {
      return _ml_api_service.ml.jobs.jobsWithTimerange((0, _explorer_utils.getDateFormatTz)());
    }
  })),
      context = _useResolver.context,
      results = _useResolver.results;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(ExplorerUrlStateManager, {
    jobsWithTimeRange: results.jobsWithTimeRange.jobs
  }));
};

var ExplorerUrlStateManager = function ExplorerUrlStateManager(_ref2) {
  var _globalState$time, _globalState$time2;

  var jobsWithTimeRange = _ref2.jobsWithTimeRange;

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

  var timefilter = (0, _kibana.useTimefilter)({
    timeRangeSelector: true,
    autoRefreshSelector: true
  });

  var _useJobSelection = (0, _use_job_selection.useJobSelection)(jobsWithTimeRange, (0, _explorer_utils.getDateFormatTz)()),
      jobIds = _useJobSelection.jobIds;

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

  (0, _react.useEffect)(function () {
    if ((globalState === null || globalState === void 0 ? void 0 : globalState.time) !== undefined) {
      timefilter.setTime({
        from: globalState.time.from,
        to: globalState.time.to
      });
      var timefilterBounds = timefilter.getBounds(); // Only if both min/max bounds are valid moment times set the bounds.
      // An invalid string restored from globalState might return `undefined`.

      if ((timefilterBounds === null || timefilterBounds === void 0 ? void 0 : timefilterBounds.min) !== undefined && (timefilterBounds === null || timefilterBounds === void 0 ? void 0 : timefilterBounds.max) !== undefined) {
        _explorer_dashboard_service.explorerService.setBounds(timefilterBounds);
      }
    }
  }, [globalState === null || globalState === void 0 ? void 0 : (_globalState$time = globalState.time) === null || _globalState$time === void 0 ? void 0 : _globalState$time.from, globalState === null || globalState === void 0 ? void 0 : (_globalState$time2 = globalState.time) === null || _globalState$time2 === void 0 ? void 0 : _globalState$time2.to]);
  (0, _react.useEffect)(function () {
    var _appState$mlExplorerS;

    var viewByFieldName = appState === null || appState === void 0 ? void 0 : (_appState$mlExplorerS = appState.mlExplorerSwimlane) === null || _appState$mlExplorerS === void 0 ? void 0 : _appState$mlExplorerS.viewByFieldName;

    if (viewByFieldName !== undefined) {
      _explorer_dashboard_service.explorerService.setViewBySwimlaneFieldName(viewByFieldName);
    }

    var filterData = appState === null || appState === void 0 ? void 0 : appState.mlExplorerFilter;

    if (filterData !== undefined) {
      _explorer_dashboard_service.explorerService.setFilterData(filterData);
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (jobIds.length > 0) {
      _explorer_dashboard_service.explorerService.updateJobSelection(jobIds);
    } else {
      _explorer_dashboard_service.explorerService.clearJobs();
    }
  }, [JSON.stringify(jobIds)]);

  var _useExplorerData = (0, _actions.useExplorerData)(),
      _useExplorerData2 = _slicedToArray(_useExplorerData, 2),
      explorerData = _useExplorerData2[0],
      loadExplorerData = _useExplorerData2[1];

  (0, _react.useEffect)(function () {
    if (explorerData !== undefined && Object.keys(explorerData).length > 0) {
      _explorer_dashboard_service.explorerService.setExplorerData(explorerData);
    }
  }, [explorerData]);
  var explorerAppState = (0, _useObservable.default)(_explorer_dashboard_service.explorerService.appState$);
  (0, _react.useEffect)(function () {
    if (explorerAppState !== undefined && explorerAppState.mlExplorerSwimlane.viewByFieldName !== undefined) {
      setAppState(explorerAppState);
    }
  }, [explorerAppState]);
  var explorerState = (0, _useObservable.default)(_explorer_dashboard_service.explorerService.state$);

  var _useShowCharts = (0, _checkbox_showcharts.useShowCharts)(),
      _useShowCharts2 = _slicedToArray(_useShowCharts, 1),
      showCharts = _useShowCharts2[0];

  var _useTableInterval = (0, _select_interval.useTableInterval)(),
      _useTableInterval2 = _slicedToArray(_useTableInterval, 1),
      tableInterval = _useTableInterval2[0];

  var _useTableSeverity = (0, _select_severity.useTableSeverity)(),
      _useTableSeverity2 = _slicedToArray(_useTableSeverity, 1),
      tableSeverity = _useTableSeverity2[0];

  var _useSwimlaneLimit = (0, _select_limit.useSwimlaneLimit)(),
      _useSwimlaneLimit2 = _slicedToArray(_useSwimlaneLimit, 1),
      swimlaneLimit = _useSwimlaneLimit2[0];

  (0, _react.useEffect)(function () {
    _explorer_dashboard_service.explorerService.setSwimlaneLimit(swimlaneLimit);
  }, [swimlaneLimit]);

  var _useSelectedCells = (0, _use_selected_cells.useSelectedCells)(),
      _useSelectedCells2 = _slicedToArray(_useSelectedCells, 2),
      selectedCells = _useSelectedCells2[0],
      setSelectedCells = _useSelectedCells2[1];

  (0, _react.useEffect)(function () {
    _explorer_dashboard_service.explorerService.setSelectedCells(selectedCells);
  }, [JSON.stringify(selectedCells)]);
  var loadExplorerDataConfig = explorerState !== undefined && {
    bounds: explorerState.bounds,
    lastRefresh: lastRefresh,
    influencersFilterQuery: explorerState.influencersFilterQuery,
    noInfluencersConfigured: explorerState.noInfluencersConfigured,
    selectedCells: selectedCells,
    selectedJobs: explorerState.selectedJobs,
    swimlaneBucketInterval: explorerState.swimlaneBucketInterval,
    swimlaneLimit: explorerState.swimlaneLimit,
    tableInterval: tableInterval.val,
    tableSeverity: tableSeverity.val,
    viewBySwimlaneFieldName: explorerState.viewBySwimlaneFieldName
  } || undefined;
  (0, _react.useEffect)(function () {
    loadExplorerData(loadExplorerDataConfig);
  }, [JSON.stringify(loadExplorerDataConfig)]);

  if (explorerState === undefined || refresh === undefined || showCharts === undefined) {
    return null;
  }

  return _react.default.createElement("div", {
    className: "ml-explorer"
  }, _react.default.createElement(_explorer.Explorer, {
    explorerState: explorerState,
    setSelectedCells: setSelectedCells,
    showCharts: showCharts,
    severity: tableSeverity.val
  }));
};