"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Italic = exports.DatafeedSectionTitle = exports.JobSectionTitle = exports.defaultLabel = exports.falseLabel = exports.trueLabel = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var trueLabel = _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.trueLabel', {
  defaultMessage: 'True'
});

exports.trueLabel = trueLabel;

var falseLabel = _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.falseLabel', {
  defaultMessage: 'False'
});

exports.falseLabel = falseLabel;

var defaultLabel = _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.defaultString', {
  defaultMessage: 'default'
});

exports.defaultLabel = defaultLabel;

var JobSectionTitle = function JobSectionTitle() {
  return _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.summaryStep.jobConfig.title",
    defaultMessage: "Job configuration"
  })));
};

exports.JobSectionTitle = JobSectionTitle;

var DatafeedSectionTitle = function DatafeedSectionTitle() {
  return _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.summaryStep.datafeedConfig.title",
    defaultMessage: "Datafeed configuration"
  })));
};

exports.DatafeedSectionTitle = DatafeedSectionTitle;

var Italic = function Italic(_ref) {
  var children = _ref.children;
  return _react.default.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, children);
};

exports.Italic = Italic;