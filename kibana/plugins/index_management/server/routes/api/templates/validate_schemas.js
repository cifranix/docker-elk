"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const templateSchema = _configSchema.schema.object({
  name: _configSchema.schema.string(),
  indexPatterns: _configSchema.schema.arrayOf(_configSchema.schema.string()),
  version: _configSchema.schema.maybe(_configSchema.schema.number()),
  order: _configSchema.schema.maybe(_configSchema.schema.number()),
  settings: _configSchema.schema.maybe(_configSchema.schema.object({}, {
    unknowns: 'allow'
  })),
  aliases: _configSchema.schema.maybe(_configSchema.schema.object({}, {
    unknowns: 'allow'
  })),
  mappings: _configSchema.schema.maybe(_configSchema.schema.object({}, {
    unknowns: 'allow'
  })),
  ilmPolicy: _configSchema.schema.maybe(_configSchema.schema.object({
    name: _configSchema.schema.maybe(_configSchema.schema.string()),
    rollover_alias: _configSchema.schema.maybe(_configSchema.schema.string())
  })),
  isManaged: _configSchema.schema.maybe(_configSchema.schema.boolean())
});

exports.templateSchema = templateSchema;