"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSharedServices = createSharedServices;

var _license_checks = require("./license_checks");

var _system = require("./providers/system");

var _job_service = require("./providers/job_service");

var _modules = require("./providers/modules");

var _results_service = require("./providers/results_service");

var _anomaly_detectors = require("./providers/anomaly_detectors");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createSharedServices(mlLicense, spaces, cloud) {
  const {
    isFullLicense,
    isMinimumLicense
  } = (0, _license_checks.licenseChecks)(mlLicense);
  return { ...(0, _job_service.getJobServiceProvider)(isFullLicense),
    ...(0, _anomaly_detectors.getAnomalyDetectorsProvider)(isFullLicense),
    ...(0, _system.getMlSystemProvider)(isMinimumLicense, isFullLicense, mlLicense, spaces, cloud),
    ...(0, _modules.getModulesProvider)(isFullLicense),
    ...(0, _results_service.getResultsServiceProvider)(isFullLicense)
  };
}