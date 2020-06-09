"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createActionsUsageCollector = createActionsUsageCollector;
exports.registerActionsUsageCollector = registerActionsUsageCollector;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createActionsUsageCollector(usageCollection, taskManager) {
  return usageCollection.makeUsageCollector({
    type: 'actions',
    isReady: () => true,
    fetch: async () => {
      try {
        const doc = await getLatestTaskState((await taskManager)); // get the accumulated state from the recurring task

        const state = (0, _lodash.get)(doc, 'state');
        return { ...state
        };
      } catch (err) {
        return {
          count_total: 0,
          count_active_total: 0,
          count_active_by_type: {},
          count_by_type: {}
        };
      }
    }
  });
}

async function getLatestTaskState(taskManager) {
  try {
    const result = await taskManager.get('Actions-actions_telemetry');
    return result;
  } catch (err) {
    const errMessage = err && err.message ? err.message : err.toString();
    /*
      The usage service WILL to try to fetch from this collector before the task manager has been initialized, because the
      task manager has to wait for all plugins to initialize first. It's fine to ignore it as next time around it will be
      initialized (or it will throw a different type of error)
    */

    if (!errMessage.includes('NotInitialized')) {
      throw err;
    }
  }

  return null;
}

function registerActionsUsageCollector(usageCollection, taskManager) {
  const collector = createActionsUsageCollector(usageCollection, taskManager);
  usageCollection.registerCollector(collector);
}