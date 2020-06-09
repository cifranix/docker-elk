"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlTelemetryMappingsType = void 0;

var _telemetry = require("./telemetry");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const mlTelemetryMappingsType = {
  name: _telemetry.TELEMETRY_DOC_ID,
  hidden: false,
  namespaceAgnostic: true,
  mappings: {
    properties: {
      file_data_visualizer: {
        properties: {
          index_creation_count: {
            type: 'long'
          }
        }
      }
    }
  }
};
exports.mlTelemetryMappingsType = mlTelemetryMappingsType;