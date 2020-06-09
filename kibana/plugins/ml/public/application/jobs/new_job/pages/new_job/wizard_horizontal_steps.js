"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WizardHorizontalSteps = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _step_types = require("../components/step_types");

var _new_job = require("../../../../../../common/constants/new_job");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WizardHorizontalSteps = function WizardHorizontalSteps(_ref) {
  var currentStep = _ref.currentStep,
      highestStep = _ref.highestStep,
      setCurrentStep = _ref.setCurrentStep,
      disableSteps = _ref.disableSteps,
      jobType = _ref.jobType;

  function jumpToStep(step) {
    if (step <= highestStep) {
      setCurrentStep(step);
    }
  }

  var stepsConfig = [_objectSpread({
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.step.timeRangeTitle', {
      defaultMessage: 'Time range'
    })
  }, createStepProps(_step_types.WIZARD_STEPS.TIME_RANGE)), _objectSpread({
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.step.pickFieldsTitle', {
      defaultMessage: 'Pick fields'
    })
  }, createStepProps(_step_types.WIZARD_STEPS.PICK_FIELDS)), _objectSpread({
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.step.jobDetailsTitle', {
      defaultMessage: 'Job details'
    })
  }, createStepProps(_step_types.WIZARD_STEPS.JOB_DETAILS)), _objectSpread({
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.step.validationTitle', {
      defaultMessage: 'Validation'
    })
  }, createStepProps(_step_types.WIZARD_STEPS.VALIDATION)), _objectSpread({
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.step.summaryTitle', {
      defaultMessage: 'Summary'
    })
  }, createStepProps(_step_types.WIZARD_STEPS.SUMMARY))];

  if (jobType === _new_job.JOB_TYPE.ADVANCED) {
    stepsConfig.splice(0, 1, _objectSpread({
      title: _i18n.i18n.translate('xpack.ml.newJob.wizard.step.configureDatafeedTitle', {
        defaultMessage: 'Configure datafeed'
      })
    }, createStepProps(_step_types.WIZARD_STEPS.ADVANCED_CONFIGURE_DATAFEED)));
  }

  function createStepProps(step) {
    return {
      onClick: function onClick() {
        return jumpToStep(step);
      },
      isSelected: currentStep === step,
      isComplete: currentStep > step,
      disabled: disableSteps || highestStep < step
    };
  }

  return _react.default.createElement(_eui.EuiStepsHorizontal, {
    steps: stepsConfig,
    style: {
      backgroundColor: 'inherit'
    }
  });
};

exports.WizardHorizontalSteps = WizardHorizontalSteps;