"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.licenseChecks = licenseChecks;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function licenseChecks(mlLicense) {
  return {
    isFullLicense() {
      if (mlLicense.isFullLicense() === false) {
        throw Error('Platinum, Enterprise or trial license needed');
      }
    },

    isMinimumLicense() {
      if (mlLicense.isMinimumLicense() === false) {
        throw Error('Basic license needed');
      }
    }

  };
}