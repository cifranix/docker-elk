"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataVisualizerOverallStatsSchema = exports.dataVisualizerFieldStatsSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const dataVisualizerFieldStatsSchema = {
  params: _configSchema.schema.object({
    indexPatternTitle: _configSchema.schema.string()
  }),
  body: _configSchema.schema.object({
    query: _configSchema.schema.any(),
    fields: _configSchema.schema.arrayOf(_configSchema.schema.any()),
    samplerShardSize: _configSchema.schema.number(),
    timeFieldName: _configSchema.schema.maybe(_configSchema.schema.string()),
    earliest: _configSchema.schema.maybe(_configSchema.schema.number()),
    latest: _configSchema.schema.maybe(_configSchema.schema.number()),
    interval: _configSchema.schema.maybe(_configSchema.schema.string()),
    maxExamples: _configSchema.schema.number()
  })
};
exports.dataVisualizerFieldStatsSchema = dataVisualizerFieldStatsSchema;
const dataVisualizerOverallStatsSchema = {
  params: _configSchema.schema.object({
    indexPatternTitle: _configSchema.schema.string()
  }),
  body: _configSchema.schema.object({
    query: _configSchema.schema.any(),
    aggregatableFields: _configSchema.schema.arrayOf(_configSchema.schema.string()),
    nonAggregatableFields: _configSchema.schema.arrayOf(_configSchema.schema.string()),
    samplerShardSize: _configSchema.schema.number(),
    timeFieldName: _configSchema.schema.maybe(_configSchema.schema.string()),
    earliest: _configSchema.schema.maybe(_configSchema.schema.number()),
    latest: _configSchema.schema.maybe(_configSchema.schema.number())
  })
};
exports.dataVisualizerOverallStatsSchema = dataVisualizerOverallStatsSchema;