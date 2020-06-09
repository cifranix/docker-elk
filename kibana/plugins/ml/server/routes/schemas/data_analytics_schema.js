"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataAnalyticsExplainSchema = exports.dataAnalyticsEvaluateSchema = exports.dataAnalyticsJobConfigSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const dataAnalyticsJobConfigSchema = {
  description: _configSchema.schema.maybe(_configSchema.schema.string()),
  dest: _configSchema.schema.object({
    index: _configSchema.schema.string(),
    results_field: _configSchema.schema.maybe(_configSchema.schema.string())
  }),
  source: _configSchema.schema.object({
    index: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())]),
    query: _configSchema.schema.maybe(_configSchema.schema.any()),
    _source: _configSchema.schema.maybe(_configSchema.schema.object({
      includes: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.string()))),
      excludes: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.string())))
    }))
  }),
  allow_lazy_start: _configSchema.schema.maybe(_configSchema.schema.boolean()),
  analysis: _configSchema.schema.any(),
  analyzed_fields: _configSchema.schema.any(),
  model_memory_limit: _configSchema.schema.string()
};
exports.dataAnalyticsJobConfigSchema = dataAnalyticsJobConfigSchema;
const dataAnalyticsEvaluateSchema = {
  index: _configSchema.schema.string(),
  query: _configSchema.schema.maybe(_configSchema.schema.any()),
  evaluation: _configSchema.schema.maybe(_configSchema.schema.object({
    regression: _configSchema.schema.maybe(_configSchema.schema.any()),
    classification: _configSchema.schema.maybe(_configSchema.schema.any())
  }))
};
exports.dataAnalyticsEvaluateSchema = dataAnalyticsEvaluateSchema;
const dataAnalyticsExplainSchema = {
  description: _configSchema.schema.maybe(_configSchema.schema.string()),
  dest: _configSchema.schema.maybe(_configSchema.schema.any()),
  source: _configSchema.schema.object({
    index: _configSchema.schema.string()
  }),
  analysis: _configSchema.schema.any(),
  analyzed_fields: _configSchema.schema.maybe(_configSchema.schema.any()),
  model_memory_limit: _configSchema.schema.maybe(_configSchema.schema.string())
};
exports.dataAnalyticsExplainSchema = dataAnalyticsExplainSchema;