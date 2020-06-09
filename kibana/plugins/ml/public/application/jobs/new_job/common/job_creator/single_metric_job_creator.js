"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleMetricJobCreator = void 0;

var _parse_interval = require("../../../../../../common/util/parse_interval");

var _job_creator = require("./job_creator");

var _default_configs = require("./util/default_configs");

var _aggregation_types = require("../../../../../../common/constants/aggregation_types");

var _new_job = require("../../../../../../common/constants/new_job");

var _general = require("./util/general");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SingleMetricJobCreator =
/*#__PURE__*/
function (_JobCreator) {
  _inherits(SingleMetricJobCreator, _JobCreator);

  function SingleMetricJobCreator(indexPattern, savedSearch, query) {
    var _this;

    _classCallCheck(this, SingleMetricJobCreator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SingleMetricJobCreator).call(this, indexPattern, savedSearch, query));

    _defineProperty(_assertThisInitialized(_this), "_type", _new_job.JOB_TYPE.SINGLE_METRIC);

    _this.createdBy = _new_job.CREATED_BY_LABEL.SINGLE_METRIC;
    return _this;
  } // only a single detector exists for this job type
  // therefore _addDetector and _editDetector merge into this
  // single setDetector function


  _createClass(SingleMetricJobCreator, [{
    key: "setDetector",
    value: function setDetector(agg, field) {
      var dtr = (0, _default_configs.createBasicDetector)(agg, field);

      if (this._detectors.length === 0) {
        this._addDetector(dtr, agg, field);
      } else {
        this._editDetector(dtr, agg, field, 0);
      }

      this._createDatafeedAggregations();
    }
  }, {
    key: "_createDatafeedAggregations",
    // aggregations need to be recreated whenever the detector or bucket_span change
    value: function _createDatafeedAggregations() {
      if (this._detectors.length && typeof this._job_config.analysis_config.bucket_span === 'string' && this._aggs.length > 0) {
        delete this._job_config.analysis_config.summary_count_field_name;
        delete this._datafeed_config.aggregations;
        var functionName = this._aggs[0].dslName;
        var timeField = this._job_config.data_description.time_field;
        var duration = (0, _parse_interval.parseInterval)(this._job_config.analysis_config.bucket_span);

        if (duration === null) {
          return;
        }

        var bucketSpanSeconds = duration.asSeconds();
        var interval = bucketSpanSeconds * 1000;
        var field = null;

        switch (functionName) {
          case _aggregation_types.ES_AGGREGATION.COUNT:
            this._job_config.analysis_config.summary_count_field_name = 'doc_count';
            this._datafeed_config.aggregations = {
              buckets: {
                date_histogram: {
                  field: timeField,
                  fixed_interval: "".concat(interval, "ms")
                },
                aggregations: _defineProperty({}, timeField, {
                  max: {
                    field: timeField
                  }
                })
              }
            };
            break;

          case _aggregation_types.ES_AGGREGATION.AVG: // TODO - fix median aggregations
          // case ES_AGGREGATION.PERCENTILES:

          case _aggregation_types.ES_AGGREGATION.SUM:
          case _aggregation_types.ES_AGGREGATION.MIN:
          case _aggregation_types.ES_AGGREGATION.MAX:
            field = this._fields[0];

            if (field !== null) {
              var _aggregations2;

              var fieldName = field.name;
              this._job_config.analysis_config.summary_count_field_name = 'doc_count';
              this._datafeed_config.aggregations = {
                buckets: {
                  date_histogram: {
                    field: timeField,
                    fixed_interval: "".concat(interval * 0.1, "ms") // use 10% of bucketSpan to allow for better sampling

                  },
                  aggregations: (_aggregations2 = {}, _defineProperty(_aggregations2, fieldName, _defineProperty({}, functionName, {
                    field: fieldName
                  })), _defineProperty(_aggregations2, timeField, {
                    max: {
                      field: timeField
                    }
                  }), _aggregations2)
                }
              };
            }

            break;

          case _aggregation_types.ES_AGGREGATION.CARDINALITY:
            field = this._fields[0];

            if (field !== null) {
              var _aggregations3;

              var _fieldName2 = field.name;
              this._job_config.analysis_config.summary_count_field_name = "dc_".concat(_fieldName2);
              this._datafeed_config.aggregations = {
                buckets: {
                  date_histogram: {
                    field: timeField,
                    fixed_interval: "".concat(interval, "ms")
                  },
                  aggregations: (_aggregations3 = {}, _defineProperty(_aggregations3, timeField, {
                    max: {
                      field: timeField
                    }
                  }), _defineProperty(_aggregations3, this._job_config.analysis_config.summary_count_field_name, _defineProperty({}, functionName, {
                    field: _fieldName2
                  })), _aggregations3)
                }
              };
              var dtr = this._detectors[0]; // finally, modify the detector before saving

              dtr.function = _aggregation_types.ML_JOB_AGGREGATION.NON_ZERO_COUNT; // add a description using the original function name rather 'non_zero_count'
              // as the user may not be aware it's been changed

              dtr.detector_description = "".concat(functionName, " (").concat(_fieldName2, ")");
              delete dtr.field_name;
            }

            break;

          default:
            break;
        }
      }
    }
  }, {
    key: "cloneFromExistingJob",
    value: function cloneFromExistingJob(job, datafeed) {
      this._overrideConfigs(job, datafeed);

      this.createdBy = _new_job.CREATED_BY_LABEL.SINGLE_METRIC;
      var detectors = (0, _general.getRichDetectors)(job, datafeed, this.additionalFields, false);
      this.removeAllDetectors();
      var dtr = detectors[0];

      if (detectors.length && dtr.agg !== null && dtr.field !== null) {
        this.setDetector(dtr.agg, dtr.field);
      }
    }
  }, {
    key: "bucketSpan",
    set: function set(bucketSpan) {
      this._job_config.analysis_config.bucket_span = bucketSpan;

      this._setBucketSpanMs(bucketSpan);

      this._createDatafeedAggregations();
    } // overriding set means we need to override get too
    // JS doesn't do inheritance very well
    ,
    get: function get() {
      return this._job_config.analysis_config.bucket_span;
    }
  }, {
    key: "aggFieldPair",
    get: function get() {
      if (this._aggs.length === 0) {
        return null;
      } else {
        return {
          agg: this._aggs[0],
          field: this._fields[0]
        };
      }
    }
  }]);

  return SingleMetricJobCreator;
}(_job_creator.JobCreator);

exports.SingleMetricJobCreator = SingleMetricJobCreator;