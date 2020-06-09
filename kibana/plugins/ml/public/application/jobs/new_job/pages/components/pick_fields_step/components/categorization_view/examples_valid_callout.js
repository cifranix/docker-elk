"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExamplesValidCallout = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _edit_categorization_analyzer_flyout = require("../../../common/edit_categorization_analyzer_flyout");

var _categorization_job = require("../../../../../../../../../common/constants/categorization_job");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var allChecksButtonContent = _i18n.i18n.translate('xpack.ml.newJob.wizard.jobDetailsStep.allChecksButton', {
  defaultMessage: 'View all checks performed'
});

var ExamplesValidCallout = function ExamplesValidCallout(_ref) {
  var overallValidStatus = _ref.overallValidStatus,
      validationChecks = _ref.validationChecks,
      categorizationAnalyzer = _ref.categorizationAnalyzer;

  var analyzerUsed = _react.default.createElement(AnalyzerUsed, {
    categorizationAnalyzer: categorizationAnalyzer
  });

  var color = 'success';

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.categorizationFieldCalloutTitle.valid', {
    defaultMessage: 'Selected category field is valid'
  });

  if (overallValidStatus === _categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.INVALID) {
    color = 'danger';
    title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.categorizationFieldCalloutTitle.invalid', {
      defaultMessage: 'Selected category field is invalid'
    });
  } else if (overallValidStatus === _categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.PARTIALLY_VALID) {
    color = 'warning';
    title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.categorizationFieldCalloutTitle.possiblyInvalid', {
      defaultMessage: 'Selected category field is possibly invalid'
    });
  }

  return _react.default.createElement(_eui.EuiCallOut, {
    color: color,
    title: title,
    "data-test-subj": "mlJobWizardCategorizationExamplesCallout ".concat(overallValidStatus)
  }, validationChecks.map(function (v, i) {
    return _react.default.createElement("div", {
      key: i
    }, v.message);
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), analyzerUsed, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiAccordion, {
    id: "all-checks",
    buttonContent: allChecksButtonContent
  }, _react.default.createElement(AllValidationChecks, {
    validationChecks: validationChecks
  })));
};

exports.ExamplesValidCallout = ExamplesValidCallout;

var AnalyzerUsed = function AnalyzerUsed(_ref2) {
  var categorizationAnalyzer = _ref2.categorizationAnalyzer;
  var analyzer = '';

  if ((categorizationAnalyzer === null || categorizationAnalyzer === void 0 ? void 0 : categorizationAnalyzer.tokenizer) !== undefined) {
    analyzer = categorizationAnalyzer.tokenizer;
  } else if ((categorizationAnalyzer === null || categorizationAnalyzer === void 0 ? void 0 : categorizationAnalyzer.analyzer) !== undefined) {
    analyzer = categorizationAnalyzer.analyzer;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.categorizationFieldAnalyzer",
    defaultMessage: "Analyzer used: {analyzer}",
    values: {
      analyzer: analyzer
    }
  })), _react.default.createElement("div", null, _react.default.createElement(_edit_categorization_analyzer_flyout.EditCategorizationAnalyzerFlyout, null)));
};

var AllValidationChecks = function AllValidationChecks(_ref3) {
  var validationChecks = _ref3.validationChecks;
  var list = Object.keys(_categorization_job.VALIDATION_CHECK_DESCRIPTION).map(function (k, i) {
    var failedCheck = validationChecks.find(function (vc) {
      return vc.id === i;
    });

    if (failedCheck !== undefined && (failedCheck === null || failedCheck === void 0 ? void 0 : failedCheck.valid) !== _categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.VALID) {
      return {
        iconType: 'cross',
        label: failedCheck.message,
        size: 's'
      };
    }

    return {
      iconType: 'check',
      label: _categorization_job.VALIDATION_CHECK_DESCRIPTION[i],
      size: 's'
    };
  });
  return _react.default.createElement(_eui.EuiListGroup, {
    listItems: list,
    maxWidth: false
  });
};