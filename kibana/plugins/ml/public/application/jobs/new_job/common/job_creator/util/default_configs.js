"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmptyJob = createEmptyJob;
exports.createEmptyDatafeed = createEmptyDatafeed;
exports.createBasicDetector = createBasicDetector;

var _fields = require("../../../../../../../common/types/fields");

var _job_utils = require("../../../../../../../common/util/job_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createEmptyJob() {
  return {
    job_id: '',
    description: '',
    groups: [],
    analysis_config: {
      bucket_span: '',
      detectors: [],
      influencers: []
    },
    data_description: {
      time_field: ''
    }
  };
}

function createEmptyDatafeed(indexPatternTitle) {
  return {
    datafeed_id: '',
    job_id: '',
    indices: (0, _job_utils.splitIndexPatternNames)(indexPatternTitle),
    query: {}
  };
}

function createBasicDetector(agg, field) {
  var dtr = {
    function: agg.id
  };

  if (field.id !== _fields.EVENT_RATE_FIELD_ID) {
    dtr.field_name = field.id;
  }

  return dtr;
}