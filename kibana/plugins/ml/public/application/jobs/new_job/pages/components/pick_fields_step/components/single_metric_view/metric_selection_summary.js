"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleMetricDetectorsSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _job_creator_context = require("../../../job_creator_context");

var _anomaly_chart = require("../../../charts/anomaly_chart");

var _settings = require("../../../charts/common/settings");

var _messagebar = require("../../../../../../../components/messagebar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DTR_IDX = 0;

var SingleMetricDetectorsSummary = function SingleMetricDetectorsSummary() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      chartLoader = _useContext.chartLoader,
      resultsLoader = _useContext.resultsLoader,
      chartInterval = _useContext.chartInterval;

  var jobCreator = jc;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      lineChartsData = _useState2[0],
      setLineChartData = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loadingData = _useState4[0],
      setLoadingData = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      modelData = _useState6[0],
      setModelData = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      anomalyData = _useState8[0],
      setAnomalyData = _useState8[1];

  function setResultsWrapper(results) {
    var model = results.model[DTR_IDX];

    if (model !== undefined) {
      setModelData(model);
    }

    var anomalies = results.anomalies[DTR_IDX];

    if (anomalies !== undefined) {
      setAnomalyData(anomalies);
    }
  }

  (0, _react.useEffect)(function () {
    // subscribe to progress and results
    var subscription = resultsLoader.subscribeToResults(setResultsWrapper);
    loadChart();
    return function () {
      subscription.unsubscribe();
    };
  }, []);

  function loadChart() {
    return _loadChart.apply(this, arguments);
  }

  function _loadChart() {
    _loadChart = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var cs, resp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(jobCreator.aggFieldPair !== null)) {
                _context.next = 15;
                break;
              }

              setLoadingData(true);
              _context.prev = 2;
              cs = (0, _settings.getChartSettings)(jobCreator, chartInterval);
              _context.next = 6;
              return chartLoader.loadLineCharts(jobCreator.start, jobCreator.end, [jobCreator.aggFieldPair], null, null, cs.intervalMs);

            case 6:
              resp = _context.sent;

              if (resp[DTR_IDX] !== undefined) {
                setLineChartData(resp);
              }

              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);

              _messagebar.mlMessageBarService.notify.error(_context.t0);

              setLineChartData({});

            case 14:
              setLoadingData(false);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 10]]);
    }));
    return _loadChart.apply(this, arguments);
  }

  return _react.default.createElement(_react.Fragment, null, (lineChartsData[DTR_IDX] !== undefined || loadingData === true) && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_anomaly_chart.AnomalyChart, {
    chartType: _anomaly_chart.CHART_TYPE.LINE,
    chartData: lineChartsData[DTR_IDX],
    modelData: modelData,
    anomalyData: anomalyData,
    height: "300px",
    width: "100%",
    loading: loadingData
  })));
};

exports.SingleMetricDetectorsSummary = SingleMetricDetectorsSummary;