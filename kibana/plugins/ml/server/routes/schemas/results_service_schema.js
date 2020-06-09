"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionFieldValuesSchema = exports.categoryExamplesSchema = exports.maxAnomalyScoreSchema = exports.categoryDefinitionSchema = exports.anomaliesTableDataSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const criteriaFieldSchema = _configSchema.schema.object({
  fieldType: _configSchema.schema.maybe(_configSchema.schema.string()),
  fieldName: _configSchema.schema.string(),
  fieldValue: _configSchema.schema.any()
});

const anomaliesTableDataSchema = {
  jobIds: _configSchema.schema.arrayOf(_configSchema.schema.string()),
  criteriaFields: _configSchema.schema.arrayOf(criteriaFieldSchema),
  influencers: _configSchema.schema.arrayOf(_configSchema.schema.maybe(_configSchema.schema.object({
    fieldName: _configSchema.schema.string(),
    fieldValue: _configSchema.schema.any()
  }))),
  aggregationInterval: _configSchema.schema.string(),
  threshold: _configSchema.schema.number(),
  earliestMs: _configSchema.schema.number(),
  latestMs: _configSchema.schema.number(),
  dateFormatTz: _configSchema.schema.string(),
  maxRecords: _configSchema.schema.number(),
  maxExamples: _configSchema.schema.maybe(_configSchema.schema.number()),
  influencersFilterQuery: _configSchema.schema.maybe(_configSchema.schema.any())
};
exports.anomaliesTableDataSchema = anomaliesTableDataSchema;
const categoryDefinitionSchema = {
  jobId: _configSchema.schema.maybe(_configSchema.schema.string()),
  categoryId: _configSchema.schema.string()
};
exports.categoryDefinitionSchema = categoryDefinitionSchema;
const maxAnomalyScoreSchema = {
  jobIds: _configSchema.schema.arrayOf(_configSchema.schema.string()),
  earliestMs: _configSchema.schema.maybe(_configSchema.schema.number()),
  latestMs: _configSchema.schema.maybe(_configSchema.schema.number())
};
exports.maxAnomalyScoreSchema = maxAnomalyScoreSchema;
const categoryExamplesSchema = {
  jobId: _configSchema.schema.string(),
  categoryIds: _configSchema.schema.arrayOf(_configSchema.schema.string()),
  maxExamples: _configSchema.schema.number()
};
exports.categoryExamplesSchema = categoryExamplesSchema;
const partitionFieldValuesSchema = {
  jobId: _configSchema.schema.string(),
  searchTerm: _configSchema.schema.maybe(_configSchema.schema.any()),
  criteriaFields: _configSchema.schema.arrayOf(criteriaFieldSchema),
  earliestMs: _configSchema.schema.number(),
  latestMs: _configSchema.schema.number()
};
exports.partitionFieldValuesSchema = partitionFieldValuesSchema;