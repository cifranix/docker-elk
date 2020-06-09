"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSection = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _model_plot = require("./components/model_plot");

var _dedicated_index = require("./components/dedicated_index");

var _model_memory_limit = require("../../../common/model_memory_limit");

var _job_creator_context = require("../../../job_creator_context");

var _new_job = require("../../../../../../../../../common/constants/new_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var buttonContent = _i18n.i18n.translate('xpack.ml.newJob.wizard.jobDetailsStep.advancedSectionButton', {
  defaultMessage: 'Advanced'
});

var AdvancedSection = function AdvancedSection(_ref) {
  var advancedExpanded = _ref.advancedExpanded,
      setAdvancedExpanded = _ref.setAdvancedExpanded;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  if (jobCreator.type === _new_job.JOB_TYPE.ADVANCED) {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
      margin: "xl"
    }), _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "xl"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_model_plot.ModelPlotSwitch, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_dedicated_index.DedicatedIndexSwitch, null))));
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_eui.EuiAccordion, {
    id: "advanced-section",
    buttonContent: buttonContent,
    onToggle: setAdvancedExpanded,
    initialIsOpen: advancedExpanded,
    "data-test-subj": "mlJobWizardToggleAdvancedSection"
  }, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl",
    style: {
      marginLeft: '0px',
      marginRight: '0px'
    },
    "data-test-subj": "mlJobWizardAdvancedSection"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_model_plot.ModelPlotSwitch, null), _react.default.createElement(_model_memory_limit.ModelMemoryLimitInput, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_dedicated_index.DedicatedIndexSwitch, null)))));
};

exports.AdvancedSection = AdvancedSection;