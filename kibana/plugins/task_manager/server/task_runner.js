"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskManagerRunner = void 0;

var _elasticApmNode = _interopRequireDefault(require("elastic-apm-node"));

var _perf_hooks = require("perf_hooks");

var _joi = _interopRequireDefault(require("joi"));

var _lodash = require("lodash");

var _result_type = require("./lib/result_type");

var _task_events = require("./task_events");

var _intervals = require("./lib/intervals");

var _task = require("./task");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultBackoffPerFailure = 5 * 60 * 1000;
const EMPTY_RUN_RESULT = {};

/**
 * Runs a background task, ensures that errors are properly handled,
 * allows for cancellation.
 *
 * @export
 * @class TaskManagerRunner
 * @implements {TaskRunner}
 */
class TaskManagerRunner {
  /**
   * Creates an instance of TaskManagerRunner.
   * @param {Opts} opts
   * @prop {Logger} logger - The task manager logger
   * @prop {TaskDefinition} definition - The definition of the task being run
   * @prop {ConcreteTaskInstance} instance - The record describing this particular task instance
   * @prop {Updatable} store - The store used to read / write tasks instance info
   * @prop {BeforeRunFunction} beforeRun - A function that adjusts the run context prior to running the task
   * @memberof TaskManagerRunner
   */
  constructor({
    instance,
    definitions,
    logger,
    store,
    beforeRun,
    beforeMarkRunning,
    onTaskEvent = _lodash.identity
  }) {
    _defineProperty(this, "task", void 0);

    _defineProperty(this, "instance", void 0);

    _defineProperty(this, "definitions", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "bufferedTaskStore", void 0);

    _defineProperty(this, "beforeRun", void 0);

    _defineProperty(this, "beforeMarkRunning", void 0);

    _defineProperty(this, "onTaskEvent", void 0);

    _defineProperty(this, "rescheduleFailedRun", failureResult => {
      if (this.shouldTryToScheduleRetry()) {
        const {
          runAt,
          state,
          error
        } = failureResult; // if we're retrying, keep the number of attempts

        const {
          schedule,
          attempts
        } = this.instance;

        if (runAt || schedule) {
          return (0, _result_type.asOk)({
            state,
            attempts,
            runAt
          });
        } else {
          // when result.error is truthy, then we're retrying because it failed
          const newRunAt = this.getRetryDelay({
            attempts,
            error
          });

          if (newRunAt) {
            return (0, _result_type.asOk)({
              state,
              attempts,
              runAt: newRunAt
            });
          }
        }
      } // scheduling a retry isn't possible,mark task as failed


      return (0, _result_type.asErr)({
        status: _task.TaskStatus.Failed
      });
    });

    this.instance = sanitizeInstance(instance);
    this.definitions = definitions;
    this.logger = logger;
    this.bufferedTaskStore = store;
    this.beforeRun = beforeRun;
    this.beforeMarkRunning = beforeMarkRunning;
    this.onTaskEvent = onTaskEvent;
  }
  /**
   * Gets the id of this task instance.
   */


  get id() {
    return this.instance.id;
  }
  /**
   * Gets the task type of this task instance.
   */


  get taskType() {
    return this.instance.taskType;
  }
  /**
   * Gets the task defintion from the dictionary.
   */


  get definition() {
    return this.definitions[this.taskType];
  }
  /**
   * Gets the time at which this task will expire.
   */


  get expiration() {
    return (0, _intervals.intervalFromDate)(this.instance.startedAt, this.definition.timeout);
  }
  /**
   * Gets the duration of the current task run
   */


  get startedAt() {
    return this.instance.startedAt;
  }
  /**
   * Gets whether or not this task has run longer than its expiration setting allows.
   */


  get isExpired() {
    return this.expiration < new Date();
  }
  /**
   * Returns a log-friendly representation of this task.
   */


  toString() {
    return `${this.taskType} "${this.id}"`;
  }
  /**
   * Runs the task, handling the task result, errors, etc, rescheduling if need
   * be. NOTE: the time of applying the middleware's beforeRun is incorporated
   * into the total timeout time the task in configured with. We may decide to
   * start the timer after beforeRun resolves
   *
   * @returns {Promise<Result<SuccessfulRunResult, FailedRunResult>>}
   */


