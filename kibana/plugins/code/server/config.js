"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeConfigSchema = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createCodeConfigSchema = () => {
  return _configSchema.schema.any({
    defaultValue: {}
  });
};

const CodeConfigSchema = createCodeConfigSchema();
exports.CodeConfigSchema = CodeConfigSchema;