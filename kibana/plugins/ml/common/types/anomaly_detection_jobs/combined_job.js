"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandCombinedJobConfig = expandCombinedJobConfig;
exports.isCombinedJobWithStats = isCombinedJobWithStats;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function expandCombinedJobConfig(combinedJob) {
  const combinedJobClone = (0, _lodash.cloneDeep)(combinedJob);
  const job = combinedJobClone;
  const datafeed = combinedJobClone.datafeed_config;
  delete job.datafeed_config;
  return {
    job,
    datafeed
  };
}

function isCombinedJobWithStats(arg) {
  return typeof arg.job_id === 'string';
}