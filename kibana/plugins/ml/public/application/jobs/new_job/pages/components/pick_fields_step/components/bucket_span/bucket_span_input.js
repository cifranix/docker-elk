"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BucketSpanInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BucketSpanInput = function BucketSpanInput(_ref) {
  var bucketSpan = _ref.bucketSpan,
      setBucketSpan = _ref.setBucketSpan,
      isInvalid = _ref.isInvalid,
      disabled = _ref.disabled;
  return _react.default.createElement(_eui.EuiFieldText, {
    disabled: disabled,
    placeholder: _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.bucketSpan.placeholder', {
      defaultMessage: 'Bucket span'
    }),
    value: bucketSpan,
    onChange: function onChange(e) {
      return setBucketSpan(e.target.value);
    },
    isInvalid: isInvalid,
    "data-test-subj": "mlJobWizardInputBucketSpan"
  });
};

exports.BucketSpanInput = BucketSpanInput;