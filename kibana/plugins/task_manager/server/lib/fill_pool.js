"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fillPool = fillPool;
exports.FillPoolResult = void 0;

var _perf_hooks = require("perf_hooks");

var _lodash = require("lodash");

var _task_pool = require("../task_pool");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let FillPoolResult;
exports.FillPoolResult = FillPoolResult;

(function (FillPoolResult) {
  FillPoolResult["NoTasksClaimed"] = "NoTasksClaimed";
  FillPoolResult["RanOutOfCapacity"] = "RanOutOfCapacity";
})(FillPoolResult || (exports.FillPoolResult = FillPoolResult = {}));

/**
 * Given a function that runs a batch of tasks (e.g. taskPool.run), a function
 * that fetches task records (e.g. store.fetchAvailableTasks), and a function
 * that converts task records to the appropriate task runner, this function
 * fills the pool with work.
 *
 * This is annoyingly general in order to simplify testing.
 *
 * @param run - a function that runs a batch of tasks (e.g. taskPool.run)
 * @param fetchAvailableTasks - a function that fetches task records (e.g. store.fetchAvailableTasks)
 * @param converter - a function that converts task records to the appropriate task runner
 */
async function fillPool(fetchAvailableTasks, converter, run) {
  _perf_hooks.performance.mark('fillPool.start');

  const markClaimedTasksOnRerunCycle = (0, _lodash.after)(2, () => _perf_hooks.performance.mark('fillPool.claimedOnRerunCycle'));

  while (true) {
    const instances = await fetchAvailableTasks();

    if (!instances.length) {
      _perf_hooks.performance.mark('fillPool.bailNoTasks');

      _perf_hooks.performance.measure('fillPool.activityDurationUntilNoTasks', 'fillPool.start', 'fillPool.bailNoTasks');

      return FillPoolResult.NoTasksClaimed;
    }

    markClaimedTasksOnRerunCycle();
    const tasks = instances.map(converter);

    if ((await run(tasks)) === _task_pool.TaskPoolRunResult.RanOutOfCapacity) {
      _perf_hooks.performance.mark('fillPool.bailExhaustedCapacity');

      _perf_hooks.performance.measure('fillPool.activityDurationUntilExhaustedCapacity', 'fillPool.start', 'fillPool.bailExhaustedCapacity');

      return FillPoolResult.RanOutOfCapacity;
    }

    _perf_hooks.performance.mark('fillPool.cycle');
  }
}