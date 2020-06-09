"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopulationDetectorsSummary = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _job_creator_context = require("../../../job_creator_context");

var _settings = require("../../../charts/common/settings");

var _chart_grid = require("./chart_grid");

var _messagebar = require("../../../../../../../components/messagebar");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PopulationDetectorsSummary = function PopulationDetectorsSummary() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      chartLoader = _useContext.chartLoader,
      resultsLoader = _useContext.resultsLoader,
      chartInterval = _useContext.chartInterval;

  var jobCreator = jc;

  var _useState = (0, _react.useState)(jobCreator.aggFieldPairs),
      _useState2 = _slicedToArray(_useState, 2),
      aggFieldPairList = _useState2[0],
      setAggFieldPairList = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      lineChartsData = _useState4[0],
      setLineChartsData = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loadingData = _useState6[0],
      setLoadingData = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      modelData = _useState8[0],
      setModelData = _useState8[1];

  var _useState9 = (0, _react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      anomalyData = _useState10[0],
      setAnomalyData = _useState10[1];

  var _useState11 = (0, _react.useState)(_settings.defaultChartSettings),
      _useState12 = _slicedToArray(_useState11, 2),
      chartSettings = _useState12[0],
      setChartSettings = _useState12[1];

  var _useState13 = (0, _react.useState)({}),
      _useState14 = _slicedToArray(_useState13, 2),
      fieldValuesPerDetector = _useState14[0],
      setFieldValuesPerDetector = _useState14[1];

  function setResultsWrapper(results) {
    setModelData(results.model);
    setAnomalyData(results.anomalies);
  }

  (0, _react.useEffect)(function () {
    // subscribe to progress and results
    var subscription = resultsLoader.subscribeToResults(setResultsWrapper);
    return function () {
      subscription.unsubscribe();
    };
  }, []); // watch for changes in by field values
  // redraw the charts if they change.
  // triggered when example fields have been loaded
  // if the split field or by fields have changed

  (0, _react.useEffect)(function () {
    if (allDataReady()) {
      loadCharts();
    }
  }, [JSON.stringify(fieldValuesPerDetector), jobCreator.splitField]); // watch for changes in split field or by fields.
  // load example field values
  // changes to fieldValues here will trigger the card effect via setFieldValuesPerDetector

  (0, _react.useEffect)(function () {
    loadFieldExamples();
  }, [jobCreator.splitField]);

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
              return chartLoader.loadPopulationCharts(jobCreator.start, jobCreator.end, aggFieldPairList, jobCreator.splitField, cs.intervalMs);

            case 7:
              resp = _context.sent;
              setLineChartsData(resp);
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);

              _messagebar.mlMessageBarService.notify.error(_context.t0);

              setLineChartsData({});

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

  function loadFieldExamples() {
    return _loadFieldExamples.apply(this, arguments);
  }

  function _loadFieldExamples() {
    _loadFieldExamples = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var promises, results, fieldValues, newPairs;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              promises = [];
              aggFieldPairList.forEach(function (af, i) {
                if (af.by !== undefined && af.by.field !== null) {
                  promises.push(function () {
                    var _ref = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee2(index, field) {
                      return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.t0 = index;
                              _context2.next = 3;
                              return chartLoader.loadFieldExampleValues(field);

                            case 3:
                              _context2.t1 = _context2.sent;
                              return _context2.abrupt("return", {
                                index: _context2.t0,
                                fields: _context2.t1
                              });

                            case 5:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2);
                    }));

                    return function (_x, _x2) {
                      return _ref.apply(this, arguments);
                    };
                  }()(i, af.by.field));
                }
              });
              _context3.next = 4;
              return Promise.all(promises);

            case 4:
              results = _context3.sent;
              fieldValues = results.reduce(function (p, c) {
                p[c.index] = c.fields;
                return p;
              }, {});
              newPairs = aggFieldPairList.map(function (pair, i) {
                return _objectSpread({}, pair, {}, pair.by === undefined || pair.by.field === null ? {} : {
                  by: _objectSpread({}, pair.by, {
                    value: fieldValues[i][0]
                  })
                });
              });
              setAggFieldPairList(_toConsumableArray(newPairs));
              setFieldValuesPerDetector(fieldValues);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _loadFieldExamples.apply(this, arguments);
  }

  function allDataReady() {
    var ready = aggFieldPairList.length > 0;
    aggFieldPairList.forEach(function (af) {
      if (af.by !== undefined && af.by.field !== null) {
        // if a by field is set, it's only ready when the value is loaded
        ready = ready && af.by.value !== null;
      }
    });
    return ready;
  }

  return _react.default.createElement(_react.Fragment, null, jobCreator.splitField !== null && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.populationView.splitFieldTitle",
    defaultMessage: "Population split by {field}",
    values: {
      field: jobCreator.splitField.name
    }
  }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_chart_grid.ChartGrid, {
    aggFieldPairList: jobCreator.aggFieldPairs,
    chartSettings: chartSettings,
    splitField: jobCreator.splitField,
    lineChartsData: lineChartsData,
    modelData: modelData,
    anomalyData: anomalyData,
    jobType: jobCreator.type,
    fieldValuesPerDetector: fieldValuesPerDetector,
    loading: loadingData
  })));
};

exports.PopulationDetectorsSummary = PopulationDetectorsSummary;