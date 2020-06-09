"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTelemetry = initTelemetry;
exports.getTelemetry = getTelemetry;
exports.updateTelemetry = updateTelemetry;
exports.incrementCounts = incrementCounts;
exports.TELEMETRY_DOC_ID = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _kibana_server_services = require("../kibana_server_services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const TELEMETRY_DOC_ID = 'file-upload-telemetry';
exports.TELEMETRY_DOC_ID = TELEMETRY_DOC_ID;

function initTelemetry() {
  return {
    filesUploadedTotalCount: 0
  };
}

async function getTelemetry(internalRepo) {
  const internalRepository = internalRepo || (0, _kibana_server_services.getInternalRepository)();
  let telemetrySavedObject;

  try {
    telemetrySavedObject = await internalRepository.get(TELEMETRY_DOC_ID, TELEMETRY_DOC_ID);
  } catch (e) {// Fail silently
  }

  return telemetrySavedObject ? telemetrySavedObject.attributes : null;
}

async function updateTelemetry(internalRepo) {
  const internalRepository = internalRepo || (0, _kibana_server_services.getInternalRepository)();
  let telemetry = await getTelemetry(internalRepository); // Create if doesn't exist

  if (!telemetry || _lodash.default.isEmpty(telemetry)) {
    const newTelemetrySavedObject = await internalRepository.create(TELEMETRY_DOC_ID, initTelemetry(), {
      id: TELEMETRY_DOC_ID
    });
    telemetry = newTelemetrySavedObject.attributes;
  }

  await internalRepository.update(TELEMETRY_DOC_ID, TELEMETRY_DOC_ID, incrementCounts(telemetry));
}

function incrementCounts({
  filesUploadedTotalCount
}) {
  return {
    // TODO: get telemetry for app, total file counts, file type
    filesUploadedTotalCount: filesUploadedTotalCount + 1
  };
}