"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricSelector = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _agg_select = require("../agg_select");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MAX_WIDTH = 560;

var MetricSelector = function MetricSelector(_ref) {
  var fields = _ref.fields,
      detectorChangeHandler = _ref.detectorChangeHandler,
      selectedOptions = _ref.selectedOptions,
      maxWidth = _ref.maxWidth,
      removeOptions = _ref.removeOptions;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    style: {
      maxWidth: maxWidth !== undefined ? maxWidth : MAX_WIDTH
    }
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.populationView.addMetric', {
      defaultMessage: 'Add metric'
    })
  }, _react.default.createElement(_agg_select.AggSelect, {
    fields: fields,
    changeHandler: detectorChangeHandler,
    selectedOptions: selectedOptions,
    removeOptions: removeOptions
  }))));
};

exports.MetricSelector = MetricSelector;