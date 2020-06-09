"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedJobCreator = void 0;

var _job_creator = require("./job_creator");

var _default_configs = require("./util/default_configs");

var _new_job = require("../../../../../../common/constants/new_job");

var _general = require("./util/general");

var _validation_utils = require("../../../../../../common/util/validation_utils");

var _ml_api_service = require("../../../../services/ml_api_service");

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

var AdvancedJobCreator =
/*#__PURE__*/
function (_JobCreator) {
  _inherits(AdvancedJobCreator, _JobCreator);

  function AdvancedJobCreator(indexPattern, savedSearch, query) {
    var _this;

    _classCallCheck(this, AdvancedJobCreator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AdvancedJobCreator).call(this, indexPattern, savedSearch, query));

    _defineProperty(_assertThisInitialized(_this), "_type", _new_job.JOB_TYPE.ADVANCED);

    _defineProperty(_assertThisInitialized(_this), "_richDetectors", []);

    _defineProperty(_assertThisInitialized(_this), "_queryString", void 0);

    _this._queryString = JSON.stringify(_this._datafeed_config.query);
    return _this;
  }

  _createClass(AdvancedJobCreator, [{
    key: "addDetector",
    value: function addDetector(agg, field, byField, overField, partitionField, excludeFrequent, description) {
      // addDetector doesn't support adding new custom rules.
      // this will be added in the future once it's supported in the UI
      var customRules = null;

      var _this$_createDetector = this._createDetector(agg, field, byField, overField, partitionField, excludeFrequent, description, customRules),
          detector = _this$_createDetector.detector,
          richDetector = _this$_createDetector.richDetector;

      this._addDetector(detector, agg, field);

      this._richDetectors.push(richDetector);
    }
  }, {
    key: "editDetector",
    value: function editDetector(agg, field, byField, overField, partitionField, excludeFrequent, description, index) {
      var customRules = this._detectors[index] !== undefined ? this._detectors[index].custom_rules || null : null;

      var _this$_createDetector2 = this._createDetector(agg, field, byField, overField, partitionField, excludeFrequent, description, customRules),
          detector = _this$_createDetector2.detector,
          richDetector = _this$_createDetector2.richDetector;

      this._editDetector(detector, agg, field, index);

      if (this._richDetectors[index] !== undefined) {
        this._richDetectors[index] = richDetector;
      }
    }
  }, {
    key: "_createDetector",
    value: function _createDetector(agg, field, byField, overField, partitionField, excludeFrequent, description, customRules) {
      var detector = (0, _default_configs.createBasicDetector)(agg, field);

      if (byField !== null) {
        detector.by_field_name = byField.id;
      }

      if (overField !== null) {
        detector.over_field_name = overField.id;
      }

      if (partitionField !== null) {
        detector.partition_field_name = partitionField.id;
      }

      if (excludeFrequent !== null) {
        detector.exclude_frequent = excludeFrequent;
      }

      if (description !== null) {
        detector.detector_description = description;
      }

      if (customRules !== null) {
        detector.custom_rules = customRules;
      }

      var richDetector = {
        agg: agg,
        field: field,
        byField: byField,
        overField: overField,
        partitionField: partitionField,
        excludeFrequent: excludeFrequent,
        description: description,
        customRules: customRules
      };
      return {
        detector: detector,
        richDetector: richDetector
      };
    }
  }, {
    key: "removeDetector",
    value: function removeDetector(index) {
      this._removeDetector(index);

      this._richDetectors.splice(index, 1);
    }
  }, {
    key: "autoSetTimeRange",
    // load the start and end times for the selected index
    // and apply them to the job creator
    value: function () {
      var _autoSetTimeRange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, start, end;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _ml_api_service.ml.getTimeFieldRange({
                  index: this._indexPatternTitle,
                  timeFieldName: this.timeFieldName,
                  query: this.query
                });

              case 3:
                _ref = _context.sent;
                start = _ref.start;
                end = _ref.end;
                this.setTimeRange(start.epoch, end.epoch);
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                throw Error(_context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function autoSetTimeRange() {
        return _autoSetTimeRange.apply(this, arguments);
      }

      return autoSetTimeRange;
    }()
  }, {
    key: "cloneFromExistingJob",
    value: function cloneFromExistingJob(job, datafeed) {
      var _this2 = this;

      this._overrideConfigs(job, datafeed);

      var detectors = (0, _general.getRichDetectors)(job, datafeed, this.additionalFields, true); // keep track of the custom rules for each detector

      var customRules = this._detectors.map(function (d) {
        return d.custom_rules;
      });

      this.removeAllDetectors();
      this._richDetectors.length = 0;
      detectors.forEach(function (d, i) {
        var dtr = detectors[i];

        if (dtr.agg !== null && dtr.field !== null) {
          _this2.addDetector(dtr.agg, dtr.field, dtr.byField, dtr.overField, dtr.partitionField, dtr.excludeFrequent, dtr.description);
        }
      }); // re-apply custom rules

      customRules.forEach(function (cr, i) {
        if (cr !== undefined) {
          _this2._detectors[i].custom_rules = cr;
        }
      });
    }
  }, {
    key: "richDetectors",
    get: function get() {
      return this._richDetectors;
    }
  }, {
    key: "queryString",
    get: function get() {
      return this._queryString;
    },
    set: function set(qs) {
      this._queryString = qs;
    }
  }, {
    key: "isValidQueryString",
    get: function get() {
      return (0, _validation_utils.isValidJson)(this._queryString);
    }
  }]);

  return AdvancedJobCreator;
}(_job_creator.JobCreator);

exports.AdvancedJobCreator = AdvancedJobCreator;