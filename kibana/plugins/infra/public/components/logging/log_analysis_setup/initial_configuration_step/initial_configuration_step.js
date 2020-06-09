"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitialConfigurationStep = exports.createInitialConfigurationStep = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _analysis_setup_indices_form = require("./analysis_setup_indices_form");

var _analysis_setup_timerange_form = require("./analysis_setup_timerange_form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createInitialConfigurationStep = function createInitialConfigurationStep(props) {
  return {
    title: initialConfigurationStepTitle,
    children: _react2.default.createElement(InitialConfigurationStep, props)
  };
};

exports.createInitialConfigurationStep = createInitialConfigurationStep;

var InitialConfigurationStep = function InitialConfigurationStep(_ref) {
  var setStartTime = _ref.setStartTime,
      setEndTime = _ref.setEndTime,
      startTime = _ref.startTime,
      endTime = _ref.endTime,
      isValidating = _ref.isValidating,
      validatedIndices = _ref.validatedIndices,
      setupStatus = _ref.setupStatus,
      setValidatedIndices = _ref.setValidatedIndices,
      _ref$validationErrors = _ref.validationErrors,
      validationErrors = _ref$validationErrors === void 0 ? [] : _ref$validationErrors;
  var disabled = (0, _react2.useMemo)(function () {
    return !editableFormStatus.includes(setupStatus);
  }, [setupStatus]);
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_analysis_setup_timerange_form.AnalysisSetupTimerangeForm, {
    disabled: disabled,
    setStartTime: setStartTime,
    setEndTime: setEndTime,
    startTime: startTime,
    endTime: endTime
  }), _react2.default.createElement(_analysis_setup_indices_form.AnalysisSetupIndicesForm, {
    disabled: disabled,
    indices: validatedIndices,
    isValidating: isValidating,
    onChangeSelectedIndices: setValidatedIndices,
    valid: validationErrors.length === 0
  }), _react2.default.createElement(ValidationErrors, {
    errors: validationErrors
  })));
};

exports.InitialConfigurationStep = InitialConfigurationStep;
var editableFormStatus = ['required', 'requiredForReconfiguration', 'requiredForUpdate', 'failed'];

var errorCalloutTitle = _i18n.i18n.translate('xpack.infra.analysisSetup.steps.initialConfigurationStep.errorCalloutTitle', {
  defaultMessage: 'Your index configuration is not valid'
});

var initialConfigurationStepTitle = _i18n.i18n.translate('xpack.infra.analysisSetup.configurationStepTitle', {
  defaultMessage: 'Configuration'
});

var ValidationErrors = function ValidationErrors(_ref2) {
  var errors = _ref2.errors;

  if (errors.length === 0) {
    return null;
  }

  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    iconType: "alert",
    title: errorCalloutTitle
  }, _react2.default.createElement("ul", null, errors.map(function (error, i) {
    return _react2.default.createElement("li", {
      key: i
    }, formatValidationError(error));
  }))), _react2.default.createElement(_eui.EuiSpacer, null));
};

var formatValidationError = function formatValidationError(error) {
  switch (error.error) {
    case 'NETWORK_ERROR':
      return _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.infra.analysisSetup.indicesSelectionNetworkError",
        defaultMessage: "We couldn't load your index configuration"
      });

    case 'TOO_FEW_SELECTED_INDICES':
      return _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.infra.analysisSetup.indicesSelectionTooFewSelectedIndicesDescription",
        defaultMessage: "Select at least one index name."
      });

    default:
      return '';
  }
};