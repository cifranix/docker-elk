"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnabledFeatures = getEnabledFeatures;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getEnabledFeatures(features, space) {
  return features.filter(function (feature) {
    return !(space.disabledFeatures || []).includes(feature.id);
  });
}