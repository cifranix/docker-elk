"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFeature = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../src/plugins/home/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var registerFeature = function registerFeature(home) {
  // register Transforms so it appears on the Kibana home page
  home.featureCatalogue.register({
    id: 'transform',
    title: _i18n.i18n.translate('xpack.transform.transformsTitle', {
      defaultMessage: 'Transforms'
    }),
    description: _i18n.i18n.translate('xpack.transform.transformsDescription', {
      defaultMessage: 'Use transforms to pivot existing Elasticsearch indices into summarized or entity-centric indices.'
    }),
    icon: 'managementApp',
    // there is currently no Transforms icon, so using the general management app icon
    path: '/app/kibana#/management/elasticsearch/transform',
    showOnHomePage: true,
    category: _public.FeatureCatalogueCategory.ADMIN
  });
};

exports.registerFeature = registerFeature;