"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeFieldRangeSchema = exports.getCardinalityOfFieldsSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getCardinalityOfFieldsSchema = _configSchema.schema.object({
  index: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())]),
  fieldNames: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.string())),
  query: _configSchema.schema.maybe(_configSchema.schema.any()),
  timeFieldName: _configSchema.schema.maybe(_configSchema.schema.string()),
  earliestMs: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.number(), _configSchema.schema.string()])),
  latestMs: _configSchema.schema.maybe(_configSchema.schema.oneOf([_configSchema.schema.number(), _configSchema.schema.string()]))
});

exports.getCardinalityOfFieldsSchema = getCardinalityOfFieldsSchema;

const getTimeFieldRangeSchema = _configSchema.schema.object({
  index: _configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.arrayOf(_configSchema.schema.string())]),
  timeFieldName: _configSchema.schema.maybe(_configSchema.schema.string()),
  query: _configSchema.schema.maybe(_configSchema.schema.any())
});

exports.getTimeFieldRangeSchema = getTimeFieldRangeSchema;