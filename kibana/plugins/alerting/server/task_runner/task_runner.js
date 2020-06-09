"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskRunner = void 0;

var _lodash = require("lodash");

var _create_execution_handler = require("./create_execution_handler");

var _alert_instance = require("../alert_instance");

var _get_next_run_at = require("./get_next_run_at");

var _lib = require("../lib");

var _result_type = require("../lib/result_type");

var _alert_task_instance = require("./alert_task_instance");

var _is_alert_not_found_error = require("../lib/is_alert_not_found_error");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const FALLBACK_RETRY_INTERVAL = {
  interval: '5m'
};

class TaskRunner {
  constructor(alertType, taskInstance, context) {
    _defineProperty(this, "context", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "taskInstance", void 0);

    _defineProperty(this, "alertType", void 0);

    this.context = context;
    this.logger = context.logger;
    this.alertType = alertType;
    this.taskInstance = (0, _alert_task_instance.taskInstanceToAlertTaskInstance)(taskInstance);
  }

  async getApiKeyForAlertPermissions(alertId, spaceId) {
    const namespace = this.context.spaceIdToNamespace(spaceId); // Only fetch encrypted attributes here, we'll create a saved objects client
    // scoped with the API key to fetch the remaining data.

    const {
      attributes: {
        apiKey
      }
    } = await this.context.encryptedSavedObjectsPlugin.getDecryptedAsInternalUser('alert', alertId, {
      namespace
    });
    return apiKey;
  }