  async run() {
    this.logger.debug(`Running task ${this}`);
    const modifiedContext = await this.beforeRun({
      taskInstance: this.instance
    });

    const apmTrans = _elasticApmNode.default.startTransaction(`taskManager run ${this.instance.taskType}`, 'taskManager');

    try {
      this.task = this.definition.createTaskRunner(modifiedContext);
      const result = await this.task.run();
      const validatedResult = this.validateResult(result);
      if (apmTrans) apmTrans.end('success');
      return this.processResult(validatedResult);
    } catch (err) {
      this.logger.error(`Task ${this} failed: ${err}`); // in error scenario, we can not get the RunResult
      // re-use modifiedContext's state, which is correct as of beforeRun

      if (apmTrans) apmTrans.end('error');
      return this.processResult((0, _result_type.asErr)({
        error: err,
        state: modifiedContext.taskInstance.state
      }));
    }
  }
  /**
   * Attempts to claim exclusive rights to run the task. If the attempt fails
   * with a 409 (http conflict), we assume another Kibana instance beat us to the punch.
   *
   * @returns {Promise<boolean>}
   */


  async markTaskAsRunning() {
    _perf_hooks.performance.mark('markTaskAsRunning_start');

    const apmTrans = _elasticApmNode.default.startTransaction(`taskManager markTaskAsRunning ${this.instance.taskType}`, 'taskManager');

    const VERSION_CONFLICT_STATUS = 409;
    const now = new Date();
    const {
      taskInstance
    } = await this.beforeMarkRunning({
      taskInstance: this.instance
    });
    const attempts = taskInstance.attempts + 1;
    const ownershipClaimedUntil = taskInstance.retryAt;

    try {
      const {
        id
      } = taskInstance;
      const timeUntilClaimExpires = howManyMsUntilOwnershipClaimExpires(ownershipClaimedUntil);

      if (timeUntilClaimExpires < 0) {
        this.logger.debug(`[Task Runner] Task ${id} started after ownership expired (${Math.abs(timeUntilClaimExpires)}ms after expiry)`);
      }

      this.instance = await this.bufferedTaskStore.update({ ...taskInstance,
        status: _task.TaskStatus.Running,
        startedAt: now,
        attempts,
        retryAt: this.instance.schedule ? (0, _intervals.intervalFromNow)(this.definition.timeout) : this.getRetryDelay({
          attempts,
          // Fake an error. This allows retry logic when tasks keep timing out
          // and lets us set a proper "retryAt" value each time.
          error: new Error('Task timeout'),
          addDuration: this.definition.timeout
        })
      });
      const timeUntilClaimExpiresAfterUpdate = howManyMsUntilOwnershipClaimExpires(ownershipClaimedUntil);

      if (timeUntilClaimExpiresAfterUpdate < 0) {
        this.logger.debug(`[Task Runner] Task ${id} ran after ownership expired (${Math.abs(timeUntilClaimExpiresAfterUpdate)}ms after expiry)`);
      }

      if (apmTrans) apmTrans.end('success');
      performanceStopMarkingTaskAsRunning();
      this.onTaskEvent((0, _task_events.asTaskMarkRunningEvent)(this.id, (0, _result_type.asOk)(this.instance)));
      return true;
    } catch (error) {
      if (apmTrans) apmTrans.end('failure');
      performanceStopMarkingTaskAsRunning();
      this.onTaskEvent((0, _task_events.asTaskMarkRunningEvent)(this.id, (0, _result_type.asErr)(error)));

      if (error.statusCode !== VERSION_CONFLICT_STATUS) {
        throw error;
      }
    }

    return false;
  }
  /**
   * Attempts to cancel the task.
   *
   * @returns {Promise<void>}
   */


  async cancel() {
    const {
      task
    } = this;

    if (task === null || task === void 0 ? void 0 : task.cancel) {
      this.task = undefined;
      return task.cancel();
    }

    this.logger.debug(`The task ${this} is not cancellable.`);
  }

