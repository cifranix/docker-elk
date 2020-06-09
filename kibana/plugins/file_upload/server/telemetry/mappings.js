"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileUploadTelemetryMappingsType = void 0;

var _telemetry = require("./telemetry");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const fileUploadTelemetryMappingsType = {
  name: _telemetry.TELEMETRY_DOC_ID,
  hidden: false,
  namespaceAgnostic: true,
  mappings: {
    properties: {
      filesUploadedTotalCount: {
        type: 'long'
      }
    }
  }
};
exports.fileUploadTelemetryMappingsType = fileUploadTelemetryMappingsType;