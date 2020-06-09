"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApmTelemetry = createApmTelemetry;

var _operators = require("rxjs/operators");

var _get_apm_indices = require("../settings/apm_indices/get_apm_indices");

var _apm_saved_object_constants = require("../../../common/apm_saved_object_constants");

var _collect_data_telemetry = require("./collect_data_telemetry");

var _get_internal_saved_objects_client = require("../helpers/get_internal_saved_objects_client");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const APM_TELEMETRY_TASK_NAME = 'apm-telemetry-task';

async function createApmTelemetry({
  core,
  config$,
  usageCollector,
  taskManager,
  logger
}) {
  const savedObjectsClient = await (0, _get_internal_saved_objects_client.getInternalSavedObjectsClient)(core);

  const collectAndStore = async () => {
    const config = await config$.pipe((0, _operators.take)(1)).toPromise();
    const esClient = core.elasticsearch.dataClient;
    const indices = await (0, _get_apm_indices.getApmIndices)({
      config,
      savedObjectsClient
    });
    const search = esClient.callAsInternalUser.bind(esClient, 'search');
    const indicesStats = esClient.callAsInternalUser.bind(esClient, 'indices.stats');
    const transportRequest = esClient.callAsInternalUser.bind(esClient, 'transport.request');
    const dataTelemetry = await (0, _collect_data_telemetry.collectDataTelemetry)({
      search,
      indices,
      logger,
      indicesStats,
      transportRequest
    });
    await savedObjectsClient.create(_apm_saved_object_constants.APM_TELEMETRY_SAVED_OBJECT_TYPE, dataTelemetry, {
      id: _apm_saved_object_constants.APM_TELEMETRY_SAVED_OBJECT_TYPE,
      overwrite: true
    });
  };

  taskManager.registerTaskDefinitions({
    [APM_TELEMETRY_TASK_NAME]: {
      title: 'Collect APM telemetry',
      type: APM_TELEMETRY_TASK_NAME,
      createTaskRunner: () => {
        return {
          run: async () => {
            await collectAndStore();
          }
        };
      }
    }
  });
  const collector = usageCollector.makeUsageCollector({
    type: 'apm',
    fetch: async () => {
      try {
        const data = (await savedObjectsClient.get(_apm_saved_object_constants.APM_TELEMETRY_SAVED_OBJECT_TYPE, _apm_saved_object_constants.APM_TELEMETRY_SAVED_OBJECT_ID)).attributes;
        return data;
      } catch (err) {
        var _err$output;

        if (((_err$output = err.output) === null || _err$output === void 0 ? void 0 : _err$output.statusCode) === 404) {
          // task has not run yet, so no saved object to return
          return {};
        }

        throw err;
      }
    },
    isReady: () => true
  });
  usageCollector.registerCollector(collector);
  core.getStartServices().then(([coreStart, pluginsStart]) => {
    const {
      taskManager: taskManagerStart
    } = pluginsStart;
    taskManagerStart.ensureScheduled({
      id: APM_TELEMETRY_TASK_NAME,
      taskType: APM_TELEMETRY_TASK_NAME,
      schedule: {
        interval: '720m'
      },
      scope: ['apm'],
      params: {},
      state: {}
    });
  });
}