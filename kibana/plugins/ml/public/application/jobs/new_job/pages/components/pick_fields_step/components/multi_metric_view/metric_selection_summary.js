"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiMetricDetectorsSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _job_creator_context = require("../../../job_creator_context");

var _settings = require("../../../charts/common/settings");

var _chart_grid = require("./chart_grid");

var _messagebar = require("../../../../../../../components/messagebar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MultiMetricDetectorsSummary = function MultiMetricDetectorsSummary() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      chartLoader = _useContext.chartLoader,
      resultsLoader = _useContext.resultsLoader,
      chartInterval = _useContext.chartInterval;

  var jobCreator = jc;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      lineChartsData = _useState2[0],
      setLineChartsData = _useState2[1];

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

  var _useState9 = (0, _react.useState)(_settings.defaultChartSettings),
      _useState10 = _slicedToArray(_useState9, 2),
      chartSettings = _useState10[0],
      setChartSettings = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      fieldValues = _useState12[0],
      setFieldValues = _useState12[1];

  function setResultsWrapper(results) {
    setModelData(results.model);
    setAnomalyData(results.anomalies);
  }

  (0, _react.useEffect)(function () {
    // subscribe to progress and results
    var subscription = resultsLoader.subscribeToResults(setResultsWrapper);

    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var tempFieldValues;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(jobCreator.splitField !== null)) {
                _context.next = 11;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return chartLoader.loadFieldExampleValues(jobCreator.splitField);

            case 4:
              tempFieldValues = _context.sent;
              setFieldValues(tempFieldValues);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

              _messagebar.mlMessageBarService.notify.error(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 8]]);
    }))();

    return function () {
      subscription.unsubscribe();
    };
  }, []);
  (0, _react.useEffect)(function () {
    if (allDataReady()) {
      loadCharts();
    }
  }, [fieldValues]);

  function loadCharts() {
    return _loadCharts.apply(this, arguments);
  }

  function _loadCharts() {
    _loadCharts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var cs, resp;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!allDataReady()) {
                _context2.next = 16;
                break;
              }

              setLoadingData(true);
              _context2.prev = 2;
              cs = (0, _settings.getChartSettings)(jobCreator, chartInterval);
              setChartSettings(cs);
              _context2.next = 7;
              return chartLoader.loadLineCharts(jobCreator.start, jobCreator.end, jobCreator.aggFieldPairs, jobCreator.splitField, fieldValues.length > 0 ? fieldValues[0] : null, cs.intervalMs);

            case 7:
              resp = _context2.sent;
              setLineChartsData(resp);
              _context2.next = 15;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](2);

              _messagebar.mlMessageBarService.notify.error(_context2.t0);

              setLineChartsData({});

            case 15:
              setLoadingData(false);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 11]]);
    }));
    return _loadCharts.apply(this, arguments);
  }

  function allDataReady() {
    return jobCreator.aggFieldPairs.length > 0 && (jobCreator.splitField === null || jobCreator.splitField !== null && fieldValues.length > 0);
  }

  return _react.default.createElement(_react.Fragment, null, Object.keys(lineChartsData).length && _react.default.createElement(_chart_grid.ChartGrid, {
    aggFieldPairList: jobCreator.aggFieldPairs,
    chartSettings: chartSettings,
    splitField: jobCreator.splitField,
    fieldValues: fieldValues,
    lineChartsData: lineChartsData,
    modelData: modelData,
    anomalyData: anomalyData,
    deleteDetector: undefined,
    jobType: jobCreator.type,
    loading: loadingData
  }));
};

exports.MultiMetricDetectorsSummary = MultiMetricDetectorsSummary;