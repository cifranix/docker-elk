"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsageCollector = getUsageCollector;

var _lodash = require("lodash");

var _constants = require("../../../../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function fetch(taskManager) {
  let docs;

  try {
    ({
      docs
    } = await taskManager.fetch({
      query: {
        bool: {
          filter: {
            term: {
              _id: `task:${_constants.PLUGIN_ID}-${_constants.VIS_TELEMETRY_TASK}`
            }
          }
        }
      }
    }));
  } catch (err) {
    const errMessage = err && err.message ? err.message : err.toString();
    /*
      The usage service WILL to try to fetch from this collector before the task manager has been initialized, because the task manager has to wait for all plugins to initialize first. It's fine to ignore it as next time around it will be initialized (or it will throw a different type of error)
    */

    if (errMessage.includes('NotInitialized')) {
      docs = null;
    } else {
      throw err;
    }
  }

  return docs;
}

function getUsageCollector(taskManager) {
  return {
    type: _constants.VIS_USAGE_TYPE,
    isReady: () => true,
    fetch: async () => {
      const docs = await fetch((await taskManager)); // get the accumulated state from the recurring task

      return (0, _lodash.get)(docs, '[0].state.stats');
    }
  };
}