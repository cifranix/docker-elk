"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetectorChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _job_creator_context = require("../../../job_creator_context");

var _new_job = require("../../../../../../../../../common/constants/new_job");

var _single_metric_view = require("../../../pick_fields_step/components/single_metric_view");

var _multi_metric_view = require("../../../pick_fields_step/components/multi_metric_view");

var _population_view = require("../../../pick_fields_step/components/population_view");

var _advanced_view = require("../../../pick_fields_step/components/advanced_view");

var _categorization_view = require("../../../pick_fields_step/components/categorization_view");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DetectorChart = function DetectorChart() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  return _react.default.createElement(_react.Fragment, null, jobCreator.type === _new_job.JOB_TYPE.SINGLE_METRIC && _react.default.createElement(_single_metric_view.SingleMetricView, {
    isActive: false
  }), jobCreator.type === _new_job.JOB_TYPE.MULTI_METRIC && _react.default.createElement(_multi_metric_view.MultiMetricView, {
    isActive: false
  }), jobCreator.type === _new_job.JOB_TYPE.POPULATION && _react.default.createElement(_population_view.PopulationView, {
    isActive: false
  }), jobCreator.type === _new_job.JOB_TYPE.ADVANCED && _react.default.createElement(_advanced_view.AdvancedView, {
    isActive: false
  }), jobCreator.type === _new_job.JOB_TYPE.CATEGORIZATION && _react.default.createElement(_categorization_view.CategorizationView, {
    isActive: false
  }));
};

exports.DetectorChart = DetectorChart;