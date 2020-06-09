"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepDetailsSummary = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StepDetailsSummary = _react.default.memo(function (_ref) {
  var continuousModeDateField = _ref.continuousModeDateField,
      createIndexPattern = _ref.createIndexPattern,
      isContinuousModeEnabled = _ref.isContinuousModeEnabled,
      transformId = _ref.transformId,
      transformDescription = _ref.transformDescription,
      destinationIndex = _ref.destinationIndex,
      touched = _ref.touched;

  if (touched === false) {
    return null;
  }

  var destinationIndexHelpText = createIndexPattern ? _i18n.i18n.translate('xpack.transform.stepDetailsSummary.createIndexPatternMessage', {
    defaultMessage: 'A Kibana index pattern will be created for this transform.'
  }) : '';
  return _react.default.createElement("div", {
    "data-test-subj": "transformStepDetailsSummary"
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDetailsSummary.transformIdLabel', {
      defaultMessage: 'Transform ID'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: transformId,
    disabled: true
  })), _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDetailsSummary.transformDescriptionLabel', {
      defaultMessage: 'Transform description'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: transformDescription,
    disabled: true
  })), _react.default.createElement(_eui.EuiFormRow, {
    helpText: destinationIndexHelpText,
    label: _i18n.i18n.translate('xpack.transform.stepDetailsSummary.destinationIndexLabel', {
      defaultMessage: 'Destination index'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: destinationIndex,
    disabled: true
  })), isContinuousModeEnabled && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.stepDetailsSummary.continuousModeDateFieldLabel', {
      defaultMessage: 'Continuous mode date field'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: continuousModeDateField,
    disabled: true
  })));
});

exports.StepDetailsSummary = StepDetailsSummary;