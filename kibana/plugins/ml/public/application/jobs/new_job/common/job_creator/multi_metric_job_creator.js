"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiMetricJobCreator = void 0;

var _job_creator = require("./job_creator");

var _default_configs = require("./util/default_configs");

var _new_job = require("../../../../../../common/constants/new_job");

var _ml_api_service = require("../../../../services/ml_api_service");

var _general = require("./util/general");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MultiMetricJobCreator =
/*#__PURE__*/
function (_JobCreator) {
  _inherits(MultiMetricJobCreator, _JobCreator);

  // a multi metric job has one optional overall partition field
  // which is the same for all detectors.
  function MultiMetricJobCreator(indexPattern, savedSearch, query) {
    var _this;

    _classCallCheck(this, MultiMetricJobCreator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiMetricJobCreator).call(this, indexPattern, savedSearch, query));

    _defineProperty(_assertThisInitialized(_this), "_splitField", null);

    _defineProperty(_assertThisInitialized(_this), "_lastEstimatedModelMemoryLimit", _new_job.DEFAULT_MODEL_MEMORY_LIMIT);

    _defineProperty(_assertThisInitialized(_this), "_type", _new_job.JOB_TYPE.MULTI_METRIC);

    _this.createdBy = _new_job.CREATED_BY_LABEL.MULTI_METRIC;
    return _this;
  } // set the split field, applying it to each detector


  _createClass(MultiMetricJobCreator, [{
    key: "setSplitField",
    value: function setSplitField(field) {
      this._splitField = field;

      if (this._splitField === null) {
        this.removeSplitField();
      } else {
        for (var i = 0; i < this._detectors.length; i++) {
          this._detectors[i].partition_field_name = this._splitField.id;
        }
      }
    }
  }, {
    key: "removeSplitField",
    value: function removeSplitField() {
      this._detectors.forEach(function (d) {
        delete d.partition_field_name;
      });
    }
  }, {
    key: "addDetector",
    value: function addDetector(agg, field) {
      var dtr = this._createDetector(agg, field);

      this._addDetector(dtr, agg, field);
    }
  }, {
    key: "editDetector",
    value: function editDetector(agg, field, index) {
      var dtr = this._createDetector(agg, field);

      this._editDetector(dtr, agg, field, index);
    } // create a new detector object, applying the overall split field

  }, {
    key: "_createDetector",
    value: function _createDetector(agg, field) {
      var dtr = (0, _default_configs.createBasicDetector)(agg, field);

      if (this._splitField !== null) {
        dtr.partition_field_name = this._splitField.id;
      }

      return dtr;
    }
  }, {
    key: "removeDetector",
    value: function removeDetector(index) {
      this._removeDetector(index);
    } // called externally to set the model memory limit based current detector configuration

  }, {
    key: "calculateModelMemoryLimit",
    value: function () {
      var _calculateModelMemoryLimit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, modelMemoryLimit, currentModelMemoryLimit, defaultModelMemoryLimit, _currentModelMemoryLimit;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.jobConfig.analysis_config.detectors.length === 0)) {
                  _context.next = 4;
                  break;
                }

                this.modelMemoryLimit = _new_job.DEFAULT_MODEL_MEMORY_LIMIT;
                _context.next = 9;
                break;

              case 4:
                _context.next = 6;
                return _ml_api_service.ml.calculateModelMemoryLimit({
                  analysisConfig: this.jobConfig.analysis_config,
                  indexPattern: this._indexPatternTitle,
                  query: this._datafeed_config.query,
                  timeFieldName: this._job_config.data_description.time_field,
                  earliestMs: this._start,
                  latestMs: this._end
                });

              case 6:
                _ref = _context.sent;
                modelMemoryLimit = _ref.modelMemoryLimit;

                try {
                  if (this.modelMemoryLimit === null) {
                    this.modelMemoryLimit = modelMemoryLimit;
                  } else {
                    // To avoid overwriting a possible custom set model memory limit,
                    // it only gets set to the estimation if the current limit is either
                    // the default value or the value of the previous estimation.
                    // That's our best guess if the value hasn't been customized.
                    // It doesn't get it if the user intentionally for whatever reason (re)set
                    // the value to either the default or pervious estimate.
                    // Because the string based limit could contain e.g. MB/Mb/mb
                    // all strings get lower cased for comparison.
                    currentModelMemoryLimit = this.modelMemoryLimit.toLowerCase();
                    defaultModelMemoryLimit = _new_job.DEFAULT_MODEL_MEMORY_LIMIT.toLowerCase();

                    if (currentModelMemoryLimit === defaultModelMemoryLimit || currentModelMemoryLimit === this._lastEstimatedModelMemoryLimit) {
                      this.modelMemoryLimit = modelMemoryLimit;
                    }
                  }

                  this._lastEstimatedModelMemoryLimit = modelMemoryLimit.toLowerCase();
                } catch (error) {
                  if (this.modelMemoryLimit === null) {
                    this.modelMemoryLimit = _new_job.DEFAULT_MODEL_MEMORY_LIMIT;
                  } else {
                    // To avoid overwriting a possible custom set model memory limit,
                    // the limit is reset to the default only if the current limit matches
                    // the previous estimated limit.
                    _currentModelMemoryLimit = this.modelMemoryLimit.toLowerCase();

                    if (_currentModelMemoryLimit === this._lastEstimatedModelMemoryLimit) {
                      this.modelMemoryLimit = _new_job.DEFAULT_MODEL_MEMORY_LIMIT;
                    } // eslint-disable-next-line no-console


                    console.error('Model memory limit could not be calculated', error);
                  }
                }

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function calculateModelMemoryLimit() {
        return _calculateModelMemoryLimit.apply(this, arguments);
      }

      return calculateModelMemoryLimit;
    }()
  }, {
    key: "cloneFromExistingJob",
    value: function cloneFromExistingJob(job, datafeed) {
      var _this2 = this;

      this._overrideConfigs(job, datafeed);

      this.createdBy = _new_job.CREATED_BY_LABEL.MULTI_METRIC;
      var detectors = (0, _general.getRichDetectors)(job, datafeed, this.additionalFields, false);

      if (datafeed.aggregations !== undefined) {
        // if we've converting from a single metric job,
        // delete the aggregations.
        delete datafeed.aggregations;
        delete job.analysis_config.summary_count_field_name;
      }

      this.removeAllDetectors();
      detectors.forEach(function (d, i) {
        var dtr = detectors[i];

        if (dtr.agg !== null && dtr.field !== null) {
          _this2.addDetector(dtr.agg, dtr.field);
        }
      });

      if (detectors.length) {
        if (detectors[0].partitionField !== null) {
          this.setSplitField(detectors[0].partitionField);
        }
      }
    }
  }, {
    key: "splitField",
    get: function get() {
      return this._splitField;
    }
  }, {
    key: "aggFieldPairs",
    get: function get() {
      var _this3 = this;

      return this.detectors.map(function (d, i) {
        return {
          field: _this3._fields[i],
          agg: _this3._aggs[i]
        };
      });
    }
  }]);

  return MultiMetricJobCreator;
}(_job_creator.JobCreator);

exports.MultiMetricJobCreator = MultiMetricJobCreator;