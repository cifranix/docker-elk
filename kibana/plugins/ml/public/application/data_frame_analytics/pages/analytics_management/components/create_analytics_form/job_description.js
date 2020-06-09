"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobDescriptionInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var helpText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobDescription.helpText', {
  defaultMessage: 'Optional descriptive text'
});

var JobDescriptionInput = function JobDescriptionInput(_ref) {
  var description = _ref.description,
      setFormState = _ref.setFormState;
  return _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobDescription.label', {
      defaultMessage: 'Job description'
    })
  }, _react.default.createElement(_eui.EuiTextArea, {
    value: description,
    placeholder: helpText,
    rows: 2,
    onChange: function onChange(e) {
      var value = e.target.value;
      setFormState({
        description: value
      });
    },
    "data-test-subj": "mlDFAnalyticsJobCreationJobDescription"
  }));
};

exports.JobDescriptionInput = JobDescriptionInput;