"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirstUseCallout = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FirstUseCallout = function FirstUseCallout() {
  return _react.default.createElement(_eui.EuiCallOut, {
    color: "success",
    title: _i18n.i18n.translate('xpack.infra.logs.analysis.onboardingSuccessTitle', {
      defaultMessage: 'Success!'
    })
  }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.infra.logs.analysis.onboardingSuccessContent', {
    defaultMessage: 'Please allow a few minutes for our machine learning robots to begin collecting data.'
  })));
};

exports.FirstUseCallout = FirstUseCallout;