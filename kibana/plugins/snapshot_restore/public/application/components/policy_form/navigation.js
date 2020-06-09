"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyNavigation = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _app_context = require("../../app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PolicyNavigation = function PolicyNavigation(_ref) {
  var currentStep = _ref.currentStep,
      maxCompletedStep = _ref.maxCompletedStep,
      updateCurrentStep = _ref.updateCurrentStep;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var steps = [{
    title: i18n.translate('xpack.snapshotRestore.policyForm.navigation.stepLogisticsName', {
      defaultMessage: 'Logistics'
    }),
    isComplete: maxCompletedStep >= 1,
    isSelected: currentStep === 1,
    onClick: function onClick() {
      return updateCurrentStep(1);
    }
  }, {
    title: i18n.translate('xpack.snapshotRestore.policyForm.navigation.stepSettingsName', {
      defaultMessage: 'Snapshot settings'
    }),
    isComplete: maxCompletedStep >= 2,
    isSelected: currentStep === 2,
    disabled: maxCompletedStep < 1,
    onClick: function onClick() {
      return updateCurrentStep(2);
    }
  }, {
    title: i18n.translate('xpack.snapshotRestore.policyForm.navigation.stepRetentionName', {
      defaultMessage: 'Snapshot retention'
    }),
    isComplete: maxCompletedStep >= 3,
    isSelected: currentStep === 3,
    disabled: maxCompletedStep < 2,
    onClick: function onClick() {
      return updateCurrentStep(3);
    }
  }, {
    title: i18n.translate('xpack.snapshotRestore.policyForm.navigation.stepReviewName', {
      defaultMessage: 'Review'
    }),
    isComplete: maxCompletedStep >= 3,
    isSelected: currentStep === 4,
    disabled: maxCompletedStep < 3,
    onClick: function onClick() {
      return updateCurrentStep(4);
    }
  }];
  return _react.default.createElement(_eui.EuiStepsHorizontal, {
    steps: steps
  });
};

exports.PolicyNavigation = PolicyNavigation;