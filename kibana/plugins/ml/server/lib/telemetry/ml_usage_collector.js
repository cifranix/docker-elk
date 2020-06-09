"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMlTelemetry = initMlTelemetry;

var _telemetry = require("./telemetry");

var _mappings = require("./mappings");

var _internal_repository = require("./internal_repository");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const TELEMETRY_TYPE = 'mlTelemetry';

function initMlTelemetry(coreSetup, usageCollection) {
  coreSetup.savedObjects.registerType(_mappings.mlTelemetryMappingsType);
  registerMlUsageCollector(usageCollection);
  coreSetup.getStartServices().then(([core]) => {
    (0, _internal_repository.setInternalRepository)(core.savedObjects.createInternalRepository);
  });
}

function registerMlUsageCollector(usageCollection) {
  const mlUsageCollector = usageCollection.makeUsageCollector({
    type: TELEMETRY_TYPE,
    isReady: () => true,
    fetch: async () => (await (0, _telemetry.getTelemetry)()) || (0, _telemetry.initTelemetry)()
  });
  usageCollection.registerCollector(mlUsageCollector);
}