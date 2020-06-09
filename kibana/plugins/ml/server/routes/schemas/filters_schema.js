"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFilterSchema = exports.createFilterSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createFilterSchema = {
  filterId: _configSchema.schema.string(),
  description: _configSchema.schema.maybe(_configSchema.schema.string()),
  items: _configSchema.schema.arrayOf(_configSchema.schema.string())
};
exports.createFilterSchema = createFilterSchema;
const updateFilterSchema = {
  description: _configSchema.schema.maybe(_configSchema.schema.string()),
  addItems: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.string())),
  removeItems: _configSchema.schema.maybe(_configSchema.schema.arrayOf(_configSchema.schema.string()))
};
exports.updateFilterSchema = updateFilterSchema;