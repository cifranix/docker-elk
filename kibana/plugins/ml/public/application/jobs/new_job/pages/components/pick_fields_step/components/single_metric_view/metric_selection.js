"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleMetricDetectors = void 0;

var _react = _interopRequireWildcard(require("react"));

var _job_creator_context = require("../../../job_creator_context");

var _agg_select = require("../agg_select");

var _new_job_capabilities_service = require("../../../../../../../services/new_job_capabilities_service");

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

var SingleMetricDetectors = function SingleMetricDetectors(_ref) {
  var setIsValid = _ref.setIsValid;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated,
      chartLoader = _useContext.chartLoader,
      chartInterval = _useContext.chartInterval;

  var jobCreator = jc;
  var fields = _new_job_capabilities_service.newJobCapsService.fields;

  var _useState = (0, _react.useState)(jobCreator.aggFieldPair !== null ? [{
    label: (0, _agg_select.createLabel)(jobCreator.aggFieldPair)
  }] : []),
      _useState2 = _slicedToArray(_useState, 2),
      selectedOptions = _useState2[0],
      setSelectedOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(jobCreator.aggFieldPair),
      _useState4 = _slicedToArray(_useState3, 2),
      aggFieldPair = _useState4[0],
      setAggFieldPair = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      lineChartsData = _useState6[0],
      setLineChartData = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      loadingData = _useState8[0],
      setLoadingData = _useState8[1];

  var _useState9 = (0, _react.useState)(jobCreator.start),
      _useState10 = _slicedToArray(_useState9, 2),
      start = _useState10[0],
      setStart = _useState10[1];

  var _useState11 = (0, _react.useState)(jobCreator.end),
      _useState12 = _slicedToArray(_useState11, 2),
      end = _useState12[0],
      setEnd = _useState12[1];

  var _useState13 = (0, _react.useState)(jobCreator.bucketSpanMs),
      _useState14 = _slicedToArray(_useState13, 2),
      bucketSpanMs = _useState14[0],
      setBucketSpanMs = _useState14[1];

  function detectorChangeHandler(selectedOptionsIn) {
    setSelectedOptions(selectedOptionsIn);

    if (selectedOptionsIn.length) {
      var option = selectedOptionsIn[0];

      if (typeof option !== 'undefined') {
        setAggFieldPair({
          agg: option.agg,
          field: option.field
        });
      } else {
        setAggFieldPair(null);
      }
    }
  }

  (0, _react.useEffect)(function () {
    if (aggFieldPair !== null) {
      jobCreator.setDetector(aggFieldPair.agg, aggFieldPair.field);
      jobCreatorUpdate();
      loadChart();
      setIsValid(aggFieldPair !== null);
    }
  }, [aggFieldPair]);
  (0, _react.useEffect)(function () {
    if (jobCreator.start !== start || jobCreator.end !== end) {
      setStart(jobCreator.start);
      setEnd(jobCreator.end);
      loadChart();
    }

    if (jobCreator.bucketSpanMs !== bucketSpanMs) {
      setBucketSpanMs(jobCreator.bucketSpanMs);
      loadChart();
    }
  }, [jobCreatorUpdated]);

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
              if (!(aggFieldPair !== null)) {
                _context.next = 15;
                break;
              }

              setLoadingData(true);
              _context.prev = 2;
              cs = (0, _settings.getChartSettings)(jobCreator, chartInterval);
              _context.next = 6;
              return chartLoader.loadLineCharts(jobCreator.start, jobCreator.end, [aggFieldPair], null, null, cs.intervalMs);

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

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_agg_select.AggSelect, {
    fields: fields,
    changeHandler: detectorChangeHandler,
    selectedOptions: selectedOptions,
    removeOptions: []
  }), (lineChartsData[DTR_IDX] !== undefined || loadingData === true) && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_anomaly_chart.AnomalyChart, {
    chartType: _anomaly_chart.CHART_TYPE.LINE,
    chartData: lineChartsData[DTR_IDX],
    modelData: [],
    anomalyData: [],
    height: "300px",
    width: "100%",
    loading: loadingData
  })));
};

exports.SingleMetricDetectors = SingleMetricDetectors;