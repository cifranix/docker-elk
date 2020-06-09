"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskManagerPlugin = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _lodash = require("lodash");

var _create_task_manager = require("./create_task_manager");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TaskManagerPlugin {
  constructor(initContext) {
    this.initContext = initContext;

    _defineProperty(this, "legacyTaskManager$", new _rxjs.Subject());

    _defineProperty(this, "taskManager", this.legacyTaskManager$.pipe((0, _operators.first)()).toPromise());

    _defineProperty(this, "currentConfig", void 0);

    this.initContext = initContext;
    this.currentConfig = {};
  }

  setup(core, plugins) {
    const logger = this.initContext.logger.get('taskManager');
    const config$ = this.initContext.config.create();
    const elasticsearch = core.elasticsearch.adminClient;
    return {
      registerLegacyAPI: (0, _lodash.once)(__LEGACY => {
        config$.subscribe(async config => {
          const [{
            savedObjects
          }] = await core.getStartServices();
          const savedObjectsRepository = savedObjects.createInternalRepository(['task']);
          this.legacyTaskManager$.next((0, _create_task_manager.createTaskManager)(core, {
            logger,
            config,
            elasticsearch,
            savedObjectsRepository,
            savedObjectsSerializer: savedObjects.createSerializer()
          }));
          this.legacyTaskManager$.complete();
        });
        return this.taskManager;
      }),
      addMiddleware: middleware => {
        this.taskManager.then(tm => tm.addMiddleware(middleware));
      },
      registerTaskDefinitions: taskDefinition => {
        this.taskManager.then(tm => tm.registerTaskDefinitions(taskDefinition));
      }
    };
  }

  start() {
    return {
      fetch: (...args) => this.taskManager.then(tm => tm.fetch(...args)),
      get: (...args) => this.taskManager.then(tm => tm.get(...args)),
      remove: (...args) => this.taskManager.then(tm => tm.remove(...args)),
      schedule: (...args) => this.taskManager.then(tm => tm.schedule(...args)),
      runNow: (...args) => this.taskManager.then(tm => tm.runNow(...args)),
      ensureScheduled: (...args) => this.taskManager.then(tm => tm.ensureScheduled(...args))
    };
  }

  stop() {
    this.taskManager.then(tm => {
      tm.stop();
    });
  }

}

exports.TaskManagerPlugin = TaskManagerPlugin;