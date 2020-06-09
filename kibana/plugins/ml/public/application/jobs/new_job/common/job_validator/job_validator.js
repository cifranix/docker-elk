"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobValidator = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _job_utils = require("../../../../../../common/util/job_utils");

var _ml_server_info = require("../../../../services/ml_server_info");

var _job_creator = require("../job_creator");

var _util = require("./util");

var _validators = require("./validators");

var _categorization_job = require("../../../../../../common/constants/categorization_job");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// delay start of validation to allow the user to make changes
// e.g. if they are typing in a new value, try not to validate
// after every keystroke
var VALIDATION_DELAY_MS = 500;

var JobValidator =
/*#__PURE__*/
function () {
  /**
   * Observable that combines basic and async validation results.
   */
  function JobValidator(jobCreator, existingJobsAndGroups) {
    var _this = this;

    _classCallCheck(this, JobValidator);

    _defineProperty(this, "_jobCreator", void 0);

    _defineProperty(this, "_validationSummary", void 0);

    _defineProperty(this, "_lastJobConfig", void 0);

    _defineProperty(this, "_lastDatafeedConfig", void 0);

    _defineProperty(this, "_validateTimeout", null);

    _defineProperty(this, "_asyncValidators$", []);

    _defineProperty(this, "_asyncValidatorsResult$", void 0);

    _defineProperty(this, "_existingJobsAndGroups", void 0);

    _defineProperty(this, "_basicValidations", {
      jobId: {
        valid: true
      },
      groupIds: {
        valid: true
      },
      modelMemoryLimit: {
        valid: true
      },
      bucketSpan: {
        valid: true
      },
      duplicateDetectors: {
        valid: true
      },
      query: {
        valid: true
      },
      queryDelay: {
        valid: true
      },
      frequency: {
        valid: true
      },
      scrollSize: {
        valid: true
      }
    });

    _defineProperty(this, "_advancedValidations", {
      categorizationFieldValid: {
        valid: true
      }
    });

    _defineProperty(this, "_validating", false);

    _defineProperty(this, "_basicValidationResult$", new _rxjs.ReplaySubject(2));

    _defineProperty(this, "_jobCreatorSubject$", new _rxjs.Subject());

    _defineProperty(this, "validationResult$", void 0);

    _defineProperty(this, "latestValidationResult", this._basicValidations);

    this._jobCreator = jobCreator;
    this._lastJobConfig = this._jobCreator.formattedJobJson;
    this._lastDatafeedConfig = this._jobCreator.formattedDatafeedJson;
    this._validationSummary = {
      basic: false,
      advanced: false
    };
    this._existingJobsAndGroups = existingJobsAndGroups;
    this._asyncValidators$ = [(0, _validators.cardinalityValidator)(this._jobCreatorSubject$)];
    this._asyncValidatorsResult$ = (0, _rxjs.combineLatest)(this._asyncValidators$).pipe((0, _operators.map)(function (res) {
      return res.reduce(function (acc, curr) {
        return _objectSpread({}, acc, {}, curr ? curr : {});
      }, {});
    }));
    this.validationResult$ = (0, _rxjs.combineLatest)([this._basicValidationResult$, this._asyncValidatorsResult$]).pipe((0, _operators.map)(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          basicValidationResult = _ref2[0],
          asyncValidatorsResult = _ref2[1];

      return _objectSpread({}, basicValidationResult, {}, asyncValidatorsResult);
    }), (0, _operators.tap)(function (latestValidationResult) {
      _this.latestValidationResult = latestValidationResult;
    }));
  }

  _createClass(JobValidator, [{
    key: "validate",
    value: function validate(callback) {
      var _this2 = this;

      var forceValidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this._validating = true;
      var formattedJobConfig = this._jobCreator.formattedJobJson;
      var formattedDatafeedConfig = this._jobCreator.formattedDatafeedJson; // only validate if the config has changed

      if (forceValidate || formattedJobConfig !== this._lastJobConfig || formattedDatafeedConfig !== this._lastDatafeedConfig) {
        if (this._validateTimeout !== null) {
          // clear any previous on going validation timeouts
          clearTimeout(this._validateTimeout);
        }

        this._lastJobConfig = formattedJobConfig;
        this._lastDatafeedConfig = formattedDatafeedConfig;
        this._validateTimeout = setTimeout(function () {
          _this2._runBasicValidation();

          _this2._runAdvancedValidation();

          _this2._jobCreatorSubject$.next(_this2._jobCreator);

          _this2._validating = false;
          _this2._validateTimeout = null;
          callback();
        }, VALIDATION_DELAY_MS);
      } else {
        // _validating is still true if there is a previous validation timeout on going.
        this._validating = this._validateTimeout !== null;
      }

      callback();
    }
  }, {
    key: "_resetBasicValidations",
    value: function _resetBasicValidations() {
      this._validationSummary.basic = true;
      Object.values(this._basicValidations).forEach(function (v) {
        v.valid = true;
        delete v.message;
      });
    }
  }, {
    key: "_runBasicValidation",
    value: function _runBasicValidation() {
      this._resetBasicValidations();

      var jobConfig = this._jobCreator.jobConfig;
      var datafeedConfig = this._jobCreator.datafeedConfig;
      var limits = (0, _ml_server_info.getNewJobLimits)(); // run standard basic validation

      var basicJobResults = (0, _job_utils.basicJobValidation)(jobConfig, undefined, limits);
      (0, _util.populateValidationMessages)(basicJobResults, this._basicValidations, jobConfig, datafeedConfig);
      var basicDatafeedResults = (0, _job_utils.basicDatafeedValidation)(datafeedConfig);
      (0, _util.populateValidationMessages)(basicDatafeedResults, this._basicValidations, jobConfig, datafeedConfig); // run addition job and group id validation

      var idResults = (0, _util.checkForExistingJobAndGroupIds)(this._jobCreator.jobId, this._jobCreator.groups, this._existingJobsAndGroups);
      (0, _util.populateValidationMessages)(idResults, this._basicValidations, jobConfig, datafeedConfig);
      this._validationSummary.basic = this._isOverallBasicValid(); // Update validation results subject

      this._basicValidationResult$.next(this._basicValidations);
    }
  }, {
    key: "_runAdvancedValidation",
    value: function _runAdvancedValidation() {
      if ((0, _job_creator.isCategorizationJobCreator)(this._jobCreator)) {
        this._advancedValidations.categorizationFieldValid.valid = this._jobCreator.overallValidStatus !== _categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.INVALID;
      }
    }
  }, {
    key: "_isOverallBasicValid",
    value: function _isOverallBasicValid() {
      return Object.values(this._basicValidations).some(function (v) {
        return v.valid === false;
      }) === false;
    }
  }, {
    key: "validationSummary",
    get: function get() {
      return this._validationSummary;
    }
  }, {
    key: "bucketSpan",
    get: function get() {
      return this._basicValidations.bucketSpan;
    }
  }, {
    key: "duplicateDetectors",
    get: function get() {
      return this._basicValidations.duplicateDetectors;
    }
  }, {
    key: "jobId",
    get: function get() {
      return this._basicValidations.jobId;
    }
  }, {
    key: "groupIds",
    get: function get() {
      return this._basicValidations.groupIds;
    }
  }, {
    key: "modelMemoryLimit",
    get: function get() {
      return this._basicValidations.modelMemoryLimit;
    }
  }, {
    key: "query",
    get: function get() {
      return this._basicValidations.query;
    }
  }, {
    key: "queryDelay",
    get: function get() {
      return this._basicValidations.queryDelay;
    }
  }, {
    key: "frequency",
    get: function get() {
      return this._basicValidations.frequency;
    }
  }, {
    key: "scrollSize",
    get: function get() {
      return this._basicValidations.scrollSize;
    }
  }, {
    key: "advancedValid",
    set: function set(valid) {
      this._validationSummary.advanced = valid;
    }
  }, {
    key: "validating",
    get: function get() {
      return this._validating;
    }
  }, {
    key: "categorizationField",
    get: function get() {
      return this._advancedValidations.categorizationFieldValid.valid;
    },
    set: function set(valid) {
      this._advancedValidations.categorizationFieldValid.valid = valid;
    }
  }]);

  return JobValidator;
}();

exports.JobValidator = JobValidator;