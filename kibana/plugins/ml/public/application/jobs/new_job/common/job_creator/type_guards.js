"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSingleMetricJobCreator = isSingleMetricJobCreator;
exports.isMultiMetricJobCreator = isMultiMetricJobCreator;
exports.isPopulationJobCreator = isPopulationJobCreator;
exports.isAdvancedJobCreator = isAdvancedJobCreator;
exports.isCategorizationJobCreator = isCategorizationJobCreator;

var _new_job = require("../../../../../../common/constants/new_job");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isSingleMetricJobCreator(jobCreator) {
  return jobCreator.type === _new_job.JOB_TYPE.SINGLE_METRIC;
}

function isMultiMetricJobCreator(jobCreator) {
  return jobCreator.type === _new_job.JOB_TYPE.MULTI_METRIC;
}

function isPopulationJobCreator(jobCreator) {
  return jobCreator.type === _new_job.JOB_TYPE.POPULATION;
}

function isAdvancedJobCreator(jobCreator) {
  return jobCreator.type === _new_job.JOB_TYPE.ADVANCED;
}

function isCategorizationJobCreator(jobCreator) {
  return jobCreator.type === _new_job.JOB_TYPE.CATEGORIZATION;
}