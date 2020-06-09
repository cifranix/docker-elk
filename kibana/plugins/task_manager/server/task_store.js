"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedObjectToConcreteTaskInstance = savedObjectToConcreteTaskInstance;
exports.TaskStore = void 0;

var _elasticApmNode = _interopRequireDefault(require("elastic-apm-node"));

var _rxjs = require("rxjs");

var _lodash = require("lodash");

var _result_type = require("./lib/result_type");

var _task = require("./task");

var _task_events = require("./task_events");

var _query_clauses = require("./queries/query_clauses");

var _mark_available_tasks_as_claimed = require("./queries/mark_available_tasks_as_claimed");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Wraps an elasticsearch connection and provides a task manager-specific
 * interface into the index.
 */
class TaskStore {
  /**
   * Constructs a new TaskStore.
   * @param {StoreOpts} opts
   * @prop {CallCluster} callCluster - The elastic search connection
   * @prop {string} index - The name of the task manager index
   * @prop {number} maxAttempts - The maximum number of attempts before a task will be abandoned
   * @prop {TaskDefinition} definition - The definition of the task being run
   * @prop {serializer} - The saved object serializer
   * @prop {savedObjectsRepository} - An instance to the saved objects repository
   */
  constructor(opts) {
    _defineProperty(this, "maxAttempts", void 0);

    _defineProperty(this, "index", void 0);

    _defineProperty(this, "taskManagerId", void 0);

    _defineProperty(this, "callCluster", void 0);

    _defineProperty(this, "definitions", void 0);

    _defineProperty(this, "savedObjectsRepository", void 0);

    _defineProperty(this, "serializer", void 0);

    _defineProperty(this, "events$", void 0);

    _defineProperty(this, "emitEvents", events => {
      events.forEach(event => this.events$.next(event));
    });

    _defineProperty(this, "claimAvailableTasks", async ({
      claimOwnershipUntil,
      claimTasksById = [],
      size
    }) => {
      const claimTasksByIdWithRawIds = claimTasksById.map(id => this.serializer.generateRawId(undefined, 'task', id));
      const numberOfTasksClaimed = await this.markAvailableTasksAsClaimed(claimOwnershipUntil, claimTasksByIdWithRawIds, size);
      const docs = numberOfTasksClaimed > 0 ? await this.sweepForClaimedTasks(claimTasksByIdWithRawIds, size) : []; // emit success/fail events for claimed tasks by id

      if (claimTasksById && claimTasksById.length) {
        this.emitEvents(docs.map(doc => (0, _task_events.asTaskClaimEvent)(doc.id, (0, _result_type.asOk)(doc))));
        this.emitEvents((0, _lodash.difference)(claimTasksById, docs.map(doc => doc.id)).map(id => (0, _task_events.asTaskClaimEvent)(id, (0, _result_type.asErr)(new Error(`failed to claim task '${id}'`)))));
      }

      return {
        claimedTasks: numberOfTasksClaimed,
        docs
      };
    });

    this.callCluster = opts.callCluster;
    this.index = opts.index;
    this.taskManagerId = opts.taskManagerId;
    this.maxAttempts = opts.maxAttempts;
    this.definitions = opts.definitions;
    this.serializer = opts.serializer;
    this.savedObjectsRepository = opts.savedObjectsRepository;
    this.events$ = new _rxjs.Subject();
  }

  get events() {
    return this.events$;
  }

  /**
   * Schedules a task.
   *
   * @param task - The task being scheduled.
   */
  async schedule(taskInstance) {
    if (!this.definitions[taskInstance.taskType]) {
      throw new Error(`Unsupported task type "${taskInstance.taskType}". Supported types are ${Object.keys(this.definitions).join(', ')}`);
    }

    const savedObject = await this.savedObjectsRepository.create('task', taskInstanceToAttributes(taskInstance), {
      id: taskInstance.id,
      refresh: false
    });
    return savedObjectToConcreteTaskInstance(savedObject);
  }
  /**
   * Fetches a list of scheduled tasks with default sorting.
   *
   * @param opts - The query options used to filter tasks
   */


  async fetch({
    sort = [{
      'task.runAt': 'asc'
    }],
    ...opts
  } = {}) {
    return this.search({ ...opts,
      sort
    });
  }
  /**
   * Claims available tasks from the index, which are ready to be run.
   * - runAt is now or past
   * - is not currently claimed by any instance of Kibana
   * - has a type that is in our task definitions
   *
   * @param {OwnershipClaimingOpts} options
   * @returns {Promise<ClaimOwnershipResult>}
   */


  async markAvailableTasksAsClaimed(claimOwnershipUntil, claimTasksById, size) {
    const queryForScheduledTasks = (0, _query_clauses.mustBeAllOf)( // Either a task with idle status and runAt <= now or
    // status running or claiming with a retryAt <= now.
    (0, _query_clauses.shouldBeOneOf)(_mark_available_tasks_as_claimed.IdleTaskWithExpiredRunAt, _mark_available_tasks_as_claimed.RunningOrClaimingTaskWithExpiredRetryAt), // Either task has a schedule or the attempts < the maximum configured
    (0, _query_clauses.shouldBeOneOf)(_mark_available_tasks_as_claimed.TaskWithSchedule, ...Object.entries(this.definitions).map(([type, {
      maxAttempts
    }]) => (0, _mark_available_tasks_as_claimed.taskWithLessThanMaxAttempts)(type, maxAttempts || this.maxAttempts))));

    const apmTrans = _elasticApmNode.default.startTransaction(`taskManager markAvailableTasksAsClaimed`, 'taskManager');

    const {
      updated
    } = await this.updateByQuery((0, _query_clauses.asUpdateByQuery)({
      query: (0, _query_clauses.matchesClauses)((0, _query_clauses.mustBeAllOf)(claimTasksById && claimTasksById.length ? (0, _query_clauses.asPinnedQuery)(claimTasksById, queryForScheduledTasks) : queryForScheduledTasks), (0, _query_clauses.filterDownBy)(_mark_available_tasks_as_claimed.InactiveTasks)),
      update: (0, _mark_available_tasks_as_claimed.updateFields)({
        ownerId: this.taskManagerId,
        status: 'claiming',
        retryAt: claimOwnershipUntil
      }),
      sort: [// sort by score first, so the "pinned" Tasks are first
      '_score', // the nsort by other fields
      _mark_available_tasks_as_claimed.SortByRunAtAndRetryAt]
    }), {
      max_docs: size
    });
    if (apmTrans) apmTrans.end();
    return updated;
  }
  /**
   * Fetches tasks from the index, which are owned by the current Kibana instance
   */


