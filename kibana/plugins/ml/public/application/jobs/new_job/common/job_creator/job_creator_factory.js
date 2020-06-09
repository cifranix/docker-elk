"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobCreatorFactory = void 0;

var _single_metric_job_creator = require("./single_metric_job_creator");

var _multi_metric_job_creator = require("./multi_metric_job_creator");

var _population_job_creator = require("./population_job_creator");

var _advanced_job_creator = require("./advanced_job_creator");

var _categorization_job_creator = require("./categorization_job_creator");

var _new_job = require("../../../../../../common/constants/new_job");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var jobCreatorFactory = function jobCreatorFactory(jobType) {
  return function (indexPattern, savedSearch, query) {
    var jc;

    switch (jobType) {
      case _new_job.JOB_TYPE.SINGLE_METRIC:
        jc = _single_metric_job_creator.SingleMetricJobCreator;
        break;

      case _new_job.JOB_TYPE.MULTI_METRIC:
        jc = _multi_metric_job_creator.MultiMetricJobCreator;
        break;

      case _new_job.JOB_TYPE.POPULATION:
        jc = _population_job_creator.PopulationJobCreator;
        break;

      case _new_job.JOB_TYPE.ADVANCED:
        jc = _advanced_job_creator.AdvancedJobCreator;
        break;

      case _new_job.JOB_TYPE.CATEGORIZATION:
        jc = _categorization_job_creator.CategorizationJobCreator;
        break;

      default:
        jc = _single_metric_job_creator.SingleMetricJobCreator;
        break;
    }

    return new jc(indexPattern, savedSearch, query);
  };
};

exports.jobCreatorFactory = jobCreatorFactory;