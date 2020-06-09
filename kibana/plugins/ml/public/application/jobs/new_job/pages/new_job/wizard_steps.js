"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WizardSteps = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _step_types = require("../components/step_types");

var _time_range_step = require("../components/time_range_step");

var _pick_fields_step = require("../components/pick_fields_step");

var _job_details_step = require("../components/job_details_step");

var _validation_step = require("../components/validation_step");

var _summary_step = require("../components/summary_step");

var _datafeed_step = require("../components/datafeed_step");

var _ml = require("../../../../contexts/ml");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WizardSteps = function WizardSteps(_ref) {
  var currentStep = _ref.currentStep,
      setCurrentStep = _ref.setCurrentStep;
  var mlContext = (0, _ml.useMlContext)(); // store whether the advanced and additional sections have been expanded.
  // has to be stored at this level to ensure it's remembered on wizard step change

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      advancedExpanded = _useState2[0],
      setAdvancedExpanded = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      additionalExpanded = _useState4[0],
      setAdditionalExpanded = _useState4[1];

  function getSummaryStepTitle() {
    if (mlContext.currentSavedSearch !== null) {
      return _i18n.i18n.translate('xpack.ml.newJob.wizard.stepComponentWrapper.summaryTitleSavedSearch', {
        defaultMessage: 'New job from saved search {title}',
        values: {
          title: mlContext.currentSavedSearch.attributes.title
        }
      });
    } else if (mlContext.currentIndexPattern.id !== undefined) {
      return _i18n.i18n.translate('xpack.ml.newJob.wizard.stepComponentWrapper.summaryTitleIndexPattern', {
        defaultMessage: 'New job from index pattern {title}',
        values: {
          title: mlContext.currentIndexPattern.title
        }
      });
    }

    return '';
  }

  return _react.default.createElement(_react.Fragment, null, currentStep === _step_types.WIZARD_STEPS.TIME_RANGE && _react.default.createElement(_react.Fragment, null, _react.default.createElement(Title, {
    "data-test-subj": "mlJobWizardStepTitleTimeRange"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.stepComponentWrapper.timeRangeTitle",
    defaultMessage: "Time range"
  })), _react.default.createElement(_time_range_step.TimeRangeStep, {
    isCurrentStep: currentStep === _step_types.WIZARD_STEPS.TIME_RANGE,
    setCurrentStep: setCurrentStep
  })), currentStep === _step_types.WIZARD_STEPS.ADVANCED_CONFIGURE_DATAFEED && _react.default.createElement(_react.Fragment, null, _react.default.createElement(Title, {
    "data-test-subj": "mlJobWizardStepTitleConfigureDatafeed"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.stepComponentWrapper.configureDatafeedTitle",
    defaultMessage: "Configure datafeed"
  })), _react.default.createElement(_datafeed_step.DatafeedStep, {
    isCurrentStep: currentStep === _step_types.WIZARD_STEPS.ADVANCED_CONFIGURE_DATAFEED,
    setCurrentStep: setCurrentStep
  })), currentStep === _step_types.WIZARD_STEPS.PICK_FIELDS && _react.default.createElement(_react.Fragment, null, _react.default.createElement(Title, {
    "data-test-subj": "mlJobWizardStepTitlePickFields"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.stepComponentWrapper.pickFieldsTitle",
    defaultMessage: "Pick fields"
  })), _react.default.createElement(_pick_fields_step.PickFieldsStep, {
    isCurrentStep: currentStep === _step_types.WIZARD_STEPS.PICK_FIELDS,
    setCurrentStep: setCurrentStep
  })), currentStep === _step_types.WIZARD_STEPS.JOB_DETAILS && _react.default.createElement(_react.Fragment, null, _react.default.createElement(Title, {
    "data-test-subj": "mlJobWizardStepTitleJobDetails"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.stepComponentWrapper.jobDetailsTitle",
    defaultMessage: "Job details"
  })), _react.default.createElement(_job_details_step.JobDetailsStep, {
    isCurrentStep: currentStep === _step_types.WIZARD_STEPS.JOB_DETAILS,
    setCurrentStep: setCurrentStep,
    advancedExpanded: advancedExpanded,
    setAdvancedExpanded: setAdvancedExpanded,
    additionalExpanded: additionalExpanded,
    setAdditionalExpanded: setAdditionalExpanded
  })), currentStep === _step_types.WIZARD_STEPS.VALIDATION && _react.default.createElement(_react.Fragment, null, _react.default.createElement(Title, {
    "data-test-subj": "mlJobWizardStepTitleValidation"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.stepComponentWrapper.validationTitle",
    defaultMessage: "Validation"
  })), _react.default.createElement(_validation_step.ValidationStep, {
    isCurrentStep: currentStep === _step_types.WIZARD_STEPS.VALIDATION,
    setCurrentStep: setCurrentStep
  })), currentStep === _step_types.WIZARD_STEPS.SUMMARY && _react.default.createElement(_react.Fragment, null, _react.default.createElement(Title, {
    "data-test-subj": "mlJobWizardStepTitleSummary"
  }, getSummaryStepTitle()), _react.default.createElement(_summary_step.SummaryStep, {
    isCurrentStep: currentStep === _step_types.WIZARD_STEPS.SUMMARY,
    setCurrentStep: setCurrentStep
  })));
};

exports.WizardSteps = WizardSteps;

var Title = function Title(_ref2) {
  var dataTestSubj = _ref2['data-test-subj'],
      children = _ref2.children;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", {
    "data-test-subj": dataTestSubj
  }, children)), _react.default.createElement(_eui.EuiSpacer, null));
};