  async sweepForClaimedTasks(claimTasksById, size) {
    const claimedTasksQuery = (0, _mark_available_tasks_as_claimed.tasksClaimedByOwner)(this.taskManagerId);
    const {
      docs
    } = await this.search({
      query: claimTasksById && claimTasksById.length ? (0, _query_clauses.asPinnedQuery)(claimTasksById, claimedTasksQuery) : claimedTasksQuery,
      size,
      sort: _mark_available_tasks_as_claimed.SortByRunAtAndRetryAt,
      seq_no_primary_term: true
    });
    return docs;
  }
  /**
   * Updates the specified doc in the index, returning the doc
   * with its version up to date.
   *
   * @param {TaskDoc} doc
   * @returns {Promise<TaskDoc>}
   */


  async update(doc) {
    const updatedSavedObject = await this.savedObjectsRepository.update('task', doc.id, taskInstanceToAttributes(doc), {
      refresh: false,
      version: doc.version
    });
    return savedObjectToConcreteTaskInstance(updatedSavedObject);
  }
  /**
   * Removes the specified task from the index.
   *
   * @param {string} id
   * @returns {Promise<void>}
   */


  async remove(id) {
    await this.savedObjectsRepository.delete('task', id);
  }
  /**
   * Gets a task by id
   *
   * @param {string} id
   * @returns {Promise<void>}
   */


  async get(id) {
    return savedObjectToConcreteTaskInstance((await this.savedObjectsRepository.get('task', id)));
  }
  /**
   * Gets task lifecycle step by id
   *
   * @param {string} id
   * @returns {Promise<void>}
   */


  async getLifecycle(id) {
    try {
      const task = await this.get(id);
      return task.status;
    } catch (err) {
      if (err.output && err.output.statusCode === 404) {
        return _task.TaskLifecycleResult.NotFound;
      }

      throw err;
    }
  }

  async search(opts = {}) {
    const {
      query
    } = ensureQueryOnlyReturnsTaskObjects(opts);
    const result = await this.callCluster('search', {
      index: this.index,
      ignoreUnavailable: true,
      body: { ...opts,
        query
      }
    });
    const rawDocs = result.hits.hits;
    return {
      docs: rawDocs.map(doc => this.serializer.rawToSavedObject(doc)).map(doc => (0, _lodash.omit)(doc, 'namespace')).map(savedObjectToConcreteTaskInstance)
    };
  }

  async updateByQuery(opts = {}, {
    max_docs
  } = {}) {
    const {
      query
    } = ensureQueryOnlyReturnsTaskObjects(opts);
    const result = await this.callCluster('updateByQuery', {
      index: this.index,
      ignoreUnavailable: true,
      refresh: true,
      max_docs,
      conflicts: 'proceed',
      body: { ...opts,
        query
      }
    });
    const {
      total,
      updated,
      version_conflicts
    } = result;
    return {
      total,
      updated,
      version_conflicts
    };
  }

}

exports.TaskStore = TaskStore;

function taskInstanceToAttributes(doc) {
  return { ...(0, _lodash.omit)(doc, 'id', 'version'),
    params: JSON.stringify(doc.params || {}),
    state: JSON.stringify(doc.state || {}),
    attempts: doc.attempts || 0,
    scheduledAt: (doc.scheduledAt || new Date()).toISOString(),
    startedAt: doc.startedAt && doc.startedAt.toISOString() || null,
    retryAt: doc.retryAt && doc.retryAt.toISOString() || null,
    runAt: (doc.runAt || new Date()).toISOString(),
    status: doc.status || 'idle'
  };
}

function savedObjectToConcreteTaskInstance( // TODO: define saved object type
savedObject) {
  return { ...savedObject.attributes,
    id: savedObject.id,
    version: savedObject.version,
    scheduledAt: new Date(savedObject.attributes.scheduledAt),
    runAt: new Date(savedObject.attributes.runAt),
    startedAt: savedObject.attributes.startedAt && new Date(savedObject.attributes.startedAt),
    retryAt: savedObject.attributes.retryAt && new Date(savedObject.attributes.retryAt),
    state: parseJSONField(savedObject.attributes.state, 'state', savedObject.id),
    params: parseJSONField(savedObject.attributes.params, 'params', savedObject.id)
  };
}

function parseJSONField(json, fieldName, id) {
  try {
    return json ? JSON.parse(json) : {};
  } catch (error) {
    throw new Error(`Task "${id}"'s ${fieldName} field has invalid JSON: ${json}`);
  }
}

function ensureQueryOnlyReturnsTaskObjects(opts) {
  const originalQuery = opts.query;
  const queryOnlyTasks = {
    term: {
      type: 'task'
    }
  };
  const query = originalQuery ? {
    bool: {
      must: [queryOnlyTasks, originalQuery]
    }
  } : queryOnlyTasks;
  return { ...opts,
    query
  };
}