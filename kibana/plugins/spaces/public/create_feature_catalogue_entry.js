"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpacesFeatureCatalogueEntry = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../src/plugins/home/public");

var _constants = require("./constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createSpacesFeatureCatalogueEntry = function createSpacesFeatureCatalogueEntry() {
  return {
    id: 'spaces',
    title: _i18n.i18n.translate('xpack.spaces.spacesTitle', {
      defaultMessage: 'Spaces'
    }),
    description: (0, _constants.getSpacesFeatureDescription)(),
    icon: 'spacesApp',
    path: '/app/kibana#/management/kibana/spaces',
    showOnHomePage: true,
    category: _public.FeatureCatalogueCategory.ADMIN
  };
};

exports.createSpacesFeatureCatalogueEntry = createSpacesFeatureCatalogueEntry;