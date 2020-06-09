"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobSettingsForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _page = require("../page");

var _full_time_range_selector = require("../../../../components/full_time_range_selector");

var _ml = require("../../../../contexts/ml");

var _validators = require("../../../../../../common/util/validators");

var _validation = require("../../../../../../common/constants/validation");

var _custom_hooks = require("../../../../components/custom_hooks");

var _components = require("../../common/components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var JobSettingsForm = function JobSettingsForm(_ref) {
  var onSubmit = _ref.onSubmit,
      onChange = _ref.onChange,
      saveState = _ref.saveState,
      jobs = _ref.jobs;

  var _getTimeFilterRange = (0, _full_time_range_selector.getTimeFilterRange)(),
      from = _getTimeFilterRange.from,
      to = _getTimeFilterRange.to;

  var _useMlContext = (0, _ml.useMlContext)(),
      indexPattern = _useMlContext.currentIndexPattern;

  var jobPrefixValidator = (0, _validators.composeValidators)((0, _validators.patternValidator)(/^([a-z0-9]+[a-z0-9\-_]*)?$/), (0, _validators.maxLengthValidator)(_validation.JOB_ID_MAX_LENGTH - Math.max.apply(Math, _toConsumableArray(jobs.map(function (_ref2) {
    var id = _ref2.id;
    return id.length;
  })))));

  var _usePartialState = (0, _custom_hooks.usePartialState)({
    jobPrefix: '',
    startDatafeedAfterSave: true,
    useFullIndexData: true,
    timeRange: {
      start: from,
      end: to
    },
    useDedicatedIndex: false
  }),
      _usePartialState2 = _slicedToArray(_usePartialState, 2),
      formState = _usePartialState2[0],
      setFormState = _usePartialState2[1];

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      validationResult = _useState2[0],
      setValidationResult = _useState2[1];

  var onJobPrefixChange = function onJobPrefixChange(value) {
    setFormState({
      jobPrefix: value && value.toLowerCase()
    });
  };

  var handleValidation = function handleValidation() {
    var jobPrefixValidationResult = jobPrefixValidator(formState.jobPrefix);
    setValidationResult({
      jobPrefix: jobPrefixValidationResult,
      formValid: !jobPrefixValidationResult
    });
  };

  (0, _react.useEffect)(function () {
    handleValidation();
  }, [formState.jobPrefix]);
  (0, _react.useEffect)(function () {
    onChange(formState);
  }, [formState]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiForm, null, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.jobIdPrefixLabel",
      defaultMessage: "Job ID prefix"
    })),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.tooltips.newJobRecognizerJobPrefixTooltip",
      defaultMessage: "A prefix which will be added to the beginning of each job ID."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.jobIdPrefixLabel",
      defaultMessage: "Job ID prefix"
    }),
    isInvalid: !!validationResult.jobPrefix,
    error: _react.default.createElement(_react.default.Fragment, null, validationResult.jobPrefix && validationResult.jobPrefix.maxLength ? _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.jobPrefixInvalidMaxLengthErrorMessage",
      defaultMessage: "Job ID prefix must be no more than {maxLength, plural, one {# character} other {# characters}} long.",
      values: {
        maxLength: validationResult.jobPrefix.maxLength.requiredLength
      }
    })) : null, validationResult.jobPrefix && validationResult.jobPrefix.pattern && _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.jobLabelAllowedCharactersDescription",
      defaultMessage: "Job label can contain lowercase alphanumeric (a-z and 0-9), hyphens or underscores; must start and end with an alphanumeric character"
    })))
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "jobPrefix",
    value: formState.jobPrefix,
    onChange: function onChange(_ref3) {
      var value = _ref3.target.value;
      return onJobPrefixChange(value);
    },
    isInvalid: !!validationResult.jobPrefix
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
    id: "startDataFeed",
    name: "startDataFeed",
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.startDatafeedAfterSaveLabel",
      defaultMessage: "Start datafeed after save"
    }),
    checked: formState.startDatafeedAfterSave,
    onChange: function onChange(_ref4) {
      var checked = _ref4.target.checked;
      setFormState({
        startDatafeedAfterSave: checked
      });
    }
  })), _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
    id: "useFullData",
    name: "useFullData",
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.useFullDataLabel",
      defaultMessage: "Use full {indexPatternTitle} data",
      values: {
        indexPatternTitle: indexPattern.title
      }
    }),
    checked: formState.useFullIndexData,
    onChange: function onChange(_ref5) {
      var checked = _ref5.target.checked;
      setFormState({
        useFullIndexData: checked
      });
    }
  })), !formState.useFullIndexData && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_components.TimeRangePicker, {
    setTimeRange: function setTimeRange(value) {
      setFormState({
        timeRange: value
      });
    },
    timeRange: formState.timeRange
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiAccordion, {
    id: "advancedOptions",
    "aria-label": _i18n.i18n.translate('xpack.ml.newJob.recognize.advancedSettingsAriaLabel', {
      defaultMessage: 'Advanced settings'
    }),
    buttonContent: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.advancedLabel",
      defaultMessage: "Advanced"
    }),
    paddingSize: "l"
  }, _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.recognize.useDedicatedIndexLabel",
      defaultMessage: "Use dedicated index"
    })),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.tooltips.newJobDedicatedIndexTooltip",
      defaultMessage: "Select to store results in a separate index for this job."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    describedByIds: ['ml_aria_label_new_job_dedicated_index']
  }, _react.default.createElement(_eui.EuiSwitch, {
    id: "useDedicatedIndex",
    name: "useDedicatedIndex",
    checked: formState.useDedicatedIndex,
    onChange: function onChange(_ref6) {
      var checked = _ref6.target.checked;
      setFormState({
        useDedicatedIndex: checked
      });
    },
    label: _i18n.i18n.translate('xpack.ml.newJob.recognize.useDedicatedIndexLabel', {
      defaultMessage: 'Use dedicated index'
    })
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  })), _react.default.createElement(_eui.EuiTextAlign, {
    textAlign: "right"
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    type: "submit",
    isLoading: saveState === _page.SAVE_STATE.SAVING,
    disabled: !validationResult.formValid,
    onClick: function onClick() {
      onSubmit(formState);
    },
    "aria-label": _i18n.i18n.translate('xpack.ml.newJob.recognize.createJobButtonAriaLabel', {
      defaultMessage: 'Create Job'
    })
  }, saveState === _page.SAVE_STATE.NOT_SAVED && _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.createJobButtonLabel",
    defaultMessage: "Create {numberOfJobs, plural, zero {Job} one {Job} other {Jobs}}",
    values: {
      numberOfJobs: jobs.length
    }
  }), saveState === _page.SAVE_STATE.SAVING && _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.recognize.analysisRunningLabel",
    defaultMessage: "Analysis running"
  }))));
};

exports.JobSettingsForm = JobSettingsForm;