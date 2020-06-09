"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalysisSetupTimerangeForm = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _moment = _interopRequireDefault(require("moment"));

var _react2 = _interopRequireWildcard(require("react"));

var _fixed_datepicker = require("../../../fixed_datepicker");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var startTimeLabel = _i18n.i18n.translate('xpack.infra.analysisSetup.startTimeLabel', {
  defaultMessage: 'Start time'
});

var endTimeLabel = _i18n.i18n.translate('xpack.infra.analysisSetup.endTimeLabel', {
  defaultMessage: 'End time'
});

var startTimeDefaultDescription = _i18n.i18n.translate('xpack.infra.analysisSetup.startTimeDefaultDescription', {
  defaultMessage: 'Start of log indices'
});

var endTimeDefaultDescription = _i18n.i18n.translate('xpack.infra.analysisSetup.endTimeDefaultDescription', {
  defaultMessage: 'Indefinitely'
});

function selectedDateToParam(selectedDate) {
  if (selectedDate) {
    return selectedDate.valueOf(); // To ms unix timestamp
  }

  return undefined;
}

var AnalysisSetupTimerangeForm = function AnalysisSetupTimerangeForm(_ref) {
  var _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      setStartTime = _ref.setStartTime,
      setEndTime = _ref.setEndTime,
      startTime = _ref.startTime,
      endTime = _ref.endTime;
  var now = (0, _react2.useMemo)(function () {
    return (0, _moment.default)();
  }, []);
  var selectedEndTimeIsToday = !endTime || (0, _moment.default)(endTime).isSame(now, 'day');
  var startTimeValue = (0, _react2.useMemo)(function () {
    return startTime ? (0, _moment.default)(startTime) : undefined;
  }, [startTime]);
  var endTimeValue = (0, _react2.useMemo)(function () {
    return endTime ? (0, _moment.default)(endTime) : undefined;
  }, [endTime]);
  return _react2.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react2.default.createElement("h3", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.analysisSetup.timeRangeTitle",
      defaultMessage: "Choose a time range"
    })),
    description: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.analysisSetup.timeRangeDescription",
      defaultMessage: "By default, Machine Learning analyzes log messages in your log indices no older than four weeks, and continues indefinitely. You can specify a different date to begin, to end, or both."
    })
  }, _react2.default.createElement(_eui.EuiFormRow, {
    error: false,
    fullWidth: true,
    isInvalid: false,
    label: startTimeLabel
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react2.default.createElement(_eui.EuiFormControlLayout, {
    clear: startTime && !disabled ? {
      onClick: function onClick() {
        return setStartTime(undefined);
      }
    } : undefined,
    isDisabled: disabled
  }, _react2.default.createElement(_fixed_datepicker.FixedDatePicker, {
    disabled: disabled,
    showTimeSelect: true,
    selected: startTimeValue,
    onChange: function onChange(date) {
      return setStartTime(selectedDateToParam(date));
    },
    placeholder: startTimeDefaultDescription,
    maxDate: now
  })))), _react2.default.createElement(_eui.EuiFormRow, {
    error: false,
    fullWidth: true,
    isInvalid: false,
    label: endTimeLabel
  }, _react2.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react2.default.createElement(_eui.EuiFormControlLayout, {
    clear: endTime && !disabled ? {
      onClick: function onClick() {
        return setEndTime(undefined);
      }
    } : undefined,
    isDisabled: disabled
  }, _react2.default.createElement(_fixed_datepicker.FixedDatePicker, {
    disabled: disabled,
    showTimeSelect: true,
    selected: endTimeValue,
    onChange: function onChange(date) {
      return setEndTime(selectedDateToParam(date));
    },
    placeholder: endTimeDefaultDescription,
    openToDate: now,
    minDate: startTimeValue,
    minTime: selectedEndTimeIsToday ? now : (0, _moment.default)().hour(0).minutes(0),
    maxTime: (0, _moment.default)().hour(23).minutes(59)
  })))));
};

exports.AnalysisSetupTimerangeForm = AnalysisSetupTimerangeForm;