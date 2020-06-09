"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.claimAvailableTasks = claimAvailableTasks;
exports.awaitTaskRunResult = awaitTaskRunResult;
exports.TaskManager = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _perf_hooks = require("perf_hooks");

var _pipeable = require("fp-ts/lib/pipeable");

var _Option = require("fp-ts/lib/Option");

var _result_type = require("./lib/result_type");

var _task_events = require("./task_events");

var _fill_pool = require("./lib/fill_pool");

var _middleware = require("./lib/middleware");

var _sanitize_task_definitions = require("./lib/sanitize_task_definitions");

var _intervals = require("./lib/intervals");

var _task = require("./task");

var _task_poller = require("./task_poller");

var _task_pool = require("./task_pool");

var _task_runner = require("./task_runner");

var _task_store = require("./task_store");

var _identify_es_error = require("./lib/identify_es_error");

var _correct_deprecated_fields = require("./lib/correct_deprecated_fields");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const VERSION_CONFLICT_STATUS = 409;

/*
 * The TaskManager is the public interface into the task manager system. This glues together
 * all of the disparate modules in one integration point. The task manager operates in two different ways:
 *
 * - pre-init, it allows middleware registration, but disallows task manipulation
 * - post-init, it disallows middleware registration, but allows task manipulation
 *
 * Due to its complexity, this is mostly tested by integration tests (see readme).
 */

/**
 * The public interface into the task manager system.
 */
class TaskManager {
  // all task related events (task claimed, task marked as running, etc.) are emitted through events$
  // all on-demand requests we wish to pipe into the poller
  // the task poller that polls for work on fixed intervals and on demand
  // our subscription to the poller

  /**
   * Initializes the task manager, preventing any further addition of middleware,
   * enabling the task manipulation methods, and beginning the background polling
   * mechanism.
   */
  constructor(opts) {
    _defineProperty(this, "definitions", {});

    _defineProperty(this, "store", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "pool", void 0);

    _defineProperty(this, "events$", new _rxjs.Subject());

    _defineProperty(this, "claimRequests$", new _rxjs.Subject());

    _defineProperty(this, "poller$", void 0);

    _defineProperty(this, "pollingSubscription", _rxjs.Subscription.EMPTY);

    _defineProperty(this, "startQueue", []);

    _defineProperty(this, "middleware", {
      beforeSave: async saveOpts => saveOpts,
      beforeRun: async runOpts => runOpts,
      beforeMarkRunning: async runOpts => runOpts
    });

    _defineProperty(this, "emitEvent", event => {
      this.events$.next(event);
    });

    _defineProperty(this, "createTaskRunnerForTask", instance => {
      return new _task_runner.TaskManagerRunner({
        logger: this.logger,
        instance,
        store: this.store,
        definitions: this.definitions,
        beforeRun: this.middleware.beforeRun,
        beforeMarkRunning: this.middleware.beforeMarkRunning,
        onTaskEvent: this.emitEvent
      });
    });

    _defineProperty(this, "pollForWork", async (...tasksToClaim) => {
      return (0, _fill_pool.fillPool)( // claim available tasks
      () => claimAvailableTasks(tasksToClaim.splice(0, this.pool.availableWorkers), this.store.claimAvailableTasks, this.pool.availableWorkers, this.logger), // wrap each task in a Task Runner
      this.createTaskRunnerForTask, // place tasks in the Task Pool
      async tasks => await this.pool.run(tasks));
    });

    this.logger = opts.logger;
    const {
      taskManagerId
    } = opts;

    if (!taskManagerId) {
      this.logger.error(`TaskManager is unable to start as there the Kibana UUID is invalid (value of the "server.uuid" configuration is ${taskManagerId})`);
      throw new Error(`TaskManager is unable to start as Kibana has no valid UUID assigned to it.`);
    } else {
      this.logger.info(`TaskManager is identified by the Kibana UUID: ${taskManagerId}`);
    }

    this.store = new _task_store.TaskStore({
      serializer: opts.serializer,
      savedObjectsRepository: opts.savedObjectsRepository,
      callCluster: opts.callAsInternalUser,
      index: opts.config.index,
      maxAttempts: opts.config.max_attempts,
      definitions: this.definitions,
      taskManagerId: `kibana:${taskManagerId}`
    }); // pipe store events into the TaskManager's event stream

    this.store.events.subscribe(event => this.events$.next(event));
    this.pool = new _task_pool.TaskPool({
      logger: this.logger,
      maxWorkers: opts.config.max_workers
    });
    this.poller$ = (0, _task_poller.createTaskPoller)({
      pollInterval: opts.config.poll_interval,
      bufferCapacity: opts.config.request_capacity,
      getCapacity: () => this.pool.availableWorkers,
      pollRequests$: this.claimRequests$,
      work: this.pollForWork
    });
  }

