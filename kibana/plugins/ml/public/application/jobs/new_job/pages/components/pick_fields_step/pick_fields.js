"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickFieldsStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _job_creator_context = require("../job_creator_context");

var _wizard_nav = require("../wizard_nav");

var _step_types = require("../step_types");

var _new_job = require("../../../../../../../common/constants/new_job");

var _single_metric_view = require("./components/single_metric_view");

var _multi_metric_view = require("./components/multi_metric_view");

var _population_view = require("./components/population_view");

var _advanced_view = require("./components/advanced_view");

var _categorization_view = require("./components/categorization_view");

var _json_editor_flyout = require("../common/json_editor_flyout");

var _datafeed_preview_flyout = require("../common/datafeed_preview_flyout");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PickFieldsStep = function PickFieldsStep(_ref) {
  var setCurrentStep = _ref.setCurrentStep,
      isCurrentStep = _ref.isCurrentStep;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      nextActive = _useState2[0],
      setNextActive = _useState2[1];

  var jobType = jobCreator.type;
  (0, _react.useEffect)(function () {
    var active = jobCreator.detectors.length > 0 && (jobCreator.type !== _new_job.JOB_TYPE.ADVANCED || jobCreator.type === _new_job.JOB_TYPE.ADVANCED && jobValidator.modelMemoryLimit.valid) && jobValidator.bucketSpan.valid && jobValidator.duplicateDetectors.valid && jobValidator.validating === false && (jobCreator.type !== _new_job.JOB_TYPE.CATEGORIZATION || jobCreator.type === _new_job.JOB_TYPE.CATEGORIZATION && jobValidator.categorizationField);
    setNextActive(active);
  }, [jobValidatorUpdated]);
  return _react.default.createElement(_react.Fragment, null, isCurrentStep && _react.default.createElement(_react.Fragment, null, jobType === _new_job.JOB_TYPE.SINGLE_METRIC && _react.default.createElement(_single_metric_view.SingleMetricView, {
    isActive: isCurrentStep,
    setCanProceed: setNextActive
  }), jobType === _new_job.JOB_TYPE.MULTI_METRIC && _react.default.createElement(_multi_metric_view.MultiMetricView, {
    isActive: isCurrentStep,
    setCanProceed: setNextActive
  }), jobType === _new_job.JOB_TYPE.POPULATION && _react.default.createElement(_population_view.PopulationView, {
    isActive: isCurrentStep,
    setCanProceed: setNextActive
  }), jobType === _new_job.JOB_TYPE.ADVANCED && _react.default.createElement(_advanced_view.AdvancedView, {
    isActive: isCurrentStep,
    setCanProceed: setNextActive
  }), jobType === _new_job.JOB_TYPE.CATEGORIZATION && _react.default.createElement(_categorization_view.CategorizationView, {
    isActive: isCurrentStep,
    setCanProceed: setNextActive
  }), _react.default.createElement(_wizard_nav.WizardNav, {
    previous: function previous() {
      return setCurrentStep(jobCreator.type === _new_job.JOB_TYPE.ADVANCED ? _step_types.WIZARD_STEPS.ADVANCED_CONFIGURE_DATAFEED : _step_types.WIZARD_STEPS.TIME_RANGE);
    },
    next: function next() {
      return setCurrentStep(_step_types.WIZARD_STEPS.JOB_DETAILS);
    },
    nextActive: nextActive
  }, jobType === _new_job.JOB_TYPE.ADVANCED && _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_json_editor_flyout.JsonEditorFlyout, {
    isDisabled: false,
    jobEditorMode: _json_editor_flyout.EDITOR_MODE.EDITABLE,
    datafeedEditorMode: _json_editor_flyout.EDITOR_MODE.HIDDEN
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_datafeed_preview_flyout.DatafeedPreviewFlyout, {
    isDisabled: false
  }))))));
};

exports.PickFieldsStep = PickFieldsStep;