"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFeature = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../src/plugins/home/public");

var _app = require("../common/constants/app");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var registerFeature = function registerFeature(home) {
  // register ML for the kibana home screen.
  // so the file data visualizer appears to allow people to import data
  home.environment.update({
    ml: true
  }); // register ML so it appears on the Kibana home page

  home.featureCatalogue.register({
    id: _app.PLUGIN_ID,
    title: _i18n.i18n.translate('xpack.ml.machineLearningTitle', {
      defaultMessage: 'Machine Learning'
    }),
    description: _i18n.i18n.translate('xpack.ml.machineLearningDescription', {
      defaultMessage: 'Automatically model the normal behavior of your time series data to detect anomalies.'
    }),
    icon: 'machineLearningApp',
    path: '/app/ml',
    showOnHomePage: true,
    category: _public.FeatureCatalogueCategory.DATA
  });
};

exports.registerFeature = registerFeature;