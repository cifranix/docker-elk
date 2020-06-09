"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskRunnerFactory = void 0;

var _executor_error = require("./executor_error");

var _errors = require("./errors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TaskRunnerFactory {
  constructor(actionExecutor) {
    _defineProperty(this, "isInitialized", false);

    _defineProperty(this, "taskRunnerContext", void 0);

    _defineProperty(this, "actionExecutor", void 0);

    this.actionExecutor = actionExecutor;
  }

  initialize(taskRunnerContext) {
    if (this.isInitialized) {
      throw new Error('TaskRunnerFactory already initialized');
    }

    this.isInitialized = true;
    this.taskRunnerContext = taskRunnerContext;
  }

  create({
    taskInstance
  }) {
    if (!this.isInitialized) {
      throw new Error('TaskRunnerFactory not initialized');
    }

    const {
      actionExecutor
    } = this;
    const {
      logger,
      encryptedSavedObjectsPlugin,
      spaceIdToNamespace,
      getBasePath,
      getScopedSavedObjectsClient
    } = this.taskRunnerContext;
    return {
      async run() {
        const {
          spaceId,
          actionTaskParamsId
        } = taskInstance.params;
        const namespace = spaceIdToNamespace(spaceId);
        const {
          attributes: {
            actionId,
            params,
            apiKey
          }
        } = await encryptedSavedObjectsPlugin.getDecryptedAsInternalUser('action_task_params', actionTaskParamsId, {
          namespace
        });
        const requestHeaders = {};

        if (apiKey) {
          requestHeaders.authorization = `ApiKey ${apiKey}`;
        } // Since we're using API keys and accessing elasticsearch can only be done
        // via a request, we're faking one with the proper authorization headers.


        const fakeRequest = {
          headers: requestHeaders,
          getBasePath: () => getBasePath(spaceId),
          path: '/',
          route: {
            settings: {}
          },
          url: {
            href: '/'
          },
          raw: {
            req: {
              url: '/'
            }
          }
        };
        let executorResult;

        try {
          executorResult = await actionExecutor.execute({
            params,
            actionId,
            request: fakeRequest
          });
        } catch (e) {
          if (e instanceof _errors.ActionTypeDisabledError) {
            // We'll stop re-trying due to action being forbidden
            throw new _executor_error.ExecutorError(e.message, {}, false);
          }

          throw e;
        }

        if (executorResult.status === 'error') {
          // Task manager error handler only kicks in when an error thrown (at this time)
          // So what we have to do is throw when the return status is `error`.
          throw new _executor_error.ExecutorError(executorResult.message, executorResult.data, executorResult.retry == null ? false : executorResult.retry);
        } // Cleanup action_task_params object now that we're done with it


        try {
          const savedObjectsClient = getScopedSavedObjectsClient(fakeRequest);
          await savedObjectsClient.delete('action_task_params', actionTaskParamsId);
        } catch (e) {
          // Log error only, we shouldn't fail the task because of an error here (if ever there's retry logic)
          logger.error(`Failed to cleanup action_task_params object [id="${actionTaskParamsId}"]: ${e.message}`);
        }
      }

    };
  }

}

exports.TaskRunnerFactory = TaskRunnerFactory;