  async getServicesWithSpaceLevelPermissions(spaceId, apiKey) {
    const requestHeaders = {};

    if (apiKey) {
      requestHeaders.authorization = `ApiKey ${apiKey}`;
    }

    const fakeRequest = {
      headers: requestHeaders,
      getBasePath: () => this.context.getBasePath(spaceId),
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
    return this.context.getServices(fakeRequest);
  }

  getExecutionHandler(alertId, alertName, tags, spaceId, apiKey, actions, references) {
    // Inject ids into actions
    const actionsWithIds = actions.map(action => {
      const actionReference = references.find(obj => obj.name === action.actionRef);

      if (!actionReference) {
        throw new Error(`Action reference "${action.actionRef}" not found in alert id: ${alertId}`);
      }

      return { ...action,
        id: actionReference.id
      };
    });
    return (0, _create_execution_handler.createExecutionHandler)({
      alertId,
      alertName,
      tags,
      logger: this.logger,
      actionsPlugin: this.context.actionsPlugin,
      apiKey,
      actions: actionsWithIds,
      spaceId,
      alertType: this.alertType
    });
  }

  async executeAlertInstance(alertInstanceId, alertInstance, executionHandler) {
    const {
      actionGroup,
      context,
      state
    } = alertInstance.getScheduledActionOptions();
    alertInstance.updateLastScheduledActions(actionGroup);
    alertInstance.unscheduleActions();
    return executionHandler({
      actionGroup,
      context,
      state,
      alertInstanceId
    });
  }

  async executeAlertInstances(services, alertInfoParams, executionHandler, spaceId) {
    const {
      params,
      throttle,
      muteAll,
      mutedInstanceIds,
      name,
      tags,
      createdBy,
      updatedBy
    } = alertInfoParams;
    const {
      params: {
        alertId
      },
      state: {
        alertInstances: alertRawInstances = {},
        alertTypeState = {},
        previousStartedAt
      }
    } = this.taskInstance;
    const namespace = this.context.spaceIdToNamespace(spaceId);
    const alertInstances = (0, _lodash.mapValues)(alertRawInstances, rawAlertInstance => new _alert_instance.AlertInstance(rawAlertInstance));
    const updatedAlertTypeState = await this.alertType.executor({
      alertId,
      services: { ...services,
        alertInstanceFactory: (0, _alert_instance.createAlertInstanceFactory)(alertInstances)
      },
      params,
      state: alertTypeState,
      startedAt: this.taskInstance.startedAt,
      previousStartedAt: previousStartedAt ? new Date(previousStartedAt) : null,
      spaceId,
      namespace,
      name,
      tags,
      createdBy,
      updatedBy
    }); // Cleanup alert instances that are no longer scheduling actions to avoid over populating the alertInstances object

    const instancesWithScheduledActions = (0, _lodash.pick)(alertInstances, alertInstance => alertInstance.hasScheduledActions());

    if (!muteAll) {
      const enabledAlertInstances = (0, _lodash.omit)(instancesWithScheduledActions, ...mutedInstanceIds);
      await Promise.all(Object.entries(enabledAlertInstances).filter(([, alertInstance]) => !alertInstance.isThrottled(throttle)).map(([id, alertInstance]) => this.executeAlertInstance(id, alertInstance, executionHandler)));
    }

    return {
      alertTypeState: updatedAlertTypeState || undefined,
      alertInstances: (0, _lodash.mapValues)(instancesWithScheduledActions, alertInstance => alertInstance.toRaw())
    };
  }

  async validateAndExecuteAlert(services, apiKey, attributes, references) {
    const {
      params: {
        alertId,
        spaceId
      }
    } = this.taskInstance; // Validate

    const params = (0, _lib.validateAlertTypeParams)(this.alertType, attributes.params);
    const executionHandler = this.getExecutionHandler(alertId, attributes.name, attributes.tags, spaceId, apiKey, attributes.actions, references);
    return this.executeAlertInstances(services, { ...attributes,
      params
    }, executionHandler, spaceId);
  }

  async loadAlertAttributesAndRun() {
    const {
      params: {
        alertId,
        spaceId
      }
    } = this.taskInstance;
    const apiKey = await this.getApiKeyForAlertPermissions(alertId, spaceId);
    const services = await this.getServicesWithSpaceLevelPermissions(spaceId, apiKey); // Ensure API key is still valid and user has access

    const {
      attributes,
      references
    } = await services.savedObjectsClient.get('alert', alertId);
    return {
      state: await (0, _result_type.promiseResult)(this.validateAndExecuteAlert(services, apiKey, attributes, references)),
      runAt: (0, _result_type.asOk)((0, _get_next_run_at.getNextRunAt)(new Date(this.taskInstance.startedAt), // we do not currently have a good way of returning the type
      // from SavedObjectsClient, and as we currenrtly require a schedule
      // and we only support `interval`, we can cast this safely
      attributes.schedule))
    };
  }

  async run() {
    const {
      params: {
        alertId
      },
      startedAt: previousStartedAt,
      state: originalState
    } = this.taskInstance;
    const {
      state,
      runAt
    } = await errorAsAlertTaskRunResult(this.loadAlertAttributesAndRun());
    return {
      state: (0, _result_type.map)(state, stateUpdates => {
        return { ...stateUpdates,
          previousStartedAt
        };
      }, err => {
        const message = `Executing Alert "${alertId}" has resulted in Error: ${err.message}`;

        if ((0, _is_alert_not_found_error.isAlertSavedObjectNotFoundError)(err, alertId)) {
          this.logger.debug(message);
        } else {
          this.logger.error(message);
        }

        return { ...originalState,
          previousStartedAt
        };
      }),
      runAt: (0, _result_type.resolveErr)(runAt, err => {
        return (0, _is_alert_not_found_error.isAlertSavedObjectNotFoundError)(err, alertId) ? undefined : (0, _get_next_run_at.getNextRunAt)(new Date(), // if we fail at this point we wish to recover but don't have access to the Alert's
        // attributes, so we'll use a default interval to prevent the underlying task from
        // falling into a failed state
        FALLBACK_RETRY_INTERVAL);
      })
    };
  }

}
/**
 * If an error is thrown, wrap it in an AlertTaskRunResult
 * so that we can treat each field independantly
 */


exports.TaskRunner = TaskRunner;

async function errorAsAlertTaskRunResult(future) {
  try {
    return await future;
  } catch (e) {
    return {
      state: (0, _result_type.asErr)(e),
      runAt: (0, _result_type.asErr)(e)
    };
  }
}