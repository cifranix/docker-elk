"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerLensUsageCollector = registerLensUsageCollector;

var _moment = _interopRequireDefault(require("moment"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerLensUsageCollector(usageCollection, taskManager) {
  let isCollectorReady = false;
  taskManager.then(() => {
    // mark lensUsageCollector as ready to collect when the TaskManager is ready
    isCollectorReady = true;
  });
  const lensUsageCollector = usageCollection.makeUsageCollector({
    type: 'lens',
    fetch: async () => {
      try {
        const docs = await getLatestTaskState((await taskManager)); // get the accumulated state from the recurring task

        const state = (0, _lodash.get)(docs, '[0].state');
        const events = getDataByDate(state.byDate);
        const suggestions = getDataByDate(state.suggestionsByDate);
        return { ...state.saved,
          events_30_days: events.last30,
          events_90_days: events.last90,
          suggestion_events_30_days: suggestions.last30,
          suggestion_events_90_days: suggestions.last90
        };
      } catch (err) {
        return {
          saved_overall_total: 0,
          saved_30_days_total: 0,
          saved_90_days_total: 0,
          saved_overall: {},
          saved_30_days: {},
          saved_90_days: {},
          events_30_days: {},
          events_90_days: {},
          suggestion_events_30_days: {},
          suggestion_events_90_days: {}
        };
      }
    },
    isReady: () => isCollectorReady
  });
  usageCollection.registerCollector(lensUsageCollector);
}

function addEvents(prevEvents, newEvents) {
  Object.keys(newEvents).forEach(key => {
    prevEvents[key] = (prevEvents[key] || 0) + newEvents[key];
  });
}

async function getLatestTaskState(taskManager) {
  try {
    const result = await taskManager.fetch({
      query: {
        bool: {
          filter: {
            term: {
              _id: `task:Lens-lens_telemetry`
            }
          }
        }
      }
    });
    return result.docs;
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

function getDataByDate(dates) {
  const byDate = Object.keys(dates || {}).map(dateStr => parseInt(dateStr, 10));
  const last30 = {};
  const last90 = {};
  const last30Timestamp = (0, _moment.default)().subtract(30, 'days').unix();
  const last90Timestamp = (0, _moment.default)().subtract(90, 'days').unix();
  byDate.forEach(dateKey => {
    if (dateKey >= last30Timestamp) {
      addEvents(last30, dates[dateKey]);
      addEvents(last90, dates[dateKey]);
    } else if (dateKey > last90Timestamp) {
      addEvents(last90, dates[dateKey]);
    }
  });
  return {
    last30,
    last90
  };
}