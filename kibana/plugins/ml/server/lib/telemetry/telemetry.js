"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTelemetry = initTelemetry;
exports.getTelemetry = getTelemetry;
exports.updateTelemetry = updateTelemetry;
exports.TELEMETRY_DOC_ID = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _internal_repository = require("./internal_repository");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const TELEMETRY_DOC_ID = 'ml-telemetry';
exports.TELEMETRY_DOC_ID = TELEMETRY_DOC_ID;

function initTelemetry() {
  return {
    file_data_visualizer: {
      index_creation_count: 0
    }
  };
}

async function getTelemetry(internalRepository) {
  if (internalRepository === undefined) {
    return null;
  }

  let telemetrySavedObject;

  try {
    telemetrySavedObject = await internalRepository.get(TELEMETRY_DOC_ID, TELEMETRY_DOC_ID);
  } catch (e) {// Fail silently
  }

  return telemetrySavedObject ? telemetrySavedObject.attributes : null;
}

async function updateTelemetry(internalRepo) {
  const internalRepository = internalRepo || (0, _internal_repository.getInternalRepository)();

  if (internalRepository === null) {
    return;
  }

  let telemetry = await getTelemetry(internalRepository); // Create if doesn't exist

  if (telemetry === null || _lodash.default.isEmpty(telemetry)) {
    const newTelemetrySavedObject = await internalRepository.create(TELEMETRY_DOC_ID, initTelemetry(), {
      id: TELEMETRY_DOC_ID
    });
    telemetry = newTelemetrySavedObject.attributes;
  }

  if (telemetry !== null) {
    await internalRepository.update(TELEMETRY_DOC_ID, TELEMETRY_DOC_ID, incrementCounts(telemetry));
  }
}

function incrementCounts(telemetry) {
  return {
    file_data_visualizer: {
      index_creation_count: telemetry.file_data_visualizer.index_creation_count + 1
    }
  };
}