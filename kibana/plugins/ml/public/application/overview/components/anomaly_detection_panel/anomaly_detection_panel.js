"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomalyDetectionPanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _moment = _interopRequireDefault(require("moment"));

var _kibana = require("../../../contexts/kibana");

var _table = require("./table");

var _ml_api_service = require("../../../services/ml_api_service");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createJobLink = '#/jobs/new_job/step/index_or_search';

function getDefaultAnomalyScores(groups) {
  var anomalyScores = {};
  groups.forEach(function (group) {
    anomalyScores[group.id] = {
      maxScore: 0
    };
  });
  return anomalyScores;
}

var AnomalyDetectionPanel = function AnomalyDetectionPanel(_ref) {
  var jobCreationDisabled = _ref.jobCreationDisabled;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      notifications = _useMlKibana.services.notifications;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      groups = _useState4[0],
      setGroups = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      groupsCount = _useState6[0],
      setGroupsCount = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      jobsList = _useState8[0],
      setJobsList = _useState8[1];

  var _useState9 = (0, _react.useState)(undefined),
      _useState10 = _slicedToArray(_useState9, 2),
      statsBarData = _useState10[0],
      setStatsBarData = _useState10[1];

  var _useState11 = (0, _react.useState)(undefined),
      _useState12 = _slicedToArray(_useState11, 2),
      errorMessage = _useState12[0],
      setErrorMessage = _useState12[1];

  var loadJobs =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var jobsResult, jobsSummaryList, _getGroupsFromJobs, jobsGroups, count, jobsWithTimerange, stats;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              _context.prev = 1;
              _context.next = 4;
              return _ml_api_service.ml.jobs.jobsSummary([]);

            case 4:
              jobsResult = _context.sent;
              jobsSummaryList = jobsResult.map(function (job) {
                job.latestTimestampSortValue = job.latestTimestampMs || 0;
                return job;
              });
              _getGroupsFromJobs = (0, _utils.getGroupsFromJobs)(jobsSummaryList), jobsGroups = _getGroupsFromJobs.groups, count = _getGroupsFromJobs.count;
              jobsWithTimerange = (0, _utils.getJobsWithTimerange)(jobsSummaryList);
              stats = (0, _utils.getStatsBarData)(jobsSummaryList);
              setIsLoading(false);
              setErrorMessage(undefined);
              setStatsBarData(stats);
              setGroupsCount(count);
              setGroups(jobsGroups);
              setJobsList(jobsWithTimerange);
              loadMaxAnomalyScores(jobsGroups);
              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](1);
              setErrorMessage(_context.t0.message !== undefined ? _context.t0.message : JSON.stringify(_context.t0));
              setIsLoading(false);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 18]]);
    }));

    return function loadJobs() {
      return _ref2.apply(this, arguments);
    };
  }();

  var loadMaxAnomalyScores =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(groupsObject) {
      var groupsList, scores, promises, results, tempGroups, toasts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              groupsList = Object.values(groupsObject);
              scores = getDefaultAnomalyScores(groupsList);
              _context2.prev = 2;
              promises = groupsList.filter(function (group) {
                return group.jobIds.length > 0;
              }).map(function (group, i) {
                scores[group.id].index = i;
                var latestTimestamp = group.latest_timestamp;
                var startMoment = (0, _moment.default)(latestTimestamp);
                var twentyFourHoursAgo = startMoment.subtract(24, 'hours').valueOf();
                return _ml_api_service.ml.results.getMaxAnomalyScore(group.jobIds, twentyFourHoursAgo, latestTimestamp);
              });
              _context2.next = 6;
              return Promise.all(promises);

            case 6:
              results = _context2.sent;
              tempGroups = _objectSpread({}, groupsObject); // Check results for each group's promise index and update state

              Object.keys(scores).forEach(function (groupId) {
                var resultsIndex = scores[groupId] && scores[groupId].index; // maxScore will be null if it was not loaded correctly

                var _ref4 = resultsIndex !== undefined && results[resultsIndex],
                    maxScore = _ref4.maxScore;

                tempGroups[groupId].max_anomaly_score = maxScore;
              });
              setGroups(tempGroups);
              _context2.next = 16;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](2);
              toasts = notifications.toasts;
              toasts.addDanger(_i18n.i18n.translate('xpack.ml.overview.anomalyDetection.errorWithFetchingAnomalyScoreNotificationErrorMessage', {
                defaultMessage: 'An error occurred fetching anomaly scores: {error}',
                values: {
                  error: _context2.t0.message !== undefined ? _context2.t0.message : JSON.stringify(_context2.t0)
                }
              }));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 12]]);
    }));

    return function loadMaxAnomalyScores(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    loadJobs();
  }, []);

  var onRefresh = function onRefresh() {
    loadJobs();
  };

  var errorDisplay = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.errorPromptTitle', {
      defaultMessage: 'An error occurred getting the anomaly detection jobs list.'
    }),
    color: "danger",
    iconType: "alert"
  }, _react.default.createElement("pre", null, errorMessage)));

  var panelClass = isLoading ? 'mlOverviewPanel__isLoading' : 'mlOverviewPanel';
  return _react.default.createElement(_eui.EuiPanel, {
    className: panelClass
  }, typeof errorMessage !== 'undefined' && errorDisplay, isLoading && _react.default.createElement(_eui.EuiLoadingSpinner, {
    className: "mlOverviewPanel__spinner",
    size: "xl"
  }), "\xA0\xA0\xA0", isLoading === false && typeof errorMessage === 'undefined' && groupsCount === 0 && _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "createSingleMetricJob",
    title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.createFirstJobMessage', {
      defaultMessage: 'Create your first anomaly detection job'
    })),
    body: _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.emptyPromptText', {
      defaultMessage: "Machine learning makes it easy to detect anomalies in time series data stored in Elasticsearch. Track one metric from a single machine or hundreds of metrics across thousands of machines. Start automatically spotting the anomalies hiding in your data and resolve issues faster."
    }))),
    actions: _react.default.createElement(_eui.EuiButton, {
      color: "primary",
      href: createJobLink,
      fill: true,
      iconType: "plusInCircle",
      isDisabled: jobCreationDisabled
    }, _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.createJobButtonText', {
      defaultMessage: 'Create job'
    }))
  }), isLoading === false && typeof errorMessage === 'undefined' && groupsCount > 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_table.AnomalyDetectionTable, {
    items: groups,
    jobsList: jobsList,
    statsBarData: statsBarData
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement("div", {
    className: "mlOverviewPanel__buttons"
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    onClick: onRefresh,
    className: "mlOverviewPanel__refreshButton"
  }, _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.refreshJobsButtonText', {
    defaultMessage: 'Refresh'
  })), _react.default.createElement(_eui.EuiButton, {
    size: "s",
    fill: true,
    href: "#/jobs?"
  }, _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.manageJobsButtonText', {
    defaultMessage: 'Manage jobs'
  })))));
};

exports.AnomalyDetectionPanel = AnomalyDetectionPanel;