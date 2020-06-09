"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobServiceProvider = jobServiceProvider;

var _datafeeds = require("./datafeeds");

var _jobs = require("./jobs");

var _groups = require("./groups");

var _new_job_caps = require("./new_job_caps");

var _new_job = require("./new_job");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function jobServiceProvider(callAsCurrentUser) {
  return { ...(0, _datafeeds.datafeedsProvider)(callAsCurrentUser),
    ...(0, _jobs.jobsProvider)(callAsCurrentUser),
    ...(0, _groups.groupsProvider)(callAsCurrentUser),
    ...(0, _new_job_caps.newJobCapsProvider)(callAsCurrentUser),
    ...(0, _new_job.newJobChartsProvider)(callAsCurrentUser),
    ...(0, _new_job.topCategoriesProvider)(callAsCurrentUser)
  };
}