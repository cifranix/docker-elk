"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFeatures = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../src/plugins/home/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var registerFeatures = function registerFeatures(homePlugin) {
  homePlugin.featureCatalogue.register({
    id: 'metrics',
    title: _i18n.i18n.translate('xpack.infra.registerFeatures.infraOpsTitle', {
      defaultMessage: 'Metrics'
    }),
    description: _i18n.i18n.translate('xpack.infra.registerFeatures.infraOpsDescription', {
      defaultMessage: 'Explore infrastructure metrics and logs for common servers, containers, and services.'
    }),
    icon: 'metricsApp',
    path: "/app/metrics",
    showOnHomePage: true,
    category: _public.FeatureCatalogueCategory.DATA
  });
  homePlugin.featureCatalogue.register({
    id: 'logs',
    title: _i18n.i18n.translate('xpack.infra.registerFeatures.logsTitle', {
      defaultMessage: 'Logs'
    }),
    description: _i18n.i18n.translate('xpack.infra.registerFeatures.logsDescription', {
      defaultMessage: 'Stream logs in real time or scroll through historical views in a console-like experience.'
    }),
    icon: 'logsApp',
    path: "/app/logs",
    showOnHomePage: true,
    category: _public.FeatureCatalogueCategory.DATA
  });
};

exports.registerFeatures = registerFeatures;