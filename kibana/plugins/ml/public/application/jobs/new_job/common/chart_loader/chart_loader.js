"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAggFieldPairNames = getAggFieldPairNames;
exports.ChartLoader = void 0;

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _lodash = require("lodash");

var _ml_api_service = require("../../../../services/ml_api_service");

var _results_service = require("../../../../services/results_service");

var _searches = require("./searches");

var _general = require("../job_creator/util/general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var eq = function eq(newArgs, lastArgs) {
  return (0, _lodash.isEqual)(newArgs, lastArgs);
};

var newJobLineChart = (0, _memoizeOne.default)(_ml_api_service.ml.jobs.newJobLineChart, eq);
var newJobPopulationsChart = (0, _memoizeOne.default)(_ml_api_service.ml.jobs.newJobPopulationsChart, eq);
var getEventRateData = (0, _memoizeOne.default)(_results_service.mlResultsService.getEventRateData, eq);
var getCategoryFields = (0, _memoizeOne.default)(_searches.getCategoryFields, eq);

var ChartLoader =
/*#__PURE__*/
function () {
  function ChartLoader(indexPattern, query) {
    _classCallCheck(this, ChartLoader);

    _defineProperty(this, "_indexPatternTitle", '');

    _defineProperty(this, "_timeFieldName", '');

    _defineProperty(this, "_query", {});

    this._indexPatternTitle = indexPattern.title;
    this._query = query;

    if (typeof indexPattern.timeFieldName === 'string') {
      this._timeFieldName = indexPattern.timeFieldName;
    }
  }

  _createClass(ChartLoader, [{
    key: "loadLineCharts",
    value: function () {
      var _loadLineCharts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(start, end, aggFieldPairs, splitField, splitFieldValue, intervalMs) {
        var splitFieldName, aggFieldPairNames, resp;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._timeFieldName !== '')) {
                  _context.next = 11;
                  break;
                }

                if (!((0, _general.aggFieldPairsCanBeCharted)(aggFieldPairs) === false)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", {});

              case 3:
                splitFieldName = splitField !== null ? splitField.name : null;
                aggFieldPairNames = aggFieldPairs.map(getAggFieldPairNames);
                _context.next = 7;
                return newJobLineChart(this._indexPatternTitle, this._timeFieldName, start, end, intervalMs, this._query, aggFieldPairNames, splitFieldName, splitFieldValue);

              case 7:
                resp = _context.sent;

                if (!(resp.error !== undefined)) {
                  _context.next = 10;
                  break;
                }

                throw resp.error;

              case 10:
                return _context.abrupt("return", resp.results);

              case 11:
                return _context.abrupt("return", {});

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadLineCharts(_x, _x2, _x3, _x4, _x5, _x6) {
        return _loadLineCharts.apply(this, arguments);
      }

      return loadLineCharts;
    }()
  }, {
    key: "loadPopulationCharts",
    value: function () {
      var _loadPopulationCharts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(start, end, aggFieldPairs, splitField, intervalMs) {
        var splitFieldName, aggFieldPairNames, resp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this._timeFieldName !== '')) {
                  _context2.next = 11;
                  break;
                }

                if (!((0, _general.aggFieldPairsCanBeCharted)(aggFieldPairs) === false)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", {});

              case 3:
                splitFieldName = splitField !== null ? splitField.name : '';
                aggFieldPairNames = aggFieldPairs.map(getAggFieldPairNames);
                _context2.next = 7;
                return newJobPopulationsChart(this._indexPatternTitle, this._timeFieldName, start, end, intervalMs, this._query, aggFieldPairNames, splitFieldName);

              case 7:
                resp = _context2.sent;

                if (!(resp.error !== undefined)) {
                  _context2.next = 10;
                  break;
                }

                throw resp.error;

              case 10:
                return _context2.abrupt("return", resp.results);

              case 11:
                return _context2.abrupt("return", {});

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadPopulationCharts(_x7, _x8, _x9, _x10, _x11) {
        return _loadPopulationCharts.apply(this, arguments);
      }

      return loadPopulationCharts;
    }()
  }, {
    key: "loadEventRateChart",
    value: function () {
      var _loadEventRateChart = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(start, end, intervalMs) {
        var resp;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this._timeFieldName !== '')) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 3;
                return getEventRateData(this._indexPatternTitle, this._query, this._timeFieldName, start, end, intervalMs * 3);

              case 3:
                resp = _context3.sent;

                if (!(resp.error !== undefined)) {
                  _context3.next = 6;
                  break;
                }

                throw resp.error;

              case 6:
                return _context3.abrupt("return", Object.entries(resp.results).map(function (_ref) {
                  var _ref2 = _slicedToArray(_ref, 2),
                      time = _ref2[0],
                      value = _ref2[1];

                  return {
                    time: +time,
                    value: value
                  };
                }));

              case 7:
                return _context3.abrupt("return", []);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadEventRateChart(_x12, _x13, _x14) {
        return _loadEventRateChart.apply(this, arguments);
      }

      return loadEventRateChart;
    }()
  }, {
    key: "loadFieldExampleValues",
    value: function () {
      var _loadFieldExampleValues = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(field) {
        var _ref3, results;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return getCategoryFields(this._indexPatternTitle, field.name, 10, this._query);

              case 2:
                _ref3 = _context4.sent;
                results = _ref3.results;
                return _context4.abrupt("return", results);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadFieldExampleValues(_x15) {
        return _loadFieldExampleValues.apply(this, arguments);
      }

      return loadFieldExampleValues;
    }()
  }]);

  return ChartLoader;
}();

exports.ChartLoader = ChartLoader;

function getAggFieldPairNames(af) {
  var by = af.by !== undefined && af.by.field !== null && af.by.value !== null ? {
    field: af.by.field.id,
    value: af.by.value
  } : {
    field: null,
    value: null
  };
  return {
    agg: af.agg.dslName || '',
    field: af.field.id,
    by: by
  };
}