"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConfig$ = exports.configSchema = void 0;

var _configSchema = require("@kbn/config-schema");

var _constants = require("../../../legacy/plugins/siem/common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const configSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  [_constants.SIGNALS_INDEX_KEY]: _configSchema.schema.string({
    defaultValue: _constants.DEFAULT_SIGNALS_INDEX
  })
});

exports.configSchema = configSchema;

const createConfig$ = context => context.config.create();

exports.createConfig$ = createConfig$;