  validateResult(result) {
    const {
      error
    } = _joi.default.validate(result, _task.validateRunResult);

    if (error) {
      this.logger.warn(`Invalid task result for ${this}: ${error.message}`);
      return (0, _result_type.asErr)({
        error: new Error(`Invalid task result for ${this}: ${error.message}`),
        state: {}
      });
    }

    if (!result) {
      return (0, _result_type.asOk)(EMPTY_RUN_RESULT);
    }

    return result.error ? (0, _result_type.asErr)({ ...result,
      error: result.error
    }) : (0, _result_type.asOk)(result);
  }

  shouldTryToScheduleRetry() {
    if (this.instance.schedule) {
      return true;
    }

    const maxAttempts = this.definition.maxAttempts || this.bufferedTaskStore.maxAttempts;
    return this.instance.attempts < maxAttempts;
  }

  async processResultForRecurringTask(result) {
    const fieldUpdates = (0, _lodash.flow)( // if running the task has failed ,try to correct by scheduling a retry in the near future
    (0, _result_type.mapErr)(this.rescheduleFailedRun), // if retrying is possible (new runAt) or this is an recurring task - reschedule
    (0, _result_type.mapOk)(({
      runAt,
      state,
      attempts = 0
    }) => {
      const {
        startedAt,
        schedule: {
          interval = undefined
        } = {}
      } = this.instance;
      return (0, _result_type.asOk)({
        runAt: runAt || (0, _intervals.intervalFromDate)(startedAt, interval),
        state,
        attempts,
        status: _task.TaskStatus.Idle
      });
    }), _result_type.unwrap)(result);
    await this.bufferedTaskStore.update((0, _lodash.defaults)({ ...fieldUpdates,
      // reset fields that track the lifecycle of the concluded `task run`
      startedAt: null,
      retryAt: null,
      ownerId: null
    }, this.instance));
  }

  async processResultWhenDone() {
    // not a recurring task: clean up by removing the task instance from store
    try {
      await this.bufferedTaskStore.remove(this.instance.id);
    } catch (err) {
      if (err.statusCode === 404) {
        this.logger.warn(`Task cleanup of ${this} failed in processing. Was remove called twice?`);
      } else {
        throw err;
      }
    }
  }

  async processResult(result) {
    await (0, _result_type.eitherAsync)(result, async ({
      runAt
    }) => {
      if (runAt || this.instance.schedule) {
        await this.processResultForRecurringTask(result);
      } else {
        await this.processResultWhenDone();
      }

      this.onTaskEvent((0, _task_events.asTaskRunEvent)(this.id, (0, _result_type.asOk)(this.instance)));
    }, async ({
      error
    }) => {
      await this.processResultForRecurringTask(result);
      this.onTaskEvent((0, _task_events.asTaskRunEvent)(this.id, (0, _result_type.asErr)(error)));
    });
    return result;
  }

  getRetryDelay({
    error,
    attempts,
    addDuration
  }) {
    let result = null; // Use custom retry logic, if any, otherwise we'll use the default logic

    const retry = this.definition.getRetry ? this.definition.getRetry(attempts, error) : true;

    if (retry instanceof Date) {
      result = retry;
    } else if (retry === true) {
      result = new Date(Date.now() + attempts * defaultBackoffPerFailure);
    } // Add a duration to the result


    if (addDuration && result) {
      result = (0, _intervals.intervalFromDate)(result, addDuration);
    }

    return result;
  }

}

exports.TaskManagerRunner = TaskManagerRunner;

function sanitizeInstance(instance) {
  return { ...instance,
    params: instance.params || {},
    state: instance.state || {}
  };
}

function howManyMsUntilOwnershipClaimExpires(ownershipClaimedUntil) {
  return ownershipClaimedUntil ? ownershipClaimedUntil.getTime() - Date.now() : 0;
}

function performanceStopMarkingTaskAsRunning() {
  _perf_hooks.performance.mark('markTaskAsRunning_stop');

  _perf_hooks.performance.measure('taskRunner.markTaskAsRunning', 'markTaskAsRunning_start', 'markTaskAsRunning_stop');
}