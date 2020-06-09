"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.add = void 0;

var _constants = require("../../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var set = function set(jobs) {
  sessionStorage.setItem(_constants.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY, JSON.stringify(jobs));
};

var getAll = function getAll() {
  var sessionValue = sessionStorage.getItem(_constants.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY);
  return sessionValue ? JSON.parse(sessionValue) : [];
};

var add = function add(jobId) {
  var jobs = getAll();
  jobs.push(jobId);
  set(jobs);
};

exports.add = add;

var remove = function remove(jobId) {
  var jobs = getAll();
  var index = jobs.indexOf(jobId);

  if (!index) {
    throw new Error('Unable to find job to remove it');
  }

  jobs.splice(index, 1);
  set(jobs);
};

exports.remove = remove;