"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerFileUploadUsageCollector = registerFileUploadUsageCollector;

var _telemetry = require("./telemetry");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const TELEMETRY_TYPE = 'fileUploadTelemetry';

function registerFileUploadUsageCollector(usageCollection) {
  const fileUploadUsageCollector = usageCollection.makeUsageCollector({
    type: TELEMETRY_TYPE,
    isReady: () => true,
    fetch: async () => (await (0, _telemetry.getTelemetry)()) || (0, _telemetry.initTelemetry)()
  });
  usageCollection.registerCollector(fileUploadUsageCollector);
}