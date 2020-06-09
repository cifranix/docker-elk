"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertsClient = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _lib = require("./lib");

var _alert_task_instance = require("./task_runner/alert_task_instance");

var _delete_task_if_it_exists = require("./lib/delete_task_if_it_exists");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AlertsClient {
  constructor({
    alertTypeRegistry,
    savedObjectsClient,
    taskManager,
    logger,
    spaceId,
    namespace,
    getUserName,
    createAPIKey,
    invalidateAPIKey,
    encryptedSavedObjectsPlugin
  }) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "getUserName", void 0);

    _defineProperty(this, "spaceId", void 0);

    _defineProperty(this, "namespace", void 0);

    _defineProperty(this, "taskManager", void 0);

    _defineProperty(this, "savedObjectsClient", void 0);

    _defineProperty(this, "alertTypeRegistry", void 0);

    _defineProperty(this, "createAPIKey", void 0);

    _defineProperty(this, "invalidateAPIKey", void 0);

    _defineProperty(this, "encryptedSavedObjectsPlugin", void 0);

    this.logger = logger;
    this.getUserName = getUserName;
    this.spaceId = spaceId;
    this.namespace = namespace;
    this.taskManager = taskManager;
    this.alertTypeRegistry = alertTypeRegistry;
    this.savedObjectsClient = savedObjectsClient;
    this.createAPIKey = createAPIKey;
    this.invalidateAPIKey = invalidateAPIKey;
    this.encryptedSavedObjectsPlugin = encryptedSavedObjectsPlugin;
  }

  async create({
    data,
    options
  }) {
    // Throws an error if alert type isn't registered
    const alertType = this.alertTypeRegistry.get(data.alertTypeId);
    const validatedAlertTypeParams = (0, _lib.validateAlertTypeParams)(alertType, data.params);
    const username = await this.getUserName();
    const createdAPIKey = data.enabled ? await this.createAPIKey() : null;
    this.validateActions(alertType, data.actions);
    const {
      references,
      actions
    } = await this.denormalizeActions(data.actions);
    const rawAlert = { ...data,
      ...this.apiKeyAsAlertAttributes(createdAPIKey, username),
      actions,
      createdBy: username,
      updatedBy: username,
      createdAt: new Date().toISOString(),
      params: validatedAlertTypeParams,
      muteAll: false,
      mutedInstanceIds: []
    };
    const createdAlert = await this.savedObjectsClient.create('alert', rawAlert, { ...options,
      references
    });

    if (data.enabled) {
      let scheduledTask;

      try {
        scheduledTask = await this.scheduleAlert(createdAlert.id, rawAlert.alertTypeId);
      } catch (e) {
        // Cleanup data, something went wrong scheduling the task
        try {
          await this.savedObjectsClient.delete('alert', createdAlert.id);
        } catch (err) {
          // Skip the cleanup error and throw the task manager error to avoid confusion
          this.logger.error(`Failed to cleanup alert "${createdAlert.id}" after scheduling task failed. Error: ${err.message}`);
        }

        throw e;
      }

      await this.savedObjectsClient.update('alert', createdAlert.id, {
        scheduledTaskId: scheduledTask.id
      });
      createdAlert.attributes.scheduledTaskId = scheduledTask.id;
    }

    return this.getAlertFromRaw(createdAlert.id, createdAlert.attributes, createdAlert.updated_at, references);
  }

  async get({
    id
  }) {
    const result = await this.savedObjectsClient.get('alert', id);
    return this.getAlertFromRaw(result.id, result.attributes, result.updated_at, result.references);
  }

  async getAlertState({
    id
  }) {
    const alert = await this.get({
      id
    });

    if (alert.scheduledTaskId) {
      const {
        state
      } = (0, _alert_task_instance.taskInstanceToAlertTaskInstance)((await this.taskManager.get(alert.scheduledTaskId)), alert);
      return state;
    }
  }

  async find({
    options = {}
  } = {}) {
    const {
      page,
      per_page: perPage,
      total,
      saved_objects: data
    } = await this.savedObjectsClient.find({ ...options,
      type: 'alert'
    });
    return {
      page,
      perPage,
      total,
      data: data.map(({
        id,
        attributes,
        updated_at,
        references
      }) => this.getAlertFromRaw(id, attributes, updated_at, references))
    };
  }

  async delete({
    id
  }) {
    let taskIdToRemove;
    let apiKeyToInvalidate = null;

    try {
      const decryptedAlert = await this.encryptedSavedObjectsPlugin.getDecryptedAsInternalUser('alert', id, {
        namespace: this.namespace
      });
      apiKeyToInvalidate = decryptedAlert.attributes.apiKey;
      taskIdToRemove = decryptedAlert.attributes.scheduledTaskId;
    } catch (e) {
      // We'll skip invalidating the API key since we failed to load the decrypted saved object
      this.logger.error(`delete(): Failed to load API key to invalidate on alert ${id}: ${e.message}`); // Still attempt to load the scheduledTaskId using SOC

      const alert = await this.savedObjectsClient.get('alert', id);
      taskIdToRemove = alert.attributes.scheduledTaskId;
    }

    const removeResult = await this.savedObjectsClient.delete('alert', id);
    await Promise.all([taskIdToRemove ? (0, _delete_task_if_it_exists.deleteTaskIfItExists)(this.taskManager, taskIdToRemove) : null, apiKeyToInvalidate ? this.invalidateApiKey({
      apiKey: apiKeyToInvalidate
    }) : null]);
    return removeResult;
  }

  async update({
    id,
    data
  }) {
    let alertSavedObject;

    try {
      alertSavedObject = await this.encryptedSavedObjectsPlugin.getDecryptedAsInternalUser('alert', id, {
        namespace: this.namespace
      });
    } catch (e) {
      // We'll skip invalidating the API key since we failed to load the decrypted saved object
      this.logger.error(`update(): Failed to load API key to invalidate on alert ${id}: ${e.message}`); // Still attempt to load the object using SOC

      alertSavedObject = await this.savedObjectsClient.get('alert', id);
    }

    const updateResult = await this.updateAlert({
      id,
      data
    }, alertSavedObject);
    await Promise.all([alertSavedObject.attributes.apiKey ? this.invalidateApiKey({
      apiKey: alertSavedObject.attributes.apiKey
    }) : null, (async () => {
      if (updateResult.scheduledTaskId && !(0, _lodash.isEqual)(alertSavedObject.attributes.schedule, updateResult.schedule)) {
        this.taskManager.runNow(updateResult.scheduledTaskId).catch(err => {
          this.logger.error(`Alert update failed to run its underlying task. TaskManager runNow failed with Error: ${err.message}`);
        });
      }
    })()]);
    return updateResult;
  }

  async updateAlert({
    id,
    data
  }, {
    attributes,
    version
  }) {
    const alertType = this.alertTypeRegistry.get(attributes.alertTypeId); // Validate

    const validatedAlertTypeParams = (0, _lib.validateAlertTypeParams)(alertType, data.params);
    this.validateActions(alertType, data.actions);
    const {
      actions,
      references
    } = await this.denormalizeActions(data.actions);
    const username = await this.getUserName();
    const createdAPIKey = attributes.enabled ? await this.createAPIKey() : null;
    const apiKeyAttributes = this.apiKeyAsAlertAttributes(createdAPIKey, username);
    const updatedObject = await this.savedObjectsClient.update('alert', id, { ...attributes,
      ...data,
      ...apiKeyAttributes,
      params: validatedAlertTypeParams,
      actions,
      updatedBy: username
    }, {
      version,
      references
    });
    return this.getPartialAlertFromRaw(id, updatedObject.attributes, updatedObject.updated_at, updatedObject.references);
  }

  apiKeyAsAlertAttributes(apiKey, username) {
    return apiKey && apiKey.apiKeysEnabled ? {
      apiKeyOwner: username,
      apiKey: Buffer.from(`${apiKey.result.id}:${apiKey.result.api_key}`).toString('base64')
    } : {
      apiKeyOwner: null,
      apiKey: null
    };
  }

  async updateApiKey({
    id
  }) {
    let apiKeyToInvalidate = null;
    let attributes;
    let version;

    try {
      const decryptedAlert = await this.encryptedSavedObjectsPlugin.getDecryptedAsInternalUser('alert', id, {
        namespace: this.namespace
      });
      apiKeyToInvalidate = decryptedAlert.attributes.apiKey;
      attributes = decryptedAlert.attributes;
      version = decryptedAlert.version;
    } catch (e) {
      // We'll skip invalidating the API key since we failed to load the decrypted saved object
      this.logger.error(`updateApiKey(): Failed to load API key to invalidate on alert ${id}: ${e.message}`); // Still attempt to load the attributes and version using SOC

      const alert = await this.savedObjectsClient.get('alert', id);
      attributes = alert.attributes;
      version = alert.version;
    }

    const username = await this.getUserName();
    await this.savedObjectsClient.update('alert', id, { ...attributes,
      ...this.apiKeyAsAlertAttributes((await this.createAPIKey()), username),
      updatedBy: username
    }, {
      version
    });

    if (apiKeyToInvalidate) {
      await this.invalidateApiKey({
        apiKey: apiKeyToInvalidate
      });
    }
  }

  async invalidateApiKey({
    apiKey
  }) {
    if (!apiKey) {
      return;
    }

    try {
      const apiKeyId = Buffer.from(apiKey, 'base64').toString().split(':')[0];
      const response = await this.invalidateAPIKey({
        id: apiKeyId
      });

      if (response.apiKeysEnabled === true && response.result.error_count > 0) {
        this.logger.error(`Failed to invalidate API Key [id="${apiKeyId}"]`);
      }
    } catch (e) {
      this.logger.error(`Failed to invalidate API Key: ${e.message}`);
    }
  }

  async enable({
    id
  }) {
    let apiKeyToInvalidate = null;
    let attributes;
    let version;

    try {
      const decryptedAlert = await this.encryptedSavedObjectsPlugin.getDecryptedAsInternalUser('alert', id, {
        namespace: this.namespace
      });
      apiKeyToInvalidate = decryptedAlert.attributes.apiKey;
      attributes = decryptedAlert.attributes;
      version = decryptedAlert.version;
    } catch (e) {
      // We'll skip invalidating the API key since we failed to load the decrypted saved object
      this.logger.error(`enable(): Failed to load API key to invalidate on alert ${id}: ${e.message}`); // Still attempt to load the attributes and version using SOC

      const alert = await this.savedObjectsClient.get('alert', id);
      attributes = alert.attributes;
      version = alert.version;
    }

    if (attributes.enabled === false) {
      const username = await this.getUserName();
      await this.savedObjectsClient.update('alert', id, { ...attributes,
        enabled: true,
        ...this.apiKeyAsAlertAttributes((await this.createAPIKey()), username),
        updatedBy: username
      }, {
        version
      });
      const scheduledTask = await this.scheduleAlert(id, attributes.alertTypeId);
      await this.savedObjectsClient.update('alert', id, {
        scheduledTaskId: scheduledTask.id
      });

      if (apiKeyToInvalidate) {
        await this.invalidateApiKey({
          apiKey: apiKeyToInvalidate
        });
      }
    }
  }

  async disable({
    id
  }) {
    let apiKeyToInvalidate = null;
    let attributes;
    let version;

    try {
      const decryptedAlert = await this.encryptedSavedObjectsPlugin.getDecryptedAsInternalUser('alert', id, {
        namespace: this.namespace
      });
      apiKeyToInvalidate = decryptedAlert.attributes.apiKey;
      attributes = decryptedAlert.attributes;
      version = decryptedAlert.version;
    } catch (e) {
      // We'll skip invalidating the API key since we failed to load the decrypted saved object
      this.logger.error(`disable(): Failed to load API key to invalidate on alert ${id}: ${e.message}`); // Still attempt to load the attributes and version using SOC

      const alert = await this.savedObjectsClient.get('alert', id);
      attributes = alert.attributes;
      version = alert.version;
    }

    if (attributes.enabled === true) {
      await this.savedObjectsClient.update('alert', id, { ...attributes,
        enabled: false,
        scheduledTaskId: null,
        apiKey: null,
        apiKeyOwner: null,
        updatedBy: await this.getUserName()
      }, {
        version
      });
      await Promise.all([attributes.scheduledTaskId ? (0, _delete_task_if_it_exists.deleteTaskIfItExists)(this.taskManager, attributes.scheduledTaskId) : null, apiKeyToInvalidate ? this.invalidateApiKey({
        apiKey: apiKeyToInvalidate
      }) : null]);
    }
  }

  async muteAll({
    id
  }) {
    await this.savedObjectsClient.update('alert', id, {
      muteAll: true,
      mutedInstanceIds: [],
      updatedBy: await this.getUserName()
    });
  }

  async unmuteAll({
    id
  }) {
    await this.savedObjectsClient.update('alert', id, {
      muteAll: false,
      mutedInstanceIds: [],
      updatedBy: await this.getUserName()
    });
  }

  async muteInstance({
    alertId,
    alertInstanceId
  }) {
    const {
      attributes,
      version
    } = await this.savedObjectsClient.get('alert', alertId);
    const mutedInstanceIds = attributes.mutedInstanceIds || [];

    if (!attributes.muteAll && !mutedInstanceIds.includes(alertInstanceId)) {
      mutedInstanceIds.push(alertInstanceId);
      await this.savedObjectsClient.update('alert', alertId, {
        mutedInstanceIds,
        updatedBy: await this.getUserName()
      }, {
        version
      });
    }
  }

  async unmuteInstance({
    alertId,
    alertInstanceId
  }) {
    const {
      attributes,
      version
    } = await this.savedObjectsClient.get('alert', alertId);
    const mutedInstanceIds = attributes.mutedInstanceIds || [];

    if (!attributes.muteAll && mutedInstanceIds.includes(alertInstanceId)) {
      await this.savedObjectsClient.update('alert', alertId, {
        updatedBy: await this.getUserName(),
        mutedInstanceIds: mutedInstanceIds.filter(id => id !== alertInstanceId)
      }, {
        version
      });
    }
  }

  async scheduleAlert(id, alertTypeId) {
    return await this.taskManager.schedule({
      taskType: `alerting:${alertTypeId}`,
      params: {
        alertId: id,
        spaceId: this.spaceId
      },
      state: {
        previousStartedAt: null,
        alertTypeState: {},
        alertInstances: {}
      },
      scope: ['alerting']
    });
  }

  injectReferencesIntoActions(actions, references) {
    return actions.map((action, i) => {
      const reference = references.find(ref => ref.name === action.actionRef);

      if (!reference) {
        throw new Error(`Reference ${action.actionRef} not found`);
      }

      return { ...(0, _lodash.omit)(action, 'actionRef'),
        id: reference.id
      };
    });
  }

  getAlertFromRaw(id, rawAlert, updatedAt, references) {
    // In order to support the partial update API of Saved Objects we have to support
    // partial updates of an Alert, but when we receive an actual RawAlert, it is safe
    // to cast the result to an Alert
    return this.getPartialAlertFromRaw(id, rawAlert, updatedAt, references);
  }

  getPartialAlertFromRaw(id, rawAlert, updatedAt, references) {
    return {
      id,
      ...rawAlert,
      // we currently only support the Interval Schedule type
      // Once we support additional types, this type signature will likely change
      schedule: rawAlert.schedule,
      updatedAt: updatedAt ? new Date(updatedAt) : new Date(rawAlert.createdAt),
      createdAt: new Date(rawAlert.createdAt),
      actions: rawAlert.actions ? this.injectReferencesIntoActions(rawAlert.actions, references || []) : []
    };
  }

  validateActions(alertType, actions) {
    const {
      actionGroups: alertTypeActionGroups
    } = alertType;
    const usedAlertActionGroups = actions.map(action => action.group);
    const availableAlertTypeActionGroups = new Set((0, _lodash.pluck)(alertTypeActionGroups, 'id'));
    const invalidActionGroups = usedAlertActionGroups.filter(group => !availableAlertTypeActionGroups.has(group));

    if (invalidActionGroups.length) {
      throw _boom.default.badRequest(_i18n.i18n.translate('xpack.alerting.alertsClient.validateActions.invalidGroups', {
        defaultMessage: 'Invalid action groups: {groups}',
        values: {
          groups: invalidActionGroups.join(', ')
        }
      }));
    }
  }

  async denormalizeActions(alertActions) {
    // Fetch action objects in bulk
    const actionIds = [...new Set(alertActions.map(alertAction => alertAction.id))];
    const bulkGetOpts = actionIds.map(id => ({
      id,
      type: 'action'
    }));
    const bulkGetResult = await this.savedObjectsClient.bulkGet(bulkGetOpts);
    const actionMap = new Map();

    for (const action of bulkGetResult.saved_objects) {
      if (action.error) {
        throw _boom.default.badRequest(`Failed to load action ${action.id} (${action.error.statusCode}): ${action.error.message}`);
      }

      actionMap.set(action.id, action);
    } // Extract references and set actionTypeId


    const references = [];
    const actions = alertActions.map(({
      id,
      ...alertAction
    }, i) => {
      const actionRef = `action_${i}`;
      references.push({
        id,
        name: actionRef,
        type: 'action'
      });
      return { ...alertAction,
        actionRef,
        actionTypeId: actionMap.get(id).attributes.actionTypeId
      };
    });
    return {
      actions,
      references
    };
  }

}

exports.AlertsClient = AlertsClient;