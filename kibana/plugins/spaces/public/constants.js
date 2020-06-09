"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSpacesFeatureDescription = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var spacesFeatureDescription;

var getSpacesFeatureDescription = function getSpacesFeatureDescription() {
  if (!spacesFeatureDescription) {
    spacesFeatureDescription = _i18n.i18n.translate('xpack.spaces.featureDescription', {
      defaultMessage: 'Organize your dashboards and other saved objects into meaningful categories.'
    });
  }

  return spacesFeatureDescription;
};

exports.getSpacesFeatureDescription = getSpacesFeatureDescription;