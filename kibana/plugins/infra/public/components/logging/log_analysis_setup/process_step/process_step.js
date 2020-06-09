"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessStep = exports.createProcessStep = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _create_ml_jobs_button = require("./create_ml_jobs_button");

var _recreate_ml_jobs_button = require("./recreate_ml_jobs_button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createProcessStep = function createProcessStep(props) {
  return {
    title: processStepTitle,
    children: _react2.default.createElement(ProcessStep, props),
    status: props.setupStatus === 'pending' ? 'incomplete' : props.setupStatus === 'failed' ? 'danger' : props.setupStatus === 'succeeded' ? 'complete' : undefined
  };
};

exports.createProcessStep = createProcessStep;

var ProcessStep = function ProcessStep(_ref) {
  var cleanUpAndSetUp = _ref.cleanUpAndSetUp,
      errorMessages = _ref.errorMessages,
      isConfigurationValid = _ref.isConfigurationValid,
      setUp = _ref.setUp,
      setupStatus = _ref.setupStatus,
      viewResults = _ref.viewResults;
  return _react2.default.createElement(_eui.EuiText, {
    size: "s"
  }, setupStatus === 'pending' ? _react2.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  })), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.analysisSetup.steps.setupProcess.loadingText",
    defaultMessage: "Creating ML job..."
  }))) : setupStatus === 'failed' ? _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.analysisSetup.steps.setupProcess.failureText",
    defaultMessage: "Something went wrong creating the necessary ML jobs. Please ensure all selected log indices exist."
  }), _react2.default.createElement(_eui.EuiSpacer, null), errorMessages.map(function (errorMessage, i) {
    return _react2.default.createElement(_eui.EuiCallOut, {
      key: i,
      color: "danger",
      iconType: "alert",
      title: errorCalloutTitle
    }, _react2.default.createElement(_eui.EuiCode, {
      transparentBackground: true
    }, errorMessage));
  }), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiButton, {
    fill: true,
    onClick: cleanUpAndSetUp
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.analysisSetup.steps.setupProcess.tryAgainButton",
    defaultMessage: "Try again"
  }))) : setupStatus === 'succeeded' ? _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.analysisSetup.steps.setupProcess.successText",
    defaultMessage: "The ML jobs have been set up successfully"
  }), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiButton, {
    fill: true,
    onClick: viewResults
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.analysisSetup.steps.setupProcess.viewResultsButton",
    defaultMessage: "View results"
  }))) : setupStatus === 'requiredForUpdate' || setupStatus === 'requiredForReconfiguration' ? _react2.default.createElement(_recreate_ml_jobs_button.RecreateMLJobsButton, {
    isDisabled: !isConfigurationValid,
    onClick: cleanUpAndSetUp
  }) : _react2.default.createElement(_create_ml_jobs_button.CreateMLJobsButton, {
    isDisabled: !isConfigurationValid,
    onClick: setUp
  }));
};

exports.ProcessStep = ProcessStep;

var errorCalloutTitle = _i18n.i18n.translate('xpack.infra.analysisSetup.steps.setupProcess.errorCalloutTitle', {
  defaultMessage: 'An error occurred'
});

var processStepTitle = _i18n.i18n.translate('xpack.infra.analysisSetup.actionStepTitle', {
  defaultMessage: 'Create ML job'
});