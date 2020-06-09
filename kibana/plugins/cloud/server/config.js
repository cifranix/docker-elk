"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const apmConfigSchema = _configSchema.schema.object({
  url: _configSchema.schema.maybe(_configSchema.schema.string()),
  secret_token: _configSchema.schema.maybe(_configSchema.schema.string()),
  ui: _configSchema.schema.maybe(_configSchema.schema.object({
    url: _configSchema.schema.maybe(_configSchema.schema.string())
  }))
});

const configSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  id: _configSchema.schema.maybe(_configSchema.schema.string()),
  apm: _configSchema.schema.maybe(apmConfigSchema),
  resetPasswordUrl: _configSchema.schema.maybe(_configSchema.schema.string())
});

const config = {
  exposeToBrowser: {
    id: true,
    resetPasswordUrl: true
  },
  schema: configSchema
};
exports.config = config;