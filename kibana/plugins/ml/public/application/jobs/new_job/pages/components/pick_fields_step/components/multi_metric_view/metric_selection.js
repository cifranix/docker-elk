"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiMetricDetectors = void 0;

var _react = _interopRequireWildcard(require("react"));

var _job_creator_context = require("../../../job_creator_context");

var _new_job_capabilities_service = require("../../../../../../../services/new_job_capabilities_service");

var _settings = require("../../../charts/common/settings");

var _metric_selector = require("./metric_selector");

var _chart_grid = require("./chart_grid");

var _messagebar = require("../../../../../../../components/messagebar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MultiMetricDetectors = function MultiMetricDetectors(_ref) {
  var setIsValid = _ref.setIsValid;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated,
      chartLoader = _useContext.chartLoader,
      chartInterval = _useContext.chartInterval;

  var jobCreator = jc;
  var fields = _new_job_capabilities_service.newJobCapsService.fields;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedOptions = _useState2[0],
      setSelectedOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(jobCreator.aggFieldPairs),
      _useState4 = _slicedToArray(_useState3, 2),
      aggFieldPairList = _useState4[0],
      setAggFieldPairList = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      lineChartsData = _useState6[0],
      setLineChartsData = _useState6[1];

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

  var _useState15 = (0, _react.useState)(_settings.defaultChartSettings),
      _useState16 = _slicedToArray(_useState15, 2),
      chartSettings = _useState16[0],
      setChartSettings = _useState16[1];

  var _useState17 = (0, _react.useState)(jobCreator.splitField),
      _useState18 = _slicedToArray(_useState17, 2),
      splitField = _useState18[0],
      setSplitField = _useState18[1];

  var _useState19 = (0, _react.useState)([]),
      _useState20 = _slicedToArray(_useState19, 2),
      fieldValues = _useState20[0],
      setFieldValues = _useState20[1];

  var _useState21 = (0, _react.useState)(false),
      _useState22 = _slicedToArray(_useState21, 2),
      pageReady = _useState22[0],
      setPageReady = _useState22[1];

  function detectorChangeHandler(selectedOptionsIn) {
    addDetector(selectedOptionsIn);
  }

  function addDetector(selectedOptionsIn) {
    if (selectedOptionsIn !== null && selectedOptionsIn.length) {
      var option = selectedOptionsIn[0];

      if (typeof option !== 'undefined') {
        var newPair = {
          agg: option.agg,
          field: option.field
        };
        setAggFieldPairList([].concat(_toConsumableArray(aggFieldPairList), [newPair]));
        setSelectedOptions([]);
      } else {
        setAggFieldPairList([]);
      }
    }
  }

  function deleteDetector(index) {
    aggFieldPairList.splice(index, 1);
    setAggFieldPairList(_toConsumableArray(aggFieldPairList));
  }

  (0, _react.useEffect)(function () {
    setPageReady(true);
  }, []); // watch for changes in detector list length

  (0, _react.useEffect)(function () {
    jobCreator.removeAllDetectors();
    aggFieldPairList.forEach(function (pair) {
      jobCreator.addDetector(pair.agg, pair.field);
    });
    jobCreator.calculateModelMemoryLimit();
    jobCreatorUpdate();
    loadCharts();
    setIsValid(aggFieldPairList.length > 0);
  }, [aggFieldPairList.length]); // watch for change in jobCreator

  (0, _react.useEffect)(function () {
    if (jobCreator.start !== start || jobCreator.end !== end) {
      setStart(jobCreator.start);
      setEnd(jobCreator.end);
      loadCharts();
    }

    if (jobCreator.bucketSpanMs !== bucketSpanMs) {
      setBucketSpanMs(jobCreator.bucketSpanMs);
      loadCharts();
    }

    setSplitField(jobCreator.splitField);
  }, [jobCreatorUpdated]); // watch for changes in split field.
  // load example field values
  // changes to fieldValues here will trigger the card effect

  (0, _react.useEffect)(function () {
    if (splitField !== null) {
      chartLoader.loadFieldExampleValues(splitField).then(setFieldValues).catch(function (error) {
        _messagebar.mlMessageBarService.notify.error(error);
      });
    } else {
      setFieldValues([]);
    }

    jobCreator.calculateModelMemoryLimit();
  }, [splitField]); // watch for changes in the split field values
  // reload the charts

  (0, _react.useEffect)(function () {
    loadCharts();
  }, [fieldValues]);

  function loadCharts() {
    return _loadCharts.apply(this, arguments);
  }

  function _loadCharts() {
    _loadCharts = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var cs, resp;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!allDataReady()) {
                _context.next = 16;
                break;
              }

              setLoadingData(true);
              _context.prev = 2;
              cs = (0, _settings.getChartSettings)(jobCreator, chartInterval);
              setChartSettings(cs);
              _context.next = 7;
              return chartLoader.loadLineCharts(jobCreator.start, jobCreator.end, aggFieldPairList, jobCreator.splitField, fieldValues.length > 0 ? fieldValues[0] : null, cs.intervalMs);

            case 7:
              resp = _context.sent;
              setLineChartsData(resp);
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);

              _messagebar.mlMessageBarService.notify.error(_context.t0);

              setLineChartsData([]);

            case 15:
              setLoadingData(false);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 11]]);
    }));
    return _loadCharts.apply(this, arguments);
  }

  function allDataReady() {
    return pageReady && aggFieldPairList.length > 0 && (splitField === null || splitField !== null && fieldValues.length > 0);
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_chart_grid.ChartGrid, {
    aggFieldPairList: aggFieldPairList,
    chartSettings: chartSettings,
    splitField: splitField,
    fieldValues: fieldValues,
    lineChartsData: lineChartsData,
    modelData: [],
    anomalyData: [],
    deleteDetector: deleteDetector,
    jobType: jobCreator.type,
    loading: loadingData
  }), _react.default.createElement(_metric_selector.MetricSelector, {
    fields: fields,
    detectorChangeHandler: detectorChangeHandler,
    selectedOptions: selectedOptions,
    removeOptions: aggFieldPairList
  }));
};

exports.MultiMetricDetectors = MultiMetricDetectors;