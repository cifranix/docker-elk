"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobCreator = void 0;

var _aggregation_types = require("../../../../../../common/constants/aggregation_types");

var _public = require("../../../../../../../../../src/plugins/data/public");

var _default_configs = require("./util/default_configs");

var _job_service = require("../../../../services/job_service");

var _job_runner = require("../job_runner");

var _new_job = require("../../../../../../common/constants/new_job");

var _general = require("./util/general");

var _parse_interval = require("../../../../../../common/util/parse_interval");

var _calendar_service = require("../../../../services/calendar_service");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JobCreator =
/*#__PURE__*/
function () {
  function JobCreator(indexPattern, savedSearch, query) {
    _classCallCheck(this, JobCreator);

    _defineProperty(this, "_type", _new_job.JOB_TYPE.SINGLE_METRIC);

    _defineProperty(this, "_indexPattern", void 0);

    _defineProperty(this, "_savedSearch", void 0);

    _defineProperty(this, "_indexPatternTitle", '');

    _defineProperty(this, "_job_config", void 0);

    _defineProperty(this, "_calendars", void 0);

    _defineProperty(this, "_datafeed_config", void 0);

    _defineProperty(this, "_detectors", void 0);

    _defineProperty(this, "_influencers", void 0);

    _defineProperty(this, "_bucketSpanMs", 0);

    _defineProperty(this, "_useDedicatedIndex", false);

    _defineProperty(this, "_start", 0);

    _defineProperty(this, "_end", 0);

    _defineProperty(this, "_subscribers", []);

    _defineProperty(this, "_aggs", []);

    _defineProperty(this, "_fields", []);

    _defineProperty(this, "_scriptFields", []);

    _defineProperty(this, "_aggregationFields", []);

    _defineProperty(this, "_sparseData", false);

    _defineProperty(this, "_stopAllRefreshPolls", {
      stop: false
    });

    this._indexPattern = indexPattern;
    this._savedSearch = savedSearch;
    this._indexPatternTitle = indexPattern.title;
    this._job_config = (0, _default_configs.createEmptyJob)();
    this._calendars = [];
    this._datafeed_config = (0, _default_configs.createEmptyDatafeed)(this._indexPatternTitle);
    this._detectors = this._job_config.analysis_config.detectors;
    this._influencers = this._job_config.analysis_config.influencers;

    if (typeof indexPattern.timeFieldName === 'string') {
      this._job_config.data_description.time_field = indexPattern.timeFieldName;
    }

    this._datafeed_config.query = query;
  }

  _createClass(JobCreator, [{
    key: "_addDetector",
    value: function _addDetector(detector, agg, field) {
      this._detectors.push(detector);

      this._aggs.push(agg);

      this._fields.push(field);

      this._updateSparseDataDetectors();
    }
  }, {
    key: "_editDetector",
    value: function _editDetector(detector, agg, field, index) {
      if (this._detectors[index] !== undefined) {
        this._detectors[index] = detector;
        this._aggs[index] = agg;
        this._fields[index] = field;

        this._updateSparseDataDetectors();
      }
    }
  }, {
    key: "_removeDetector",
    value: function _removeDetector(index) {
      this._detectors.splice(index, 1);

      this._aggs.splice(index, 1);

      this._fields.splice(index, 1);
    }
  }, {
    key: "removeAllDetectors",
    value: function removeAllDetectors() {
      this._detectors.length = 0;
      this._aggs.length = 0;
      this._fields.length = 0;
    }
  }, {
    key: "getAggregation",
    value: function getAggregation(index) {
      var agg = this._aggs[index];
      return agg !== undefined ? agg : null;
    }
  }, {
    key: "getField",
    value: function getField(index) {
      var field = this._fields[index];
      return field !== undefined ? field : null;
    }
  }, {
    key: "_setBucketSpanMs",
    value: function _setBucketSpanMs(bucketSpan) {
      var bs = (0, _parse_interval.parseInterval)(bucketSpan);
      this._bucketSpanMs = bs === null ? 0 : bs.asMilliseconds();
    }
  }, {
    key: "addInfluencer",
    value: function addInfluencer(influencer) {
      if (this._influencers.includes(influencer) === false) {
        this._influencers.push(influencer);
      }
    }
  }, {
    key: "removeInfluencer",
    value: function removeInfluencer(influencer) {
      var idx = this._influencers.indexOf(influencer);

      if (idx !== -1) {
        this._influencers.splice(idx, 1);
      }
    }
  }, {
    key: "removeAllInfluencers",
    value: function removeAllInfluencers() {
      this._influencers.length = 0;
    }
  }, {
    key: "addCategorizationFilter",
    value: function addCategorizationFilter(filter) {
      if (this._job_config.analysis_config.categorization_filters === undefined) {
        this._job_config.analysis_config.categorization_filters = [];
      }

      var filters = this._job_config.analysis_config.categorization_filters;

      if (filters.includes(filter) === false) {
        filters.push(filter);
      }
    }
  }, {
    key: "removeCategorizationFilter",
    value: function removeCategorizationFilter(filter) {
      var filters = this._job_config.analysis_config.categorization_filters;

      if (filters !== undefined) {
        var idx = filters.indexOf(filter);

        if (idx !== -1) {
          filters.splice(idx, 1);
        }

        if (filters.length === 0) {
          this.removeCategorizationFilters();
        }
      }
    }
  }, {
    key: "removeCategorizationFilters",
    value: function removeCategorizationFilters() {
      delete this._job_config.analysis_config.categorization_filters;
    }
  }, {
    key: "_updateSparseDataDetectors",
    value: function _updateSparseDataDetectors() {
      var _this = this;

      // loop through each detector, if the aggregation in the corresponding detector index is a count or sum
      // change the detector to be a non-zer or non-null count or sum.
      // note, the aggregations will always be a standard count or sum and not a non-null or non-zero version
      this._detectors.forEach(function (d, i) {
        switch (_this._aggs[i].id) {
          case _aggregation_types.ML_JOB_AGGREGATION.COUNT:
            d.function = _this._sparseData ? _aggregation_types.ML_JOB_AGGREGATION.NON_ZERO_COUNT : _aggregation_types.ML_JOB_AGGREGATION.COUNT;
            break;

          case _aggregation_types.ML_JOB_AGGREGATION.HIGH_COUNT:
            d.function = _this._sparseData ? _aggregation_types.ML_JOB_AGGREGATION.HIGH_NON_ZERO_COUNT : _aggregation_types.ML_JOB_AGGREGATION.HIGH_COUNT;
            break;

          case _aggregation_types.ML_JOB_AGGREGATION.LOW_COUNT:
            d.function = _this._sparseData ? _aggregation_types.ML_JOB_AGGREGATION.LOW_NON_ZERO_COUNT : _aggregation_types.ML_JOB_AGGREGATION.LOW_COUNT;
            break;

          case _aggregation_types.ML_JOB_AGGREGATION.SUM:
            d.function = _this._sparseData ? _aggregation_types.ML_JOB_AGGREGATION.NON_NULL_SUM : _aggregation_types.ML_JOB_AGGREGATION.SUM;
            break;

          case _aggregation_types.ML_JOB_AGGREGATION.HIGH_SUM:
            d.function = _this._sparseData ? _aggregation_types.ML_JOB_AGGREGATION.HIGH_NON_NULL_SUM : _aggregation_types.ML_JOB_AGGREGATION.HIGH_SUM;
            break;

          case _aggregation_types.ML_JOB_AGGREGATION.LOW_SUM:
            d.function = _this._sparseData ? _aggregation_types.ML_JOB_AGGREGATION.LOW_NON_NULL_SUM : _aggregation_types.ML_JOB_AGGREGATION.LOW_SUM;
            break;
        }
      });
    }
    /**
     * Extends assigned calendars with created job id.
     * @private
     */

  }, {
    key: "_updateCalendars",
    value: function () {
      var _updateCalendars2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, calendar;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._calendars.length === 0)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = this._calendars[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 14;
                  break;
                }

                calendar = _step.value;
                _context.next = 11;
                return _calendar_service.mlCalendarService.assignNewJobId(calendar, this.jobId);

              case 11:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 14:
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 23:
                _context.prev = 23;

                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context.finish(23);

              case 27:
                return _context.finish(20);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 16, 20, 28], [21,, 23, 27]]);
      }));

      function _updateCalendars() {
        return _updateCalendars2.apply(this, arguments);
      }

      return _updateCalendars;
    }()
  }, {
    key: "setTimeRange",
    value: function setTimeRange(start, end) {
      this._start = start;
      this._end = end;
    }
  }, {
    key: "createAndStartJob",
    value: function () {
      var _createAndStartJob = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var jobRunner;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.createJob();

              case 3:
                _context2.next = 5;
                return this.createDatafeed();

              case 5:
                _context2.next = 7;
                return this.startDatafeed();

              case 7:
                jobRunner = _context2.sent;
                return _context2.abrupt("return", jobRunner);

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 11]]);
      }));

      function createAndStartJob() {
        return _createAndStartJob.apply(this, arguments);
      }

      return createAndStartJob;
    }()
  }, {
    key: "createJob",
    value: function () {
      var _createJob = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _ref, success, resp;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _job_service.mlJobService.saveNewJob(this._job_config);

              case 3:
                _ref = _context3.sent;
                success = _ref.success;
                resp = _ref.resp;
                _context3.next = 8;
                return this._updateCalendars();

              case 8:
                if (!(success === true)) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", resp);

              case 12:
                throw resp;

              case 13:
                _context3.next = 18;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 15]]);
      }));

      function createJob() {
        return _createJob.apply(this, arguments);
      }

      return createJob;
    }()
  }, {
    key: "createDatafeed",
    value: function () {
      var _createDatafeed = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _job_service.mlJobService.saveNewDatafeed(this._datafeed_config, this._job_config.job_id);

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      }));

      function createDatafeed() {
        return _createDatafeed.apply(this, arguments);
      }

      return createDatafeed;
    }() // create a jobRunner instance, start it and return it

  }, {
    key: "startDatafeed",
    value: function () {
      var _startDatafeed = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var jobRunner;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                jobRunner = new _job_runner.JobRunner(this);
                _context5.next = 3;
                return jobRunner.startDatafeed();

              case 3:
                return _context5.abrupt("return", jobRunner);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function startDatafeed() {
        return _startDatafeed.apply(this, arguments);
      }

      return startDatafeed;
    }()
  }, {
    key: "subscribeToProgress",
    value: function subscribeToProgress(func) {
      this._subscribers.push(func);
    }
  }, {
    key: "forceStopRefreshPolls",
    value: function forceStopRefreshPolls() {
      this._stopAllRefreshPolls.stop = true;
    }
  }, {
    key: "_setCustomSetting",
    value: function _setCustomSetting(setting, value) {
      if (value === null) {
        // if null is passed in, delete the custom setting
        if (this._job_config.custom_settings !== undefined && this._job_config.custom_settings[setting] !== undefined) {
          delete this._job_config.custom_settings[setting];

          if (Object.keys(this._job_config.custom_settings).length === 0) {
            // clean up custom_settings if there's nothing else in there
            delete this._job_config.custom_settings;
          }
        }
      } else {
        if (this._job_config.custom_settings === undefined) {
          // if custom_settings doesn't exist, create it.
          this._job_config.custom_settings = _defineProperty({}, setting, value);
        } else {
          // @ts-ignore
          this._job_config.custom_settings[setting] = value;
        }
      }
    }
  }, {
    key: "_getCustomSetting",
    value: function _getCustomSetting(setting) {
      if (this._job_config.custom_settings !== undefined && this._job_config.custom_settings[setting] !== undefined) {
        return this._job_config.custom_settings[setting];
      }

      return null;
    }
  }, {
    key: "_overrideConfigs",
    value: function _overrideConfigs(job, datafeed) {
      var _this2 = this,
          _this$_datafeed_confi,
          _this$_datafeed_confi2;

      this._job_config = job;
      this._datafeed_config = datafeed;
      this._detectors = this._job_config.analysis_config.detectors;
      this._influencers = this._job_config.analysis_config.influencers;

      if (this._job_config.groups === undefined) {
        this._job_config.groups = [];
      }

      if (this._job_config.analysis_config.influencers !== undefined) {
        this._job_config.analysis_config.influencers.forEach(function (i) {
          return _this2.addInfluencer(i);
        });
      }

      if (this._job_config.results_index_name !== undefined && this._job_config.results_index_name !== _new_job.SHARED_RESULTS_INDEX_NAME) {
        this.useDedicatedIndex = true;
      }

      this._sparseData = (0, _general.isSparseDataJob)(job, datafeed);
      this._scriptFields = [];

      if (this._datafeed_config.script_fields !== undefined) {
        this._scriptFields = Object.keys(this._datafeed_config.script_fields).map(function (f) {
          return {
            id: f,
            name: f,
            type: _public.ES_FIELD_TYPES.KEYWORD,
            aggregatable: true
          };
        });
      }

      this._aggregationFields = [];
      var buckets = ((_this$_datafeed_confi = this._datafeed_config.aggregations) === null || _this$_datafeed_confi === void 0 ? void 0 : _this$_datafeed_confi.buckets) || ((_this$_datafeed_confi2 = this._datafeed_config.aggs) === null || _this$_datafeed_confi2 === void 0 ? void 0 : _this$_datafeed_confi2.buckets);

      if (buckets !== undefined) {
        (0, _general.collectAggs)(buckets, this._aggregationFields);
      }
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "detectors",
    get: function get() {
      return this._detectors;
    }
  }, {
    key: "aggregationsInDetectors",
    get: function get() {
      return this._aggs;
    }
  }, {
    key: "aggregations",
    get: function get() {
      return this._aggs;
    }
  }, {
    key: "fields",
    get: function get() {
      return this._fields;
    }
  }, {
    key: "bucketSpan",
    set: function set(bucketSpan) {
      this._job_config.analysis_config.bucket_span = bucketSpan;

      this._setBucketSpanMs(bucketSpan);
    },
    get: function get() {
      return this._job_config.analysis_config.bucket_span;
    }
  }, {
    key: "bucketSpanMs",
    get: function get() {
      return this._bucketSpanMs;
    }
  }, {
    key: "influencers",
    get: function get() {
      return this._influencers;
    }
  }, {
    key: "jobId",
    set: function set(jobId) {
      this._job_config.job_id = jobId;
      this._datafeed_config.job_id = jobId;
      this._datafeed_config.datafeed_id = "datafeed-".concat(jobId);

      if (this._useDedicatedIndex) {
        this._job_config.results_index_name = jobId;
      }
    },
    get: function get() {
      return this._job_config.job_id;
    }
  }, {
    key: "datafeedId",
    get: function get() {
      return this._datafeed_config.datafeed_id;
    }
  }, {
    key: "description",
    set: function set(description) {
      this._job_config.description = description;
    },
    get: function get() {
      return this._job_config.description;
    }
  }, {
    key: "groups",
    get: function get() {
      return this._job_config.groups;
    },
    set: function set(groups) {
      this._job_config.groups = groups;
    }
  }, {
    key: "calendars",
    get: function get() {
      return this._calendars;
    },
    set: function set(calendars) {
      this._calendars = calendars;
    }
  }, {
    key: "modelPlot",
    set: function set(enable) {
      if (enable) {
        this._job_config.model_plot_config = {
          enabled: true
        };
      } else {
        delete this._job_config.model_plot_config;
      }
    },
    get: function get() {
      return this._job_config.model_plot_config !== undefined && this._job_config.model_plot_config.enabled === true;
    }
  }, {
    key: "useDedicatedIndex",
    set: function set(enable) {
      this._useDedicatedIndex = enable;

      if (enable) {
        this._job_config.results_index_name = this._job_config.job_id;
      } else {
        delete this._job_config.results_index_name;
      }
    },
    get: function get() {
      return this._useDedicatedIndex;
    }
  }, {
    key: "modelMemoryLimit",
    set: function set(mml) {
      if (mml !== null) {
        this._job_config.analysis_limits = {
          model_memory_limit: mml
        };
      } else {
        delete this._job_config.analysis_limits;
      }
    },
    get: function get() {
      if (this._job_config.analysis_limits && this._job_config.analysis_limits.model_memory_limit !== undefined) {
        return this._job_config.analysis_limits.model_memory_limit;
      } else {
        return null;
      }
    }
  }, {
    key: "summaryCountFieldName",
    set: function set(fieldName) {
      if (fieldName !== null) {
        this._job_config.analysis_config.summary_count_field_name = fieldName;
      } else {
        delete this._job_config.analysis_config.summary_count_field_name;
      }
    },
    get: function get() {
      return this._job_config.analysis_config.summary_count_field_name || null;
    }
  }, {
    key: "categorizationFieldName",
    set: function set(fieldName) {
      if (fieldName !== null) {
        this._job_config.analysis_config.categorization_field_name = fieldName;
      } else {
        delete this._job_config.analysis_config.categorization_field_name;
      }
    },
    get: function get() {
      return this._job_config.analysis_config.categorization_field_name || null;
    }
  }, {
    key: "categorizationFilters",
    get: function get() {
      return this._job_config.analysis_config.categorization_filters || null;
    }
  }, {
    key: "timeFieldName",
    get: function get() {
      return this._job_config.data_description.time_field;
    },
    set: function set(fieldName) {
      this._job_config.data_description.time_field = fieldName;
    }
  }, {
    key: "sparseData",
    get: function get() {
      return this._sparseData;
    },
    set: function set(sparseData) {
      this._sparseData = sparseData;

      this._updateSparseDataDetectors();
    }
  }, {
    key: "start",
    get: function get() {
      return this._start;
    }
  }, {
    key: "end",
    get: function get() {
      return this._end;
    }
  }, {
    key: "query",
    get: function get() {
      return this._datafeed_config.query;
    },
    set: function set(query) {
      this._datafeed_config.query = query;
    }
  }, {
    key: "queryDelay",
    get: function get() {
      return this._datafeed_config.query_delay || null;
    },
    set: function set(queryDelay) {
      if (queryDelay !== null) {
        this._datafeed_config.query_delay = queryDelay;
      } else {
        delete this._datafeed_config.query_delay;
      }
    }
  }, {
    key: "frequency",
    get: function get() {
      return this._datafeed_config.frequency || null;
    },
    set: function set(frequency) {
      if (frequency !== null) {
        this._datafeed_config.frequency = frequency;
      } else {
        delete this._datafeed_config.frequency;
      }
    }
  }, {
    key: "scrollSize",
    get: function get() {
      return this._datafeed_config.scroll_size || null;
    },
    set: function set(scrollSize) {
      if (scrollSize !== null) {
        this._datafeed_config.scroll_size = scrollSize;
      } else {
        delete this._datafeed_config.scroll_size;
      }
    }
  }, {
    key: "indices",
    get: function get() {
      return this._datafeed_config.indices;
    }
  }, {
    key: "scriptFields",
    get: function get() {
      return this._scriptFields;
    }
  }, {
    key: "aggregationFields",
    get: function get() {
      return this._aggregationFields;
    }
  }, {
    key: "additionalFields",
    get: function get() {
      return [].concat(_toConsumableArray(this._scriptFields), _toConsumableArray(this._aggregationFields));
    }
  }, {
    key: "subscribers",
    get: function get() {
      return this._subscribers;
    }
  }, {
    key: "jobConfig",
    get: function get() {
      return this._job_config;
    }
  }, {
    key: "datafeedConfig",
    get: function get() {
      return this._datafeed_config;
    }
  }, {
    key: "stopAllRefreshPolls",
    get: function get() {
      return this._stopAllRefreshPolls;
    }
  }, {
    key: "createdBy",
    set: function set(createdBy) {
      this._setCustomSetting('created_by', createdBy);
    },
    get: function get() {
      return this._getCustomSetting('created_by');
    }
  }, {
    key: "customUrls",
    set: function set(customUrls) {
      this._setCustomSetting('custom_urls', customUrls);
    },
    get: function get() {
      return this._getCustomSetting('custom_urls');
    }
  }, {
    key: "formattedJobJson",
    get: function get() {
      return JSON.stringify(this._job_config, null, 2);
    }
  }, {
    key: "formattedDatafeedJson",
    get: function get() {
      return JSON.stringify(this._datafeed_config, null, 2);
    }
  }]);

  return JobCreator;
}();

exports.JobCreator = JobCreator;