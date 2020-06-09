"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wizard = void 0;

var _react = _interopRequireWildcard(require("react"));

var _step_types = require("../components/step_types");

var _job_creator_context = require("../components/job_creator_context");

var _new_job_capabilities_service = require("../../../../services/new_job_capabilities_service");

var _wizard_steps = require("./wizard_steps");

var _wizard_horizontal_steps = require("./wizard_horizontal_steps");

var _new_job = require("../../../../../../common/constants/new_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Wizard = function Wizard(_ref) {
  var jobCreator = _ref.jobCreator,
      chartLoader = _ref.chartLoader,
      resultsLoader = _ref.resultsLoader,
      chartInterval = _ref.chartInterval,
      jobValidator = _ref.jobValidator,
      existingJobsAndGroups = _ref.existingJobsAndGroups,
      _ref$firstWizardStep = _ref.firstWizardStep,
      firstWizardStep = _ref$firstWizardStep === void 0 ? _step_types.WIZARD_STEPS.TIME_RANGE : _ref$firstWizardStep;

  var _useReducer = (0, _react.useReducer)(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      jobCreatorUpdated = _useReducer2[0],
      setJobCreatorUpdate = _useReducer2[1];

  var jobCreatorUpdate = function jobCreatorUpdate() {
    return setJobCreatorUpdate(jobCreatorUpdated);
  };

  var _useReducer3 = (0, _react.useReducer)(function (s) {
    return s + 1;
  }, 0),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      jobValidatorUpdated = _useReducer4[0],
      setJobValidatorUpdate = _useReducer4[1];

  var jobCreatorContext = {
    jobCreatorUpdated: jobCreatorUpdated,
    jobCreatorUpdate: jobCreatorUpdate,
    jobCreator: jobCreator,
    chartLoader: chartLoader,
    resultsLoader: resultsLoader,
    chartInterval: chartInterval,
    jobValidator: jobValidator,
    jobValidatorUpdated: jobValidatorUpdated,
    fields: _new_job_capabilities_service.newJobCapsService.fields,
    aggs: _new_job_capabilities_service.newJobCapsService.aggs,
    existingJobsAndGroups: existingJobsAndGroups
  };
  var firstStep = jobCreator.type === _new_job.JOB_TYPE.ADVANCED ? _step_types.WIZARD_STEPS.ADVANCED_CONFIGURE_DATAFEED : _step_types.WIZARD_STEPS.TIME_RANGE;

  var _useState = (0, _react.useState)(firstStep),
      _useState2 = _slicedToArray(_useState, 2),
      currentStep = _useState2[0],
      setCurrentStep = _useState2[1];

  var _useState3 = (0, _react.useState)(firstStep),
      _useState4 = _slicedToArray(_useState3, 2),
      highestStep = _useState4[0],
      setHighestStep = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      disableSteps = _useState6[0],
      setDisableSteps = _useState6[1];

  var _useState7 = (0, _react.useState)(resultsLoader.progress),
      _useState8 = _slicedToArray(_useState7, 2),
      progress = _useState8[0],
      setProgress = _useState8[1];

  var _useState9 = (0, _react.useState)(stringifyConfigs(jobCreator.jobConfig, jobCreator.datafeedConfig)),
      _useState10 = _slicedToArray(_useState9, 2),
      stringifiedConfigs = _useState10[0],
      setStringifiedConfigs = _useState10[1];

  (0, _react.useEffect)(function () {
    var subscription = jobValidator.validationResult$.subscribe(function () {
      setJobValidatorUpdate(jobValidatorUpdated);
    });
    return function () {
      return subscription.unsubscribe();
    };
  }, []);
  (0, _react.useEffect)(function () {
    jobValidator.validate(function () {
      setJobValidatorUpdate(jobValidatorUpdated);
    }); // if the job config has changed, reset the highestStep
    // compare a stringified config to ensure the configs have actually changed

    var tempConfigs = stringifyConfigs(jobCreator.jobConfig, jobCreator.datafeedConfig);

    if (tempConfigs !== stringifiedConfigs) {
      setHighestStep(currentStep);
      setStringifiedConfigs(tempConfigs);
    }
  }, [jobCreatorUpdated]);
  (0, _react.useEffect)(function () {
    jobCreator.subscribeToProgress(setProgress);
    setCurrentStep(firstWizardStep);
  }, []); // disable the step links if the job is running

  (0, _react.useEffect)(function () {
    setDisableSteps(progress > 0);
  }, [progress]); // keep a record of the highest step reached in the wizard

  (0, _react.useEffect)(function () {
    if (currentStep >= highestStep) {
      setHighestStep(currentStep);
    }
  }, [currentStep]);
  return _react.default.createElement(_job_creator_context.JobCreatorContext.Provider, {
    value: jobCreatorContext
  }, _react.default.createElement(_wizard_horizontal_steps.WizardHorizontalSteps, {
    currentStep: currentStep,
    highestStep: highestStep,
    setCurrentStep: setCurrentStep,
    disableSteps: disableSteps,
    jobType: jobCreator.type
  }), _react.default.createElement(_wizard_steps.WizardSteps, {
    currentStep: currentStep,
    setCurrentStep: setCurrentStep
  }));
};

exports.Wizard = Wizard;

function stringifyConfigs(jobConfig, datafeedConfig) {
  return JSON.stringify(jobConfig) + JSON.stringify(datafeedConfig);
}