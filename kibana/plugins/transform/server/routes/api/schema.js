"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemaTransformId = void 0;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const schemaTransformId = {
  params: _configSchema.schema.object({
    transformId: _configSchema.schema.string()
  })
};
exports.schemaTransformId = schemaTransformId;