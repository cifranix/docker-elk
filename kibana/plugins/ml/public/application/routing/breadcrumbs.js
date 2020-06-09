"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA_VISUALIZER_BREADCRUMB = exports.ANOMALY_DETECTION_BREADCRUMB = exports.SETTINGS = exports.ML_BREADCRUMB = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ML_BREADCRUMB = Object.freeze({
  text: _i18n.i18n.translate('xpack.ml.machineLearningBreadcrumbLabel', {
    defaultMessage: 'Machine Learning'
  }),
  href: '#/'
});
exports.ML_BREADCRUMB = ML_BREADCRUMB;
var SETTINGS = Object.freeze({
  text: _i18n.i18n.translate('xpack.ml.settingsBreadcrumbLabel', {
    defaultMessage: 'Settings'
  }),
  href: '#/settings'
});
exports.SETTINGS = SETTINGS;
var ANOMALY_DETECTION_BREADCRUMB = Object.freeze({
  text: _i18n.i18n.translate('xpack.ml.anomalyDetectionBreadcrumbLabel', {
    defaultMessage: 'Anomaly Detection'
  }),
  href: '#/jobs'
});
exports.ANOMALY_DETECTION_BREADCRUMB = ANOMALY_DETECTION_BREADCRUMB;
var DATA_VISUALIZER_BREADCRUMB = Object.freeze({
  text: _i18n.i18n.translate('xpack.ml.datavisualizerBreadcrumbLabel', {
    defaultMessage: 'Data Visualizer'
  }),
  href: '#/datavisualizer'
});
exports.DATA_VISUALIZER_BREADCRUMB = DATA_VISUALIZER_BREADCRUMB;