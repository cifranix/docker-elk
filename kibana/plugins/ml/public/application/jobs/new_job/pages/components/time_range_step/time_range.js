"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeRangeStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _moment = _interopRequireDefault(require("moment"));

var _wizard_nav = require("../wizard_nav");

var _step_types = require("../step_types");

var _job_creator_context = require("../job_creator_context");

var _ml = require("../../../../../contexts/ml");

var _full_time_range_selector = require("../../../../../components/full_time_range_selector");

var _event_rate_chart = require("../charts/event_rate_chart");

var _new_job = require("../../../../../../../common/constants/new_job");

var _components = require("../../../common/components");

var _kibana = require("../../../../../contexts/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TimeRangeStep = function TimeRangeStep(_ref) {
  var setCurrentStep = _ref.setCurrentStep,
      isCurrentStep = _ref.isCurrentStep;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      services = _useMlKibana.services;

  var mlContext = (0, _ml.useMlContext)();

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated,
      chartLoader = _useContext.chartLoader,
      chartInterval = _useContext.chartInterval;

  var _useState = (0, _react.useState)({
    start: jobCreator.start,
    end: jobCreator.end
  }),
      _useState2 = _slicedToArray(_useState, 2),
      timeRange = _useState2[0],
      setTimeRange = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      eventRateChartData = _useState4[0],
      setEventRateChartData = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loadingData = _useState6[0],
      setLoadingData = _useState6[1];

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

  (0, _react.useEffect)(function () {
    var start = timeRange.start,
        end = timeRange.end;
    jobCreator.setTimeRange(start, end);
    chartInterval.setBounds({
      min: (0, _moment.default)(start),
      max: (0, _moment.default)(end)
    }); // update the timefilter, to keep the URL in sync

    var timefilter = services.data.query.timefilter.timefilter;
    timefilter.setTime({
      from: (0, _moment.default)(start).toISOString(),
      to: (0, _moment.default)(end).toISOString()
    });
    jobCreatorUpdate();
    loadChart();
  }, [JSON.stringify(timeRange)]);
  (0, _react.useEffect)(function () {
    setTimeRange({
      start: jobCreator.start,
      end: jobCreator.end
    });
  }, [jobCreatorUpdated]);

  function fullTimeRangeCallback(range) {
    if (range.start.epoch !== null && range.end.epoch !== null) {
      setTimeRange({
        start: range.start.epoch,
        end: range.end.epoch
      });
    } else {
      var toasts = services.notifications.toasts;
      toasts.addDanger(_i18n.i18n.translate('xpack.ml.newJob.wizard.timeRangeStep.fullTimeRangeError', {
        defaultMessage: 'An error occurred obtaining the time range for the index'
      }));
    }
  }

  return _react.default.createElement(_react.Fragment, null, isCurrentStep && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_components.TimeRangePicker, {
    setTimeRange: setTimeRange,
    timeRange: timeRange
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_full_time_range_selector.FullTimeRangeSelector, {
    indexPattern: mlContext.currentIndexPattern,
    query: mlContext.combinedQuery,
    disabled: false,
    callback: fullTimeRangeCallback
  })), _react.default.createElement(_eui.EuiFlexItem, null)), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_event_rate_chart.EventRateChart, {
    eventRateChartData: eventRateChartData,
    height: "300px",
    width: "100%",
    showAxis: true,
    loading: loadingData
  }), _react.default.createElement(_wizard_nav.WizardNav, {
    next: function next() {
      return setCurrentStep(jobCreator.type === _new_job.JOB_TYPE.ADVANCED ? _step_types.WIZARD_STEPS.ADVANCED_CONFIGURE_DATAFEED : _step_types.WIZARD_STEPS.PICK_FIELDS);
    },
    nextActive: true
  })));
};

exports.TimeRangeStep = TimeRangeStep;