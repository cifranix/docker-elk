"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAnnotationSchema = exports.getAnnotationsSchema = exports.indexAnnotationSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const indexAnnotationSchema = {
  timestamp: _configSchema.schema.number(),
  end_timestamp: _configSchema.schema.number(),
  annotation: _configSchema.schema.string(),
  job_id: _configSchema.schema.string(),
  type: _configSchema.schema.string(),
  create_time: _configSchema.schema.maybe(_configSchema.schema.number()),
  create_username: _configSchema.schema.maybe(_configSchema.schema.string()),
  modified_time: _configSchema.schema.maybe(_configSchema.schema.number()),
  modified_username: _configSchema.schema.maybe(_configSchema.schema.string()),
  _id: _configSchema.schema.maybe(_configSchema.schema.string()),
  key: _configSchema.schema.maybe(_configSchema.schema.string())
};
exports.indexAnnotationSchema = indexAnnotationSchema;
const getAnnotationsSchema = {
  jobIds: _configSchema.schema.arrayOf(_configSchema.schema.string()),
  earliestMs: _configSchema.schema.oneOf([_configSchema.schema.nullable(_configSchema.schema.number()), _configSchema.schema.maybe(_configSchema.schema.number())]),
  latestMs: _configSchema.schema.oneOf([_configSchema.schema.nullable(_configSchema.schema.number()), _configSchema.schema.maybe(_configSchema.schema.number())]),
  maxAnnotations: _configSchema.schema.number()
};
exports.getAnnotationsSchema = getAnnotationsSchema;
const deleteAnnotationSchema = {
  annotationId: _configSchema.schema.string()
};
exports.deleteAnnotationSchema = deleteAnnotationSchema;