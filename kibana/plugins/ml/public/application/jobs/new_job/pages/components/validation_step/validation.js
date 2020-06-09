"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _wizard_nav = require("../wizard_nav");

var _step_types = require("../step_types");

var _job_creator_context = require("../job_creator_context");

var _job_service = require("../../../../../services/job_service");

var _validate_job = require("../../../../../components/validate_job");

var _new_job = require("../../../../../../../common/constants/new_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var idFilterList = ['job_id_valid', 'job_group_id_valid', 'detectors_function_not_empty', 'success_bucket_span'];

var ValidationStep = function ValidationStep(_ref) {
  var setCurrentStep = _ref.setCurrentStep,
      isCurrentStep = _ref.isCurrentStep;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobValidator = _useContext.jobValidator;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      nextActive = _useState2[0],
      setNextActive = _useState2[1];

  if (jobCreator.type === _new_job.JOB_TYPE.ADVANCED) {
    // for advanced jobs, ignore time range warning as the
    // user hasn't selected a time range.
    idFilterList.push.apply(idFilterList, ['time_range_short', 'success_time_range']);
  }

  function getJobConfig() {
    return _objectSpread({}, jobCreator.jobConfig, {
      datafeed_config: jobCreator.datafeedConfig
    });
  }

  function getDuration() {
    return {
      start: jobCreator.start,
      end: jobCreator.end
    };
  }

  (0, _react.useEffect)(function () {
    // force basic validation to run
    jobValidator.validate(function () {}, true);
    jobCreatorUpdate();
  }, []); // keep a record of the advanced validation in the jobValidator
  // and disable the next button if any advanced checks have failed.
  // note, it is not currently possible to get to a state where any of the
  // advanced validation checks return an error because they are all
  // caught in previous basic checks

  function setIsValid(valid) {
    jobValidator.advancedValid = valid;
    setNextActive(valid);
  }

  return _react.default.createElement(_react.Fragment, null, isCurrentStep && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_validate_job.ValidateJob, {
    getJobConfig: getJobConfig,
    getDuration: getDuration,
    mlJobService: _job_service.mlJobService,
    embedded: true,
    setIsValid: setIsValid,
    idFilterList: idFilterList
  }), _react.default.createElement(_wizard_nav.WizardNav, {
    previous: function previous() {
      return setCurrentStep(_step_types.WIZARD_STEPS.JOB_DETAILS);
    },
    next: function next() {
      return setCurrentStep(_step_types.WIZARD_STEPS.SUMMARY);
    },
    nextActive: nextActive
  })), isCurrentStep === false && _react.default.createElement(_react.Fragment, null));
};

exports.ValidationStep = ValidationStep;