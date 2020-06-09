"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSchema = void 0;

var _configSchema = require("@kbn/config-schema");

var _actions_config = require("./actions_config");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const configSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  whitelistedHosts: _configSchema.schema.arrayOf(_configSchema.schema.oneOf([_configSchema.schema.string({
    hostname: true
  }), _configSchema.schema.literal(_actions_config.WhitelistedHosts.Any)]), {
    defaultValue: [_actions_config.WhitelistedHosts.Any]
  }),
  enabledActionTypes: _configSchema.schema.arrayOf(_configSchema.schema.oneOf([_configSchema.schema.string(), _configSchema.schema.literal(_actions_config.EnabledActionTypes.Any)]), {
    defaultValue: [_actions_config.WhitelistedHosts.Any]
  })
});

exports.configSchema = configSchema;