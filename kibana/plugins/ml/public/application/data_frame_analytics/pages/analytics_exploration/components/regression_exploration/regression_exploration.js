"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressionExploration = exports.ExplorationTitle = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _ml_api_service = require("../../../../../services/ml_api_service");

var _evaluate_panel = require("./evaluate_panel");

var _results_table = require("./results_table");

var _analytics = require("../../../../common/analytics");

var _loading_panel = require("../loading_panel");

var _index_utils = require("../../../../../util/index_utils");

var _new_job_capabilities_service = require("../../../../../services/new_job_capabilities_service");

var _ml = require("../../../../../contexts/ml");

var _get_analytics = require("../../../analytics_management/services/analytics_service/get_analytics");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ExplorationTitle = function ExplorationTitle(_ref) {
  var jobId = _ref.jobId;
  return _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.tableJobIdTitle', {
    defaultMessage: 'Destination index for regression job ID {jobId}',
    values: {
      jobId: jobId
    }
  })));
};

exports.ExplorationTitle = ExplorationTitle;

var jobConfigErrorTitle = _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.jobConfigurationFetchError', {
  defaultMessage: 'Unable to fetch results. An error occurred loading the job configuration data.'
});

var jobCapsErrorTitle = _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.jobCapsFetchError', {
  defaultMessage: "Unable to fetch results. An error occurred loading the index's field data."
});

var RegressionExploration = function RegressionExploration(_ref2) {
  var jobId = _ref2.jobId;

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      jobConfig = _useState2[0],
      setJobConfig = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      jobStatus = _useState4[0],
      setJobStatus = _useState4[1];

  var _useState5 = (0, _react.useState)(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      indexPattern = _useState6[0],
      setIndexPattern = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isLoadingJobConfig = _useState8[0],
      setIsLoadingJobConfig = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isInitialized = _useState10[0],
      setIsInitialized = _useState10[1];

  var _useState11 = (0, _react.useState)(undefined),
      _useState12 = _slicedToArray(_useState11, 2),
      jobConfigErrorMessage = _useState12[0],
      setJobConfigErrorMessage = _useState12[1];

  var _useState13 = (0, _react.useState)(undefined),
      _useState14 = _slicedToArray(_useState13, 2),
      jobCapsServiceErrorMessage = _useState14[0],
      setJobCapsServiceErrorMessage = _useState14[1];

  var _useState15 = (0, _react.useState)(_analytics.defaultSearchQuery),
      _useState16 = _slicedToArray(_useState15, 2),
      searchQuery = _useState16[0],
      setSearchQuery = _useState16[1];

  var mlContext = (0, _ml.useMlContext)();

  var loadJobConfig =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var analyticsConfigs, analyticsStats, stats;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoadingJobConfig(true);
              _context.prev = 1;
              _context.next = 4;
              return _ml_api_service.ml.dataFrameAnalytics.getDataFrameAnalytics(jobId);

            case 4:
              analyticsConfigs = _context.sent;
              _context.next = 7;
              return _ml_api_service.ml.dataFrameAnalytics.getDataFrameAnalyticsStats(jobId);

            case 7:
              analyticsStats = _context.sent;
              stats = (0, _get_analytics.isGetDataFrameAnalyticsStatsResponseOk)(analyticsStats) ? analyticsStats.data_frame_analytics[0] : undefined;

              if (stats !== undefined && stats.state) {
                setJobStatus(stats.state);
              }

              if (Array.isArray(analyticsConfigs.data_frame_analytics) && analyticsConfigs.data_frame_analytics.length > 0) {
                setJobConfig(analyticsConfigs.data_frame_analytics[0]);
                setIsLoadingJobConfig(false);
              }

              _context.next = 17;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](1);

              if (_context.t0.message !== undefined) {
                setJobConfigErrorMessage(_context.t0.message);
              } else {
                setJobConfigErrorMessage(JSON.stringify(_context.t0));
              }

              setIsLoadingJobConfig(false);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 13]]);
    }));

    return function loadJobConfig() {
      return _ref3.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    loadJobConfig();
  }, []);

  var initializeJobCapsService =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var destIndex, destIndexPatternId, indexP, sourceIndex, sourceIndexPatternId;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(jobConfig !== undefined)) {
                _context2.next = 29;
                break;
              }

              _context2.prev = 1;
              destIndex = Array.isArray(jobConfig.dest.index) ? jobConfig.dest.index[0] : jobConfig.dest.index;
              destIndexPatternId = (0, _index_utils.getIndexPatternIdFromName)(destIndex) || destIndex;
              _context2.prev = 4;
              _context2.next = 7;
              return mlContext.indexPatterns.get(destIndexPatternId);

            case 7:
              indexP = _context2.sent;
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](4);
              indexP = undefined;

            case 13:
              if (!(indexP === undefined)) {
                _context2.next = 19;
                break;
              }

              sourceIndex = jobConfig.source.index[0];
              sourceIndexPatternId = (0, _index_utils.getIndexPatternIdFromName)(sourceIndex) || sourceIndex;
              _context2.next = 18;
              return mlContext.indexPatterns.get(sourceIndexPatternId);

            case 18:
              indexP = _context2.sent;

            case 19:
              if (!(indexP !== undefined)) {
                _context2.next = 23;
                break;
              }

              setIndexPattern(indexP);
              _context2.next = 23;
              return _new_job_capabilities_service.newJobCapsService.initializeFromIndexPattern(indexP, false, false);

            case 23:
              setIsInitialized(true);
              _context2.next = 29;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t1 = _context2["catch"](1);

              if (_context2.t1.message !== undefined) {
                setJobCapsServiceErrorMessage(_context2.t1.message);
              } else {
                setJobCapsServiceErrorMessage(JSON.stringify(_context2.t1));
              }

            case 29:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 26], [4, 10]]);
    }));

    return function initializeJobCapsService() {
      return _ref4.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    initializeJobCapsService();
  }, [jobConfig && jobConfig.id]);

  if (jobConfigErrorMessage !== undefined || jobCapsServiceErrorMessage !== undefined) {
    return _react.default.createElement(_eui.EuiPanel, {
      grow: false
    }, _react.default.createElement(ExplorationTitle, {
      jobId: jobId
    }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
      title: jobConfigErrorMessage ? jobConfigErrorTitle : jobCapsErrorTitle,
      color: "danger",
      iconType: "cross"
    }, _react.default.createElement("p", null, jobConfigErrorMessage ? jobConfigErrorMessage : jobCapsServiceErrorMessage)));
  }

  return _react.default.createElement(_react.Fragment, null, isLoadingJobConfig === true && jobConfig === undefined && _react.default.createElement(_loading_panel.LoadingPanel, null), isLoadingJobConfig === false && jobConfig !== undefined && isInitialized === true && _react.default.createElement(_evaluate_panel.EvaluatePanel, {
    jobConfig: jobConfig,
    jobStatus: jobStatus,
    searchQuery: searchQuery
  }), _react.default.createElement(_eui.EuiSpacer, null), isLoadingJobConfig === true && jobConfig === undefined && _react.default.createElement(_loading_panel.LoadingPanel, null), isLoadingJobConfig === false && jobConfig !== undefined && indexPattern !== undefined && isInitialized === true && _react.default.createElement(_results_table.ResultsTable, {
    jobConfig: jobConfig,
    indexPattern: indexPattern,
    jobStatus: jobStatus,
    setEvaluateSearchQuery: setSearchQuery
  }));
};

exports.RegressionExploration = RegressionExploration;