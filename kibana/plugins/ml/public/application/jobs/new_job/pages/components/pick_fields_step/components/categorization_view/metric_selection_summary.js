"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategorizationDetectorsSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _job_creator_context = require("../../../job_creator_context");

var _event_rate_chart = require("../../../charts/event_rate_chart");

var _top_categories = require("./top_categories");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DTR_IDX = 0;

var CategorizationDetectorsSummary = function CategorizationDetectorsSummary() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      chartLoader = _useContext.chartLoader,
      resultsLoader = _useContext.resultsLoader,
      chartInterval = _useContext.chartInterval;

  var jobCreator = jc;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loadingData = _useState2[0],
      setLoadingData = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      anomalyData = _useState4[0],
      setAnomalyData = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      eventRateChartData = _useState6[0],
      setEventRateChartData = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      jobIsRunning = _useState8[0],
      setJobIsRunning = _useState8[1];

  function setResultsWrapper(results) {
    var anomalies = results.anomalies[DTR_IDX];

    if (anomalies !== undefined) {
      setAnomalyData(anomalies);
    }
  }

  function watchProgress(progress) {
    setJobIsRunning(progress > 0);
  }

  (0, _react.useEffect)(function () {
    // subscribe to progress and results
    var resultsSubscription = resultsLoader.subscribeToResults(setResultsWrapper);
    jobCreator.subscribeToProgress(watchProgress);
    loadChart();
    return function () {
      resultsSubscription.unsubscribe();
    };
  }, []);

  function loadChart() {
    return _loadChart.apply(this, arguments);
  }

  function _loadChart() {
    _loadChart = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var resp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoadingData(true);
              _context.prev = 1;
              _context.next = 4;
              return chartLoader.loadEventRateChart(jobCreator.start, jobCreator.end, chartInterval.getInterval().asMilliseconds());

            case 4:
              resp = _context.sent;
              setEventRateChartData(resp);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              setEventRateChartData([]);

            case 11:
              setLoadingData(false);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }));
    return _loadChart.apply(this, arguments);
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_event_rate_chart.EventRateChart, {
    eventRateChartData: eventRateChartData,
    anomalyData: anomalyData,
    height: "300px",
    width: "100%",
    showAxis: true,
    loading: loadingData,
    fadeChart: jobIsRunning
  }), _react.default.createElement(_top_categories.TopCategories, null));
};

exports.CategorizationDetectorsSummary = CategorizationDetectorsSummary;