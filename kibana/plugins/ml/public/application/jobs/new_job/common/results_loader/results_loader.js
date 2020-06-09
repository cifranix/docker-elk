"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultsLoader = void 0;

var _rxjs = require("rxjs");

var _job_creator = require("../job_creator");

var _results_service = require("../../../../services/results_service");

var _anomaly_utils = require("../../../../../../common/util/anomaly_utils");

var _parse_interval = require("../../../../../../common/util/parse_interval");

var _searches = require("./searches");

var _new_job = require("../../../../../../common/constants/new_job");

var _aggregation_types = require("../../../../../../common/constants/aggregation_types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emptyModelItem = {
  time: 0,
  actual: 0,
  modelUpper: 0,
  modelLower: 0
};
var LAST_UPDATE_DELAY_MS = 500;

var ResultsLoader =
/*#__PURE__*/
function () {
  function ResultsLoader(jobCreator, chartInterval, chartLoader) {
    var _this = this;

    _classCallCheck(this, ResultsLoader);

    _defineProperty(this, "_results$", void 0);

    _defineProperty(this, "_resultsSearchRunning", false);

    _defineProperty(this, "_jobCreator", void 0);

    _defineProperty(this, "_chartInterval", void 0);

    _defineProperty(this, "_lastModelTimeStamp", 0);

    _defineProperty(this, "_lastResultsTimeout", null);

    _defineProperty(this, "_chartLoader", void 0);

    _defineProperty(this, "_results", {
      progress: 0,
      model: [],
      anomalies: []
    });

    _defineProperty(this, "_detectorSplitFieldFilters", null);

    _defineProperty(this, "_splitFieldFiltersLoaded", false);

    _defineProperty(this, "progressSubscriber",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(progress) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this._resultsSearchRunning === false && (progress - _this._results.progress > 5 || progress === 100))) {
                  _context.next = 7;
                  break;
                }

                if (!(_this._splitFieldFiltersLoaded === false)) {
                  _context.next = 5;
                  break;
                }

                _this._splitFieldFiltersLoaded = true; // load detector field filters if this is the first run.

                _context.next = 5;
                return _this._populateDetectorSplitFieldFilters();

              case 5:
                _this._updateData(progress, false);

                if (progress === 100) {
                  // after the job has finished, do one final update
                  // a while after the last 100% has been received.
                  // note, there may be multiple 100% progresses sent as they will only stop once the
                  // datafeed has stopped.
                  clearTimeout(_this._lastResultsTimeout);
                  _this._lastResultsTimeout = setTimeout(function () {
                    _this._updateData(progress, true);
                  }, LAST_UPDATE_DELAY_MS);
                }

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    this._jobCreator = jobCreator;
    this._chartInterval = chartInterval;
    this._results$ = new _rxjs.BehaviorSubject(this._results);
    this._chartLoader = chartLoader;
    jobCreator.subscribeToProgress(this.progressSubscriber);
  }

  _createClass(ResultsLoader, [{
    key: "_updateData",
    value: function () {
      var _updateData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(progress, fullRefresh) {
        var _this2 = this;

        var getAnomalyData, _ref2, _ref3, model, anomalies;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._resultsSearchRunning = true;

                if (fullRefresh === true) {
                  this._clearResults();
                }

                this._results.progress = progress;
                getAnomalyData = this._jobCreator.type === _new_job.JOB_TYPE.SINGLE_METRIC ? function () {
                  return _this2._loadJobAnomalyData(0);
                } : function () {
                  return _this2._loadDetectorsAnomalyData();
                }; // TODO - load more that one model

                _context2.next = 6;
                return Promise.all([this._loadModelData(0), getAnomalyData()]);

              case 6:
                _ref2 = _context2.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                model = _ref3[0];
                anomalies = _ref3[1];
                this._results.model = model;
                this._results.anomalies = anomalies;
                this._resultsSearchRunning = false;

                this._results$.next(this._results);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _updateData(_x2, _x3) {
        return _updateData2.apply(this, arguments);
      }

      return _updateData;
    }()
  }, {
    key: "subscribeToResults",
    value: function subscribeToResults(func) {
      return this._results$.subscribe(func);
    }
  }, {
    key: "_clearResults",
    value: function _clearResults() {
      this._results.model = {};
      this._results.anomalies = {};
      this._results.progress = 0;
      this._lastModelTimeStamp = 0;
    }
  }, {
    key: "_loadModelData",
    value: function () {
      var _loadModelData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dtrIndex) {
        var agg, resp;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this._jobCreator.modelPlot === false)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", []);

              case 2:
                agg = this._jobCreator.getAggregation(dtrIndex);

                if (!(agg === null)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", _defineProperty({}, dtrIndex, [emptyModelItem]));

              case 5:
                _context3.next = 7;
                return _results_service.mlResultsService.getModelPlotOutput(this._jobCreator.jobId, dtrIndex, [], this._lastModelTimeStamp, this._jobCreator.end, "".concat(this._chartInterval.getInterval().asMilliseconds(), "ms"), agg.mlModelPlotAgg).toPromise();

              case 7:
                resp = _context3.sent;
                return _context3.abrupt("return", this._createModel(resp, dtrIndex));

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _loadModelData(_x4) {
        return _loadModelData2.apply(this, arguments);
      }

      return _loadModelData;
    }()
  }, {
    key: "_createModel",
    value: function _createModel(_ref5, dtrIndex) {
      var results = _ref5.results;

      if (this._results.model[dtrIndex] === undefined) {
        this._results.model[dtrIndex] = [];
      }

      var dslName = this._jobCreator.aggregations[dtrIndex].dslName;
      var isCountAgg = dslName === _aggregation_types.ES_AGGREGATION.COUNT || dslName === _aggregation_types.ES_AGGREGATION.CARDINALITY; // if aggregation is count or distinct count, scale the model plot to match the real data.

      var modelScale = isCountAgg ? this._calculateModelScale() : 1; // create ModelItem list from search results

      var model = Object.entries(results).map(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            time = _ref7[0],
            _ref7$ = _ref7[1],
            actual = _ref7$.actual,
            modelLower = _ref7$.modelLower,
            modelUpper = _ref7$.modelUpper;

        return {
          time: +time,
          actual: actual,
          modelUpper: (modelUpper === null ? 0 : modelUpper) * modelScale,
          modelLower: (modelLower === null ? 0 : modelLower) * modelScale
        };
      });

      if (model.length > 10) {
        // discard the last 5 buckets in the previously loaded model to avoid partial results
        // set the _lastModelTimeStamp to be 5 buckets behind so we load the correct
        // section of results next time.
        this._lastModelTimeStamp = model[model.length - 5].time;

        for (var i = 0; i < 5; i++) {
          this._results.model[dtrIndex].pop();
        }
      } // return a new array from the old and new model


      return _defineProperty({}, dtrIndex, this._results.model[dtrIndex].concat(model));
    }
  }, {
    key: "_loadJobAnomalyData",
    value: function () {
      var _loadJobAnomalyData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dtrIndex) {
        var resp, results, anomalies;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _results_service.mlResultsService.getScoresByBucket([this._jobCreator.jobId], this._jobCreator.start, this._jobCreator.end, "".concat(this._chartInterval.getInterval().asMilliseconds(), "ms"), 1);

              case 2:
                resp = _context4.sent;
                results = resp.results[this._jobCreator.jobId];

                if (!(results === undefined)) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", []);

              case 6:
                anomalies = {};
                anomalies[0] = Object.entries(results).map(function (_ref9) {
                  var _ref10 = _slicedToArray(_ref9, 2),
                      time = _ref10[0],
                      value = _ref10[1];

                  return {
                    time: +time,
                    value: value,
                    severity: (0, _anomaly_utils.getSeverityType)(value)
                  };
                });
                return _context4.abrupt("return", anomalies);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _loadJobAnomalyData(_x5) {
        return _loadJobAnomalyData2.apply(this, arguments);
      }

      return _loadJobAnomalyData;
    }()
  }, {
    key: "_loadDetectorsAnomalyData",
    value: function () {
      var _loadDetectorsAnomalyData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var resp, anomalies;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _searches.getScoresByRecord)(this._jobCreator.jobId, this._jobCreator.start, this._jobCreator.end, "".concat(this._chartInterval.getInterval().asMilliseconds(), "ms"), this._detectorSplitFieldFilters);

              case 2:
                resp = _context5.sent;
                anomalies = {};
                Object.entries(resp.results).forEach(function (_ref11) {
                  var _ref12 = _slicedToArray(_ref11, 2),
                      dtrIdx = _ref12[0],
                      results = _ref12[1];

                  anomalies[+dtrIdx] = results.map(function (r) {
                    return _objectSpread({}, r, {
                      severity: (0, _anomaly_utils.getSeverityType)(r.value)
                    });
                  });
                });
                return _context5.abrupt("return", anomalies);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _loadDetectorsAnomalyData() {
        return _loadDetectorsAnomalyData2.apply(this, arguments);
      }

      return _loadDetectorsAnomalyData;
    }()
  }, {
    key: "_populateDetectorSplitFieldFilters",
    value: function () {
      var _populateDetectorSplitFieldFilters2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var fieldValues;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(0, _job_creator.isMultiMetricJobCreator)(this._jobCreator)) {
                  _context6.next = 7;
                  break;
                }

                if (!(this._jobCreator.splitField !== null)) {
                  _context6.next = 7;
                  break;
                }

                _context6.next = 4;
                return this._chartLoader.loadFieldExampleValues(this._jobCreator.splitField);

              case 4:
                fieldValues = _context6.sent;

                if (fieldValues.length > 0) {
                  this._detectorSplitFieldFilters = {
                    name: this._jobCreator.splitField.name,
                    value: fieldValues[0]
                  };
                }

                return _context6.abrupt("return");

              case 7:
                this._detectorSplitFieldFilters = null;

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _populateDetectorSplitFieldFilters() {
        return _populateDetectorSplitFieldFilters2.apply(this, arguments);
      }

      return _populateDetectorSplitFieldFilters;
    }() // calculate a scale for the model upper and lower by the ratio of chart interval to bucketspan.
    // this will force the model bounds to be drawn in the correct location

  }, {
    key: "_calculateModelScale",
    value: function _calculateModelScale() {
      var duration = (0, _parse_interval.parseInterval)(this._jobCreator.bucketSpan);
      var bucketSpanMs = duration !== null ? duration.asMilliseconds() : 0;

      var chartIntervalMs = this._chartInterval.getInterval().asMilliseconds();

      return chartIntervalMs / bucketSpanMs;
    }
  }, {
    key: "progress",
    get: function get() {
      return this._results.progress;
    }
  }]);

  return ResultsLoader;
}();

exports.ResultsLoader = ResultsLoader;