"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAnalyticsFlyout = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateAnalyticsFlyout = function CreateAnalyticsFlyout(_ref) {
  var actions = _ref.actions,
      children = _ref.children,
      state = _ref.state;
  var closeModal = actions.closeModal,
      createAnalyticsJob = actions.createAnalyticsJob,
      startAnalyticsJob = actions.startAnalyticsJob;
  var isJobCreated = state.isJobCreated,
      isJobStarted = state.isJobStarted,
      isModalButtonDisabled = state.isModalButtonDisabled,
      isValid = state.isValid,
      isAdvancedEditorValidJson = state.isAdvancedEditorValidJson,
      cloneJob = state.cloneJob;
  var headerText = !!cloneJob ? _i18n.i18n.translate('xpack.ml.dataframe.analytics.clone.flyoutHeaderTitle', {
    defaultMessage: 'Clone job from {job_id}',
    values: {
      job_id: cloneJob.id
    }
  }) : _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.flyoutHeaderTitle', {
    defaultMessage: 'Create analytics job'
  });
  return _react.default.createElement(_eui.EuiFlyout, {
    size: "m",
    onClose: closeModal,
    "data-test-subj": "mlAnalyticsCreateJobFlyout"
  }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", {
    "data-test-subj": "mlDataFrameAnalyticsFlyoutHeaderTitle"
  }, headerText))), _react.default.createElement(_eui.EuiFlyoutBody, null, children), _react.default.createElement(_eui.EuiFlyoutFooter, null, (!isJobCreated || !isJobStarted) && _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: closeModal
  }, isJobCreated === true ? _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.flyoutCloseButton', {
    defaultMessage: 'Close'
  }) : _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.flyoutCancelButton', {
    defaultMessage: 'Cancel'
  })), !isJobCreated && !isJobStarted && _react.default.createElement(_eui.EuiButton, {
    className: "mlAnalyticsCreateFlyout__footerButton",
    disabled: !isValid || !isAdvancedEditorValidJson || isModalButtonDisabled,
    onClick: createAnalyticsJob,
    fill: true,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutCreateButton"
  }, _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.flyoutCreateButton', {
    defaultMessage: 'Create'
  })), isJobCreated && !isJobStarted && _react.default.createElement(_eui.EuiButton, {
    className: "mlAnalyticsCreateFlyout__footerButton",
    disabled: isModalButtonDisabled,
    onClick: startAnalyticsJob,
    fill: true,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutStartButton"
  }, _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.flyoutStartButton', {
    defaultMessage: 'Start'
  })), isJobCreated && isJobStarted && _react.default.createElement(_eui.EuiButton, {
    onClick: closeModal,
    fill: true,
    "data-test-subj": "mlAnalyticsCreateJobFlyoutCloseButton"
  }, _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.flyoutCloseButton', {
    defaultMessage: 'Close'
  }))));
};

exports.CreateAnalyticsFlyout = CreateAnalyticsFlyout;