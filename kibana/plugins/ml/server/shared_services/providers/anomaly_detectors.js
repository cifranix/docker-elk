"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnomalyDetectorsProvider = getAnomalyDetectorsProvider;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getAnomalyDetectorsProvider(isFullLicense) {
  return {
    anomalyDetectorsProvider(callAsCurrentUser) {
      return {
        jobs(jobId) {
          isFullLicense();
          return callAsCurrentUser('ml.jobs', jobId !== undefined ? {
            jobId
          } : {});
        }

      };
    }

  };
}