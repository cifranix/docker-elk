"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskPool = exports.TaskPoolRunResult = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _perf_hooks = require("perf_hooks");

var _lodash = require("lodash");

var _is_task_not_found_error = require("./lib/is_task_not_found_error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let TaskPoolRunResult;
exports.TaskPoolRunResult = TaskPoolRunResult;

(function (TaskPoolRunResult) {
  TaskPoolRunResult["RunningAllClaimedTasks"] = "RunningAllClaimedTasks";
  TaskPoolRunResult["RanOutOfCapacity"] = "RanOutOfCapacity";
})(TaskPoolRunResult || (exports.TaskPoolRunResult = TaskPoolRunResult = {}));

const VERSION_CONFLICT_MESSAGE = 'Task has been claimed by another Kibana service';
/**
 * Runs tasks in batches, taking costs into account.
 */

class TaskPool {
  /**
   * Creates an instance of TaskPool.
   *
   * @param {Opts} opts
   * @prop {number} maxWorkers - The total number of workers / work slots available
   *    (e.g. maxWorkers is 4, then 2 tasks of cost 2 can run at a time, or 4 tasks of cost 1)
   * @prop {Logger} logger - The task manager logger.
   */
  constructor(opts) {
    _defineProperty(this, "maxWorkers", void 0);

    _defineProperty(this, "running", new Set());

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "run", tasks => {
      this.cancelExpiredTasks();
      return this.attemptToRun(tasks);
    });

    this.maxWorkers = opts.maxWorkers;
    this.logger = opts.logger;
  }
  /**
   * Gets how many workers are currently in use.
   */


  get occupiedWorkers() {
    return this.running.size;
  }
  /**
   * Gets how many workers are currently available.
   */


  get availableWorkers() {
    return this.maxWorkers - this.occupiedWorkers;
  }
  /**
   * Gets how many workers are currently available.
   */


  get hasAvailableWorkers() {
    return this.availableWorkers > 0;
  }
  /**
   * Attempts to run the specified list of tasks. Returns true if it was able
   * to start every task in the list, false if there was not enough capacity
   * to run every task.
   *
   * @param {TaskRunner[]} tasks
   * @returns {Promise<boolean>}
   */


  cancelRunningTasks() {
    this.logger.debug('Cancelling running tasks.');

    for (const task of this.running) {
      this.cancelTask(task);
    }
  }

  async attemptToRun(tasks) {
    const [tasksToRun, leftOverTasks] = partitionListByCount(tasks, this.availableWorkers);

    if (tasksToRun.length) {
      _perf_hooks.performance.mark('attemptToRun_start');

      await Promise.all(tasksToRun.map(async taskRunner => await taskRunner.markTaskAsRunning().then(hasTaskBeenMarkAsRunning => hasTaskBeenMarkAsRunning ? this.handleMarkAsRunning(taskRunner) : this.handleFailureOfMarkAsRunning(taskRunner, {
        name: 'TaskPoolVersionConflictError',
        message: VERSION_CONFLICT_MESSAGE
      })).catch(err => this.handleFailureOfMarkAsRunning(taskRunner, err))));

      _perf_hooks.performance.mark('attemptToRun_stop');

      _perf_hooks.performance.measure('taskPool.attemptToRun', 'attemptToRun_start', 'attemptToRun_stop');
    }

    if (leftOverTasks.length) {
      if (this.availableWorkers) {
        return this.attemptToRun(leftOverTasks);
      }

      return TaskPoolRunResult.RanOutOfCapacity;
    }

    return TaskPoolRunResult.RunningAllClaimedTasks;
  }

  handleMarkAsRunning(taskRunner) {
    this.running.add(taskRunner);
    taskRunner.run().catch(err => {
      // If a task Saved Object can't be found by an in flight task runner
      // we asssume the underlying task has been deleted while it was running
      // so we will log this as a debug, rather than a warn
      const errorLogLine = `Task ${taskRunner.toString()} failed in attempt to run: ${err.message}`;

      if ((0, _is_task_not_found_error.isTaskSavedObjectNotFoundError)(err, taskRunner.id)) {
        this.logger.debug(errorLogLine);
      } else {
        this.logger.warn(errorLogLine);
      }
    }).then(() => this.running.delete(taskRunner));
  }

  handleFailureOfMarkAsRunning(task, err) {
    this.logger.error(`Failed to mark Task ${task.toString()} as running: ${err.message}`);
  }

  cancelExpiredTasks() {
    for (const task of this.running) {
      if (task.isExpired) {
        this.logger.warn(`Cancelling task ${task.toString()} as it expired at ${task.expiration.toISOString()}${task.startedAt ? ` after running for ${durationAsString(_moment.default.duration((0, _moment.default)(new Date()).utc().diff(task.startedAt)))}` : ``}${task.definition.timeout ? ` (with timeout set at ${task.definition.timeout})` : ``}.`);
        this.cancelTask(task);
      }
    }
  }

  async cancelTask(task) {
    try {
      this.logger.debug(`Cancelling task ${task.toString()}.`);
      this.running.delete(task);
      await task.cancel();
    } catch (err) {
      this.logger.error(`Failed to cancel task ${task.toString()}: ${err}`);
    }
  }

}

exports.TaskPool = TaskPool;

function partitionListByCount(list, count) {
  const listInCount = list.splice(0, count);
  return [listInCount, list];
}

function durationAsString(duration) {
  const [m, s] = [duration.minutes(), duration.seconds()].map(value => (0, _lodash.padLeft)(`${value}`, 2, '0'));
  return `${m}m ${s}s`;
}