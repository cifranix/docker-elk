"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobSelectionActionCreator = jobSelectionActionCreator;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _field_format_service = require("../../services/field_format_service");

var _job_service = require("../../services/job_service");

var _explorer_constants = require("../explorer_constants");

var _explorer_utils = require("../explorer_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function jobSelectionActionCreator(selectedJobIds) {
  return (0, _rxjs.from)(_field_format_service.mlFieldFormatService.populateFormats(selectedJobIds)).pipe((0, _operators.map)(function (resp) {
    if (resp.err) {
      console.log('Error populating field formats:', resp.err); // eslint-disable-line no-console

      return null;
    }

    var jobs = (0, _explorer_utils.createJobs)(_job_service.mlJobService.jobs).map(function (job) {
      job.selected = selectedJobIds.some(function (id) {
        return job.id === id;
      });
      return job;
    });
    var selectedJobs = jobs.filter(function (job) {
      return job.selected;
    });
    return {
      type: _explorer_constants.EXPLORER_ACTION.JOB_SELECTION_CHANGE,
      payload: {
        loading: false,
        selectedJobs: selectedJobs
      }
    };
  }));
}