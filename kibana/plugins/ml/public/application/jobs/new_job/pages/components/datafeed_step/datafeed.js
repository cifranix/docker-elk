"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatafeedStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _wizard_nav = require("../wizard_nav");

var _query = require("./components/query");

var _query_delay = require("./components/query_delay");

var _frequency = require("./components/frequency");

var _scroll_size = require("./components/scroll_size");

var _time_field = require("./components/time_field");

var _step_types = require("../step_types");

var _job_creator_context = require("../job_creator_context");

var _json_editor_flyout = require("../common/json_editor_flyout");

var _datafeed_preview_flyout = require("../common/datafeed_preview_flyout");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DatafeedStep = function DatafeedStep(_ref) {
  var setCurrentStep = _ref.setCurrentStep,
      isCurrentStep = _ref.isCurrentStep;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      nextActive = _useState2[0],
      setNextActive = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isValidQuery = _useState4[0],
      setIsValidQuery = _useState4[1];

  (0, _react.useEffect)(function () {
    var active = isValidQuery && jobValidator.queryDelay.valid && jobValidator.frequency.valid && jobValidator.scrollSize.valid && jobValidator.validating === false;
    setNextActive(active);
  }, [jobValidatorUpdated, isValidQuery]);
  return _react.default.createElement(_react.Fragment, null, isCurrentStep && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "mlAdvancedDatafeedQueryEditor"
  }, _react.default.createElement(_query.QueryInput, {
    setIsValidQuery: setIsValidQuery
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_query_delay.QueryDelayInput, null), _react.default.createElement(_frequency.FrequencyInput, null), _react.default.createElement(_scroll_size.ScrollSizeInput, null), _react.default.createElement(_time_field.TimeField, null))), _react.default.createElement(_wizard_nav.WizardNav, {
    next: function next() {
      return setCurrentStep(_step_types.WIZARD_STEPS.PICK_FIELDS);
    },
    nextActive: nextActive
  }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_json_editor_flyout.JsonEditorFlyout, {
    isDisabled: false,
    jobEditorMode: _json_editor_flyout.EDITOR_MODE.HIDDEN,
    datafeedEditorMode: _json_editor_flyout.EDITOR_MODE.EDITABLE
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_datafeed_preview_flyout.DatafeedPreviewFlyout, {
    isDisabled: false
  }))))));
};

exports.DatafeedStep = DatafeedStep;