  attemptToRun(task = _Option.none) {
    this.claimRequests$.next(task);
  }

  get isStarted() {
    return !this.pollingSubscription.closed;
  }

  /**
   * Starts up the task manager and starts picking up tasks.
   */
  start() {
    if (!this.isStarted) {
      // Some calls are waiting until task manager is started
      this.startQueue.forEach(fn => fn());
      this.startQueue = [];
      this.pollingSubscription = this.poller$.subscribe((0, _result_type.mapErr)(error => {
        if (error.type === _task_poller.PollingErrorType.RequestCapacityReached) {
          (0, _pipeable.pipe)(error.data, (0, _Option.map)(id => this.emitEvent((0, _task_events.asTaskRunRequestEvent)(id, (0, _result_type.asErr)(error)))));
        }

        this.logger.error(error.message);
      }));
    }
  }

  async waitUntilStarted() {
    if (!this.isStarted) {
      await new Promise(resolve => {
        this.startQueue.push(resolve);
      });
    }
  }
  /**
   * Stops the task manager and cancels running tasks.
   */


  stop() {
    if (this.isStarted) {
      this.pollingSubscription.unsubscribe();
      this.pool.cancelRunningTasks();
    }
  }
  /**
   * Method for allowing consumers to register task definitions into the system.
   * @param taskDefinitions - The Kibana task definitions dictionary
   */


  registerTaskDefinitions(taskDefinitions) {
    this.assertUninitialized('register task definitions');
    const duplicate = Object.keys(taskDefinitions).find(k => !!this.definitions[k]);

    if (duplicate) {
      throw new Error(`Task ${duplicate} is already defined!`);
    }

    try {
      const sanitized = (0, _sanitize_task_definitions.sanitizeTaskDefinitions)(taskDefinitions);
      Object.assign(this.definitions, sanitized);
    } catch (e) {
      this.logger.error('Could not sanitize task definitions');
    }
  }
  /**
   * Adds middleware to the task manager, such as adding security layers, loggers, etc.
   *
   * @param {Middleware} middleware - The middlware being added.
   */


  addMiddleware(middleware) {
    this.assertUninitialized('add middleware');
    const prevMiddleWare = this.middleware;
    this.middleware = (0, _middleware.addMiddlewareToChain)(prevMiddleWare, middleware);
  }
  /**
   * Schedules a task.
   *
   * @param task - The task being scheduled.
   * @returns {Promise<ConcreteTaskInstance>}
   */


  async schedule(taskInstance, options) {
    await this.waitUntilStarted();
    const {
      taskInstance: modifiedTask
    } = await this.middleware.beforeSave({ ...options,
      taskInstance: (0, _correct_deprecated_fields.ensureDeprecatedFieldsAreCorrected)(taskInstance, this.logger)
    });
    const result = await this.store.schedule(modifiedTask);
    this.attemptToRun();
    return result;
  }
  /**
   * Run  task.
   *
   * @param taskId - The task being scheduled.
   * @returns {Promise<ConcreteTaskInstance>}
   */


  async runNow(taskId) {
    await this.waitUntilStarted();
    return new Promise(async (resolve, reject) => {
      awaitTaskRunResult(taskId, this.events$, this.store.getLifecycle.bind(this.store)).then(resolve).catch(reject);
      this.attemptToRun((0, _Option.some)(taskId));
    });
  }
  /**
   * Schedules a task with an Id
   *
   * @param task - The task being scheduled.
   * @returns {Promise<TaskInstanceWithId>}
   */


  async ensureScheduled(taskInstance, options) {
    try {
      return await this.schedule(taskInstance, options);
    } catch (err) {
      if (err.statusCode === VERSION_CONFLICT_STATUS) {
        return taskInstance;
      }

      throw err;
    }
  }
  /**
   * Fetches a list of scheduled tasks.
   *
   * @param opts - The query options used to filter tasks
   * @returns {Promise<FetchResult>}
   */


