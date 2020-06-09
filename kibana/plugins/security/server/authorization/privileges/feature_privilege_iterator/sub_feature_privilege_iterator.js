"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subFeaturePrivilegeIterator = subFeaturePrivilegeIterator;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function* subFeaturePrivilegeIterator(feature) {
  for (const subFeature of feature.subFeatures) {
    for (const group of subFeature.privilegeGroups) {
      yield* group.privileges;
    }
  }
}