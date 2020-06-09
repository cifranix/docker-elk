"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "IEvent", {
  enumerable: true,
  get: function () {
    return _schemas.IEvent;
  }
});
Object.defineProperty(exports, "IValidatedEvent", {
  enumerable: true,
  get: function () {
    return _schemas.IValidatedEvent;
  }
});
Object.defineProperty(exports, "EventSchema", {
  enumerable: true,
  get: function () {
    return _schemas.EventSchema;
  }
});
Object.defineProperty(exports, "ECS_VERSION", {
  enumerable: true,
  get: function () {
    return _schemas.ECS_VERSION;
  }
});
exports.ConfigSchema = void 0;

var _configSchema = require("@kbn/config-schema");

var _schemas = require("../generated/schemas");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ConfigSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  logEntries: _configSchema.schema.boolean({
    defaultValue: false
  }),
  indexEntries: _configSchema.schema.boolean({
    defaultValue: false
  })
});

exports.ConfigSchema = ConfigSchema;