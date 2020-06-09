"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataLoader = void 0;

var _i18n = require("@kbn/i18n");

var _dependency_cache = require("../../../util/dependency_cache");

var _ml_api_service = require("../../../services/ml_api_service");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// List of system fields we don't want to display.
var OMIT_FIELDS = ['_source', '_type', '_index', '_id', '_version', '_score']; // Maximum number of examples to obtain for text type fields.

var MAX_EXAMPLES_DEFAULT = 10;

var DataLoader =
/*#__PURE__*/
function () {
  function DataLoader(indexPattern, kibanaConfig) {
    _classCallCheck(this, DataLoader);

    _defineProperty(this, "_indexPattern", void 0);

    _defineProperty(this, "_indexPatternTitle", '');

    _defineProperty(this, "_maxExamples", MAX_EXAMPLES_DEFAULT);

    this._indexPattern = indexPattern;
    this._indexPatternTitle = indexPattern.title;
  }

  _createClass(DataLoader, [{
    key: "loadOverallData",
    value: function () {
      var _loadOverallData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(query, samplerShardSize, earliest, latest) {
        var _this = this;

        var aggregatableFields, nonAggregatableFields, stats;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                aggregatableFields = [];
                nonAggregatableFields = [];

                this._indexPattern.fields.forEach(function (field) {
                  var fieldName = field.displayName !== undefined ? field.displayName : field.name;

                  if (_this.isDisplayField(fieldName) === true) {
                    if (field.aggregatable === true) {
                      aggregatableFields.push(fieldName);
                    } else {
                      nonAggregatableFields.push(fieldName);
                    }
                  }
                }); // Need to find:
                // 1. List of aggregatable fields that do exist in docs
                // 2. List of aggregatable fields that do not exist in docs
                // 3. List of non-aggregatable fields that do exist in docs.
                // 4. List of non-aggregatable fields that do not exist in docs.


                _context.next = 5;
                return _ml_api_service.ml.getVisualizerOverallStats({
                  indexPatternTitle: this._indexPatternTitle,
                  query: query,
                  timeFieldName: this._indexPattern.timeFieldName,
                  samplerShardSize: samplerShardSize,
                  earliest: earliest,
                  latest: latest,
                  aggregatableFields: aggregatableFields,
                  nonAggregatableFields: nonAggregatableFields
                });

              case 5:
                stats = _context.sent;
                return _context.abrupt("return", stats);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadOverallData(_x, _x2, _x3, _x4) {
        return _loadOverallData.apply(this, arguments);
      }

      return loadOverallData;
    }()
  }, {
    key: "loadFieldStats",
    value: function () {
      var _loadFieldStats = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(query, samplerShardSize, earliest, latest, fields, interval) {
        var stats;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _ml_api_service.ml.getVisualizerFieldStats({
                  indexPatternTitle: this._indexPatternTitle,
                  query: query,
                  timeFieldName: this._indexPattern.timeFieldName,
                  earliest: earliest,
                  latest: latest,
                  samplerShardSize: samplerShardSize,
                  interval: interval,
                  fields: fields,
                  maxExamples: this._maxExamples
                });

              case 2:
                stats = _context2.sent;
                return _context2.abrupt("return", stats);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadFieldStats(_x5, _x6, _x7, _x8, _x9, _x10) {
        return _loadFieldStats.apply(this, arguments);
      }

      return loadFieldStats;
    }()
  }, {
    key: "displayError",
    value: function displayError(err) {
      var toastNotifications = (0, _dependency_cache.getToastNotifications)();

      if (err.statusCode === 500) {
        toastNotifications.addDanger(_i18n.i18n.translate('xpack.ml.datavisualizer.dataLoader.internalServerErrorMessage', {
          defaultMessage: 'Error loading data in index {index}. {message}. ' + 'The request may have timed out. Try using a smaller sample size or narrowing the time range.',
          values: {
            index: this._indexPattern.title,
            message: err.message
          }
        }));
      } else {
        toastNotifications.addDanger(_i18n.i18n.translate('xpack.ml.datavisualizer.page.errorLoadingDataMessage', {
          defaultMessage: 'Error loading data in index {index}. {message}',
          values: {
            index: this._indexPattern.title,
            message: err.message
          }
        }));
      }
    }
  }, {
    key: "isDisplayField",
    // Returns whether the field with the specified name should be displayed,
    // as certain fields such as _id and _source should be omitted from the view.
    value: function isDisplayField(fieldName) {
      return !OMIT_FIELDS.includes(fieldName);
    }
  }, {
    key: "maxExamples",
    set: function set(max) {
      this._maxExamples = max;
    },
    get: function get() {
      return this._maxExamples;
    }
  }]);

  return DataLoader;
}();

exports.DataLoader = DataLoader;