"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleMetricSettings = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _bucket_span = require("../bucket_span");

var _sparse_data = require("../sparse_data");

var _general = require("../../../../../common/job_creator/util/general");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SingleMetricSettings = function SingleMetricSettings(_ref) {
  var setIsValid = _ref.setIsValid;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  var convertToMultiMetric = function convertToMultiMetric() {
    (0, _general.convertToMultiMetricJob)(jobCreator);
  };

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_bucket_span.BucketSpan, {
    setIsValid: setIsValid
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_sparse_data.SparseDataSwitch, null))), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: convertToMultiMetric
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.singleMetricView.convertToMultiMetricButton",
    defaultMessage: "Convert to multi metric job"
  })))));
};

exports.SingleMetricSettings = SingleMetricSettings;