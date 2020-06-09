"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newJobRoute = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _reactRouterDom = require("react-router-dom");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.ANOMALY_DETECTION_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.jobWizardLabel', {
    defaultMessage: 'Create job'
  }),
  href: '#/jobs/new_job'
}];
var newJobRoute = {
  path: '/jobs/new_job',
  render: function render() {
    return _react.default.createElement(Page, null);
  },
  breadcrumbs: breadcrumbs
};
exports.newJobRoute = newJobRoute;

var Page = function Page() {
  return _react.default.createElement(_reactRouterDom.Redirect, {
    to: "/jobs/new_job/step/index_or_search"
  });
};