  async fetch(opts) {
    await this.waitUntilStarted();
    return this.store.fetch(opts);
  }
  /**
   * Get the current state of a specified task.
   *
   * @param {string} id
   * @returns {Promise<RemoveResult>}
   */


  async get(id) {
    await this.waitUntilStarted();
    return this.store.get(id);
  }
  /**
   * Removes the specified task from the index.
   *
   * @param {string} id
   * @returns {Promise<RemoveResult>}
   */


  async remove(id) {
    await this.waitUntilStarted();
    return this.store.remove(id);
  }
  /**
   * Ensures task manager IS NOT already initialized
   *
   * @param {string} message shown if task manager is already initialized
   * @returns void
   */


  assertUninitialized(message) {
    if (this.isStarted) {
      throw new Error(`Cannot ${message} after the task manager is initialized!`);
    }
  }

}

exports.TaskManager = TaskManager;

async function claimAvailableTasks(claimTasksById, claim, availableWorkers, logger) {
  if (availableWorkers > 0) {
    _perf_hooks.performance.mark('claimAvailableTasks_start');

    try {
      const {
        docs,
        claimedTasks
      } = await claim({
        size: availableWorkers,
        claimOwnershipUntil: (0, _intervals.intervalFromNow)('30s'),
        claimTasksById
      });

      if (claimedTasks === 0) {
        _perf_hooks.performance.mark('claimAvailableTasks.noTasks');
      }

      _perf_hooks.performance.mark('claimAvailableTasks_stop');

      _perf_hooks.performance.measure('claimAvailableTasks', 'claimAvailableTasks_start', 'claimAvailableTasks_stop');

      if (docs.length !== claimedTasks) {
        logger.warn(`[Task Ownership error]: (${claimedTasks}) tasks were claimed by Kibana, but (${docs.length}) tasks were fetched`);
      }

      return docs;
    } catch (ex) {
      if ((0, _identify_es_error.identifyEsError)(ex).includes('cannot execute [inline] scripts')) {
        logger.warn(`Task Manager cannot operate when inline scripts are disabled in Elasticsearch`);
      } else {
        throw ex;
      }
    }
  } else {
    _perf_hooks.performance.mark('claimAvailableTasks.noAvailableWorkers');

    logger.debug(`[Task Ownership]: Task Manager has skipped Claiming Ownership of available tasks at it has ran out Available Workers.`);
  }

  return [];
}

async function awaitTaskRunResult(taskId, events$, getLifecycle) {
  return new Promise((resolve, reject) => {
    const subscription = events$ // listen for all events related to the current task
    .pipe((0, _operators.filter)(({
      id
    }) => id === taskId)).subscribe(taskEvent => {
      (0, _result_type.either)(taskEvent.event, taskInstance => {
        // resolve if the task has run sucessfully
        if ((0, _task_events.isTaskRunEvent)(taskEvent)) {
          subscription.unsubscribe();
          resolve({
            id: taskInstance.id
          });
        }
      }, async error => {
        // reject if any error event takes place for the requested task
        subscription.unsubscribe();

        if ((0, _task_events.isTaskRunRequestEvent)(taskEvent)) {
          return reject(new Error(`Failed to run task "${taskId}" as Task Manager is at capacity, please try again later`));
        } else if ((0, _task_events.isTaskClaimEvent)(taskEvent)) {
          reject((0, _result_type.map)(( // if the error happened in the Claim phase - we try to provide better insight
          // into why we failed to claim by getting the task's current lifecycle status
          await (0, _result_type.promiseResult)(getLifecycle(taskId))), taskLifecycleStatus => {
            if (taskLifecycleStatus === _task.TaskLifecycleResult.NotFound) {
              return new Error(`Failed to run task "${taskId}" as it does not exist`);
            } else if (taskLifecycleStatus === _task.TaskStatus.Running || taskLifecycleStatus === _task.TaskStatus.Claiming) {
              return new Error(`Failed to run task "${taskId}" as it is currently running`);
            }

            return error;
          }, () => error));
        }

        return reject(error);
      });
    });
  });
}