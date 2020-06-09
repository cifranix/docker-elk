"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateSteps = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var stepNamesMap = {
  1: _i18n.i18n.translate('xpack.idxMgmt.templateForm.steps.logisticsStepName', {
    defaultMessage: 'Logistics'
  }),
  2: _i18n.i18n.translate('xpack.idxMgmt.templateForm.steps.settingsStepName', {
    defaultMessage: 'Index settings'
  }),
  3: _i18n.i18n.translate('xpack.idxMgmt.templateForm.steps.mappingsStepName', {
    defaultMessage: 'Mappings'
  }),
  4: _i18n.i18n.translate('xpack.idxMgmt.templateForm.steps.aliasesStepName', {
    defaultMessage: 'Aliases'
  }),
  5: _i18n.i18n.translate('xpack.idxMgmt.templateForm.steps.summaryStepName', {
    defaultMessage: 'Review template'
  })
};

var TemplateSteps = function TemplateSteps(_ref) {
  var currentStep = _ref.currentStep,
      updateCurrentStep = _ref.updateCurrentStep,
      isCurrentStepValid = _ref.isCurrentStepValid;
  var steps = [1, 2, 3, 4, 5].map(function (step) {
    return {
      title: stepNamesMap[step],
      isComplete: currentStep > step,
      isSelected: currentStep === step,
      disabled: step !== currentStep && isCurrentStepValid === false,
      onClick: function onClick() {
        return updateCurrentStep(step, step - 1);
      }
    };
  });
  return _react.default.createElement(_eui.EuiStepsHorizontal, {
    steps: steps
  });
};

exports.TemplateSteps = TemplateSteps;