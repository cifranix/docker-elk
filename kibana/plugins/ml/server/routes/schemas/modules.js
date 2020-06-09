"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModuleIdParamSchema = exports.setupModuleBodySchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const setupModuleBodySchema = _configSchema.schema.object({
  prefix: _configSchema.schema.maybe(_configSchema.schema.string()),
  groups: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.string())),
  indexPatternName: _configSchema.schema.maybe(_configSchema.schema.string()),
  query: _configSchema.schema.maybe(_configSchema.schema.any()),
  useDedicatedIndex: _configSchema.schema.maybe(_configSchema.schema.boolean()),
  startDatafeed: _configSchema.schema.maybe(_configSchema.schema.boolean()),
  start: _configSchema.schema.maybe(_configSchema.schema.number()),
  end: _configSchema.schema.maybe(_configSchema.schema.number()),
  jobOverrides: _configSchema.schema.maybe(_configSchema.schema.any()),
  datafeedOverrides: _configSchema.schema.maybe(_configSchema.schema.any()),

  /**
   * Indicates whether an estimate of the model memory limit
   * should be made by checking the cardinality of fields in the job configurations.
   */
  estimateModelMemory: _configSchema.schema.maybe(_configSchema.schema.boolean())
});

exports.setupModuleBodySchema = setupModuleBodySchema;

const getModuleIdParamSchema = (optional = false) => {
  const stringType = _configSchema.schema.string();

  return {
    moduleId: optional ? _configSchema.schema.maybe(stringType) : stringType
  };
};

exports.getModuleIdParamSchema = getModuleIdParamSchema;