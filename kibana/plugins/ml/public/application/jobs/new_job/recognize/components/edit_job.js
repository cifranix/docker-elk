"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditJob = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _custom_hooks = require("../../../../components/custom_hooks");

var _validators = require("../../../../../../common/util/validators");

var _job_utils = require("../../../../../../common/util/job_utils");

var _validation = require("../../../../../../common/constants/validation");

var _components = require("../../common/components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Edit job flyout for overriding job configuration.
 */
var EditJob = function EditJob(_ref) {
  var job = _ref.job,
      jobOverride = _ref.jobOverride,
      existingGroupIds = _ref.existingGroupIds,
      _onClose = _ref.onClose;

  var _usePartialState = (0, _custom_hooks.usePartialState)({
    jobGroups: jobOverride && jobOverride.groups || job.config.groups
  }),
      _usePartialState2 = _slicedToArray(_usePartialState, 2),
      formState = _usePartialState2[0],
      setFormState = _usePartialState2[1];

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      validationResult = _useState2[0],
      setValidationResult = _useState2[1];

  var groupValidator = (0, _validators.composeValidators)(function (value) {
    return (0, _job_utils.isJobIdValid)(value) ? null : {
      pattern: true
    };
  }, (0, _validators.maxLengthValidator)(_validation.JOB_ID_MAX_LENGTH));

  var handleValidation = function handleValidation() {
    var jobGroupsValidationResult = formState.jobGroups.map(function (group) {
      return groupValidator(group);
    }).filter(function (result) {
      return result !== null;
    });
    setValidationResult({
      jobGroups: jobGroupsValidationResult,
      formValid: jobGroupsValidationResult.length === 0
    });
  };

  (0, _react.useEffect)(function () {
    handleValidation();
  }, [formState.jobGroups]);

  var onSave = function onSave() {
    var result = {
      job_id: job.id,
      groups: formState.jobGroups
    };

    _onClose(result);
  };

  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: function onClose() {
      return _onClose(null);
    }
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.overrideConfigurationHeader",
    defaultMessage: "Override configuration for {jobID}",
    values: {
      jobID: job.id
    }
  })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true
  }, _react.default.createElement(_components.JobGroupsInput, {
    existingGroups: existingGroupIds,
    selectedGroups: formState.jobGroups,
    onChange: function onChange(value) {
      setFormState({
        jobGroups: value
      });
    },
    validation: {
      valid: !validationResult.jobGroups || validationResult.jobGroups.length === 0,
      message: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.ml.newJob.recognize.jobGroupAllowedCharactersDescription",
        defaultMessage: "Job group names can contain lowercase alphanumeric (a-z and 0-9), hyphens or underscores; must start and end with an alphanumeric character"
      })
    }
  }))), _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: function onClick() {
      return _onClose(null);
    },
    flush: "left"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.cancelJobOverrideLabel",
    defaultMessage: "Close"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: function onClick() {
      return onSave();
    },
    fill: true,
    disabled: !validationResult.formValid
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.saveJobOverrideLabel",
    defaultMessage: "Save"
  }))))));
};

exports.EditJob = EditJob;