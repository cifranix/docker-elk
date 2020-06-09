"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJobServiceProvider = getJobServiceProvider;

var _job_service = require("../../models/job_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getJobServiceProvider(isFullLicense) {
  return {
    jobServiceProvider(callAsCurrentUser) {
      isFullLicense();
      return (0, _job_service.jobServiceProvider)(callAsCurrentUser);
    }

  };
}