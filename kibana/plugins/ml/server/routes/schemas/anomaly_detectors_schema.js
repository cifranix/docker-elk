"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anomalyDetectionJobSchema = exports.analysisConfigSchema = exports.anomalyDetectionUpdateJobSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const customRulesSchema = _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.object({
  actions: _configSchema.schema.arrayOf(_configSchema.schema.string()),
  conditions: _configSchema.schema.arrayOf(_configSchema.schema.any()),
  scope: _configSchema.schema.maybe(_configSchema.schema.any())
}))));

const detectorSchema = _configSchema.schema.object({
  identifier: _configSchema.schema.maybe(_configSchema.schema.string()),
  function: _configSchema.schema.string(),
  field_name: _configSchema.schema.maybe(_configSchema.schema.string()),
  by_field_name: _configSchema.schema.maybe(_configSchema.schema.string()),
  over_field_name: _configSchema.schema.maybe(_configSchema.schema.string()),
  partition_field_name: _configSchema.schema.maybe(_configSchema.schema.string()),
  detector_description: _configSchema.schema.maybe(_configSchema.schema.string()),
  custom_rules: customRulesSchema
});

const customUrlSchema = {
  url_name: _configSchema.schema.string(),
  url_value: _configSchema.schema.string(),
  time_range: _configSchema.schema.maybe(_configSchema.schema.any())
};

const customSettingsSchema = _configSchema.schema.object({
  created_by: _configSchema.schema.maybe(_configSchema.schema.string()),
  custom_urls: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.object({ ...customUrlSchema
  }))))
}, {
  unknowns: 'allow' // Create / Update job API allows other fields to be added to custom_settings.

});

const anomalyDetectionUpdateJobSchema = {
  description: _configSchema.schema.maybe(_configSchema.schema.string()),
  detectors: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.object({
    detector_index: _configSchema.schema.number(),
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    custom_rules: customRulesSchema
  })))),
  custom_settings: _configSchema.schema.maybe(customSettingsSchema),
  analysis_limits: _configSchema.schema.maybe(_configSchema.schema.object({
    categorization_examples_limit: _configSchema.schema.maybe(_configSchema.schema.number()),
    model_memory_limit: _configSchema.schema.maybe(_configSchema.schema.string())
  })),
  groups: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.string())))
};
exports.anomalyDetectionUpdateJobSchema = anomalyDetectionUpdateJobSchema;

const analysisConfigSchema = _configSchema.schema.object({
  bucket_span: _configSchema.schema.maybe(_configSchema.schema.string()),
  summary_count_field_name: _configSchema.schema.maybe(_configSchema.schema.string()),
  detectors: _configSchema.schema.arrayOf(detectorSchema),
  influencers: _configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.string())),
  categorization_field_name: _configSchema.schema.maybe(_configSchema.schema.string())
});

exports.analysisConfigSchema = analysisConfigSchema;
const anomalyDetectionJobSchema = {
  analysis_config: analysisConfigSchema,
  analysis_limits: _configSchema.schema.maybe(_configSchema.schema.object({
    categorization_examples_limit: _configSchema.schema.maybe(_configSchema.schema.number()),
    model_memory_limit: _configSchema.schema.maybe(_configSchema.schema.string())
  })),
  background_persist_interval: _configSchema.schema.maybe(_configSchema.schema.string()),
  create_time: _configSchema.schema.maybe(_configSchema.schema.number()),
  custom_settings: _configSchema.schema.maybe(customSettingsSchema),
  allow_lazy_open: _configSchema.schema.maybe(_configSchema.schema.any()),
  data_counts: _configSchema.schema.maybe(_configSchema.schema.any()),
  data_description: _configSchema.schema.object({
    format: _configSchema.schema.maybe(_configSchema.schema.string()),
    time_field: _configSchema.schema.string(),
    time_format: _configSchema.schema.maybe(_configSchema.schema.string())
  }),
  datafeed_config: _configSchema.schema.maybe(_configSchema.schema.any()),
  description: _configSchema.schema.maybe(_configSchema.schema.string()),
  established_model_memory: _configSchema.schema.maybe(_configSchema.schema.number()),
  finished_time: _configSchema.schema.maybe(_configSchema.schema.number()),
  job_id: _configSchema.schema.string(),
  job_type: _configSchema.schema.maybe(_configSchema.schema.string()),
  job_version: _configSchema.schema.maybe(_configSchema.schema.string()),
  groups: _configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.string())),
  model_plot_config: _configSchema.schema.maybe(_configSchema.schema.any()),
  model_size_stats: _configSchema.schema.maybe(_configSchema.schema.any()),
  model_snapshot_id: _configSchema.schema.maybe(_configSchema.schema.string()),
  model_snapshot_min_version: _configSchema.schema.maybe(_configSchema.schema.string()),
  model_snapshot_retention_days: _configSchema.schema.maybe(_configSchema.schema.number()),
  renormalization_window_days: _configSchema.schema.maybe(_configSchema.schema.number()),
  results_index_name: _configSchema.schema.maybe(_configSchema.schema.string()),
  results_retention_days: _configSchema.schema.maybe(_configSchema.schema.number()),
  state: _configSchema.schema.maybe(_configSchema.schema.string())
};
exports.anomalyDetectionJobSchema = anomalyDetectionJobSchema;