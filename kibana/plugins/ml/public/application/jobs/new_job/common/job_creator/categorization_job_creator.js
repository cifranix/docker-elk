"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategorizationJobCreator = void 0;

var _lodash = require("lodash");

var _job_creator = require("./job_creator");

var _fields = require("../../../../../../common/types/fields");

var _default_configs = require("./util/default_configs");

var _new_job = require("../../../../../../common/constants/new_job");

var _categorization_job = require("../../../../../../common/constants/categorization_job");

var _aggregation_types = require("../../../../../../common/constants/aggregation_types");

var _general = require("./util/general");

var _results_loader = require("../results_loader");

var _ml_server_info = require("../../../../services/ml_server_info");

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

var CategorizationJobCreator =
/*#__PURE__*/
function (_JobCreator) {
  _inherits(CategorizationJobCreator, _JobCreator);

  function CategorizationJobCreator(indexPattern, savedSearch, query) {
    var _this;

    _classCallCheck(this, CategorizationJobCreator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CategorizationJobCreator).call(this, indexPattern, savedSearch, query));

    _defineProperty(_assertThisInitialized(_this), "_type", _new_job.JOB_TYPE.CATEGORIZATION);

    _defineProperty(_assertThisInitialized(_this), "_createCountDetector", function () {});

    _defineProperty(_assertThisInitialized(_this), "_createRareDetector", function () {});

    _defineProperty(_assertThisInitialized(_this), "_examplesLoader", void 0);

    _defineProperty(_assertThisInitialized(_this), "_categoryFieldExamples", []);

    _defineProperty(_assertThisInitialized(_this), "_validationChecks", []);

    _defineProperty(_assertThisInitialized(_this), "_overallValidStatus", _categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.INVALID);

    _defineProperty(_assertThisInitialized(_this), "_detectorType", _aggregation_types.ML_JOB_AGGREGATION.COUNT);

    _defineProperty(_assertThisInitialized(_this), "_categorizationAnalyzer", {});

    _defineProperty(_assertThisInitialized(_this), "_defaultCategorizationAnalyzer", void 0);

    _this.createdBy = _new_job.CREATED_BY_LABEL.CATEGORIZATION;
    _this._examplesLoader = new _results_loader.CategorizationExamplesLoader(_assertThisInitialized(_this), indexPattern, query);

    var _getNewJobDefaults = (0, _ml_server_info.getNewJobDefaults)(),
        anomalyDetectors = _getNewJobDefaults.anomaly_detectors;

    _this._defaultCategorizationAnalyzer = anomalyDetectors.categorization_analyzer || {};
    return _this;
  }

  _createClass(CategorizationJobCreator, [{
    key: "setDefaultDetectorProperties",
    value: function setDefaultDetectorProperties(count, rare, eventRate) {
      var _this2 = this;

      if (count === null || rare === null || eventRate === null) {
        return;
      }

      this._createCountDetector = function () {
        _this2._createDetector(count, eventRate);
      };

      this._createRareDetector = function () {
        _this2._createDetector(rare, eventRate);
      };
    }
  }, {
    key: "_createDetector",
    value: function _createDetector(agg, field) {
      var dtr = (0, _default_configs.createBasicDetector)(agg, field);
      dtr.by_field_name = _fields.mlCategory.id;

      this._addDetector(dtr, agg, _fields.mlCategory);
    }
  }, {
    key: "setDetectorType",
    value: function setDetectorType(type) {
      this._detectorType = type;
      this.removeAllDetectors();

      if (type === _aggregation_types.ML_JOB_AGGREGATION.COUNT) {
        this._createCountDetector();

        this.bucketSpan = _new_job.DEFAULT_BUCKET_SPAN;
      } else {
        this._createRareDetector();

        this.bucketSpan = _new_job.DEFAULT_RARE_BUCKET_SPAN;
        this.modelPlot = false;
      }
    }
  }, {
    key: "loadCategorizationFieldExamples",
    value: function () {
      var _loadCategorizationFieldExamples = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, examples, sampleSize, overallValidStatus, validationChecks;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._examplesLoader.loadExamples();

              case 2:
                _ref = _context.sent;
                examples = _ref.examples;
                sampleSize = _ref.sampleSize;
                overallValidStatus = _ref.overallValidStatus;
                validationChecks = _ref.validationChecks;
                this._categoryFieldExamples = examples;
                this._validationChecks = validationChecks;
                this._overallValidStatus = overallValidStatus;
                return _context.abrupt("return", {
                  examples: examples,
                  sampleSize: sampleSize,
                  overallValidStatus: overallValidStatus,
                  validationChecks: validationChecks
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadCategorizationFieldExamples() {
        return _loadCategorizationFieldExamples.apply(this, arguments);
      }

      return loadCategorizationFieldExamples;
    }()
  }, {
    key: "cloneFromExistingJob",
    value: function cloneFromExistingJob(job, datafeed) {
      this._overrideConfigs(job, datafeed);

      this.createdBy = _new_job.CREATED_BY_LABEL.CATEGORIZATION;
      var detectors = (0, _general.getRichDetectors)(job, datafeed, this.additionalFields, false);
      var dtr = detectors[0];

      if (detectors.length && dtr.agg !== null && dtr.field !== null) {
        this._detectorType = dtr.agg.id === _aggregation_types.ML_JOB_AGGREGATION.COUNT ? _aggregation_types.ML_JOB_AGGREGATION.COUNT : _aggregation_types.ML_JOB_AGGREGATION.RARE;
        var bs = job.analysis_config.bucket_span;
        this.setDetectorType(this._detectorType); // set the bucketspan back to the original value
        // as setDetectorType applies a default

        this.bucketSpan = bs;
      }
    }
  }, {
    key: "categorizationFieldName",
    set: function set(fieldName) {
      if (fieldName !== null) {
        this._job_config.analysis_config.categorization_field_name = fieldName;
        this.setDetectorType(this._detectorType);
        this.addInfluencer(_fields.mlCategory.id);
      } else {
        delete this._job_config.analysis_config.categorization_field_name;
        this._categoryFieldExamples = [];
        this._validationChecks = [];
        this._overallValidStatus = _categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.INVALID;
      }
    },
    get: function get() {
      return this._job_config.analysis_config.categorization_field_name || null;
    }
  }, {
    key: "categoryFieldExamples",
    get: function get() {
      return this._categoryFieldExamples;
    }
  }, {
    key: "validationChecks",
    get: function get() {
      return this._validationChecks;
    }
  }, {
    key: "overallValidStatus",
    get: function get() {
      return this._overallValidStatus;
    }
  }, {
    key: "selectedDetectorType",
    get: function get() {
      return this._detectorType;
    }
  }, {
    key: "categorizationAnalyzer",
    set: function set(analyzer) {
      this._categorizationAnalyzer = analyzer;

      if ((0, _lodash.isEqual)(this._categorizationAnalyzer, this._defaultCategorizationAnalyzer)) {
        delete this._job_config.analysis_config.categorization_analyzer;
      } else {
        this._job_config.analysis_config.categorization_analyzer = analyzer;
      }
    },
    get: function get() {
      return this._categorizationAnalyzer;
    }
  }]);

  return CategorizationJobCreator;
}(_job_creator.JobCreator);

exports.CategorizationJobCreator = CategorizationJobCreator;