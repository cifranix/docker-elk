"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nullableType = nullableType;

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: remove once this is merged:  https://github.com/elastic/kibana/pull/41728
function nullableType(type) {
  return _configSchema.schema.oneOf([type, _configSchema.schema.literal(null)], {
    defaultValue: () => null
  });
}