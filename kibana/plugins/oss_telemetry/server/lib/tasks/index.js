"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTasks = registerTasks;
exports.scheduleTasks = scheduleTasks;

var _constants = require("../../../constants");

var _task_runner = require("./visualizations/task_runner");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerTasks({
  taskManager,
  logger,
  elasticsearch,
  config
}) {
  if (!taskManager) {
    logger.debug('Task manager is not available');
    return;
  }

  taskManager.registerTaskDefinitions({
    [_constants.VIS_TELEMETRY_TASK]: {
      title: 'X-Pack telemetry calculator for Visualizations',
      type: _constants.VIS_TELEMETRY_TASK,

      createTaskRunner({
        taskInstance
      }) {
        return {
          run: (0, _task_runner.visualizationsTaskRunner)(taskInstance, config, elasticsearch)
        };
      }

    }
  });
}

async function scheduleTasks({
  taskManager,
  logger
}) {
  if (!taskManager) {
    logger.debug('Task manager is not available');
    return;
  }

  try {
    await taskManager.ensureScheduled({
      id: `${_constants.PLUGIN_ID}-${_constants.VIS_TELEMETRY_TASK}`,
      taskType: _constants.VIS_TELEMETRY_TASK,
      state: {
        stats: {},
        runs: 0
      },
      params: {}
    });
  } catch (e) {
    logger.debug(`Error scheduling task, received ${e.message}`);
  }
}