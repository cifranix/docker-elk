"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobDetailsStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _wizard_nav = require("../wizard_nav");

var _job_id = require("./components/job_id");

var _job_description = require("./components/job_description");

var _groups = require("./components/groups");

var _step_types = require("../step_types");

var _job_creator_context = require("../job_creator_context");

var _advanced_section = require("./components/advanced_section");

var _additional_section = require("./components/additional_section");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var JobDetailsStep = function JobDetailsStep(_ref) {
  var setCurrentStep = _ref.setCurrentStep,
      isCurrentStep = _ref.isCurrentStep,
      advancedExpanded = _ref.advancedExpanded,
      setAdvancedExpanded = _ref.setAdvancedExpanded,
      additionalExpanded = _ref.additionalExpanded,
      setAdditionalExpanded = _ref.setAdditionalExpanded;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      nextActive = _useState2[0],
      setNextActive = _useState2[1];

  (0, _react.useEffect)(function () {
    var active = jobValidator.jobId.valid && jobValidator.modelMemoryLimit.valid && jobValidator.groupIds.valid && jobValidator.validating === false;
    setNextActive(active);
  }, [jobValidatorUpdated]);
  return _react.default.createElement(_react.Fragment, null, isCurrentStep && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_job_id.JobIdInput, null), _react.default.createElement(_groups.GroupsInput, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_job_description.JobDescriptionInput, null))), _react.default.createElement(_additional_section.AdditionalSection, {
    additionalExpanded: additionalExpanded,
    setAdditionalExpanded: setAdditionalExpanded
  }), _react.default.createElement(_advanced_section.AdvancedSection, {
    advancedExpanded: advancedExpanded,
    setAdvancedExpanded: setAdvancedExpanded
  }), _react.default.createElement(_wizard_nav.WizardNav, {
    previous: function previous() {
      return setCurrentStep(_step_types.WIZARD_STEPS.PICK_FIELDS);
    },
    next: function next() {
      return setCurrentStep(_step_types.WIZARD_STEPS.VALIDATION);
    },
    nextActive: nextActive
  })));
};

exports.JobDetailsStep = JobDetailsStep;