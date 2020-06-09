"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionExecutor = void 0;

var _validate_with_schema = require("./validate_with_schema");

var _plugin = require("../plugin");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ActionExecutor {
  constructor({
    isESOUsingEphemeralEncryptionKey
  }) {
    _defineProperty(this, "isInitialized", false);

    _defineProperty(this, "actionExecutorContext", void 0);

    _defineProperty(this, "isESOUsingEphemeralEncryptionKey", void 0);

    this.isESOUsingEphemeralEncryptionKey = isESOUsingEphemeralEncryptionKey;
  }

  initialize(actionExecutorContext) {
    if (this.isInitialized) {
      throw new Error('ActionExecutor already initialized');
    }

    this.isInitialized = true;
    this.actionExecutorContext = actionExecutorContext;
  }

  async execute({
    actionId,
    params,
    request
  }) {
    if (!this.isInitialized) {
      throw new Error('ActionExecutor not initialized');
    }

    if (this.isESOUsingEphemeralEncryptionKey === true) {
      throw new Error(`Unable to execute action due to the Encrypted Saved Objects plugin using an ephemeral encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in kibana.yml`);
    }

    const {
      spaces,
      getServices,
      encryptedSavedObjectsPlugin,
      actionTypeRegistry,
      eventLogger
    } = this.actionExecutorContext;
    const services = getServices(request);
    const namespace = spaces && spaces.getSpaceId(request); // Ensure user can read the action before processing

    const {
      attributes: {
        actionTypeId,
        config,
        name
      }
    } = await services.savedObjectsClient.get('action', actionId);
    actionTypeRegistry.ensureActionTypeEnabled(actionTypeId); // Only get encrypted attributes here, the remaining attributes can be fetched in
    // the savedObjectsClient call

    const {
      attributes: {
        secrets
      }
    } = await encryptedSavedObjectsPlugin.getDecryptedAsInternalUser('action', actionId, {
      namespace: namespace === 'default' ? undefined : namespace
    });
    const actionType = actionTypeRegistry.get(actionTypeId);
    let validatedParams;
    let validatedConfig;
    let validatedSecrets;

    try {
      validatedParams = (0, _validate_with_schema.validateParams)(actionType, params);
      validatedConfig = (0, _validate_with_schema.validateConfig)(actionType, config);
      validatedSecrets = (0, _validate_with_schema.validateSecrets)(actionType, secrets);
    } catch (err) {
      return {
        status: 'error',
        actionId,
        message: err.message,
        retry: false
      };
    }

    const actionLabel = `${actionTypeId}:${actionId}: ${name}`;
    const event = {
      event: {
        action: _plugin.EVENT_LOG_ACTIONS.execute
      },
      kibana: {
        namespace,
        saved_objects: [{
          type: 'action',
          id: actionId
        }]
      }
    };
    eventLogger.startTiming(event);
    let rawResult;

    try {
      rawResult = await actionType.executor({
        actionId,
        services,
        params: validatedParams,
        config: validatedConfig,
        secrets: validatedSecrets
      });
    } catch (err) {
      rawResult = {
        actionId,
        status: 'error',
        message: 'an error occurred while running the action executor',
        serviceMessage: err.message,
        retry: false
      };
    }

    eventLogger.stopTiming(event); // allow null-ish return to indicate success

    const result = rawResult || {
      actionId,
      status: 'ok'
    };

    if (result.status === 'ok') {
      event.message = `action executed: ${actionLabel}`;
    } else if (result.status === 'error') {
      event.message = `action execution failure: ${actionLabel}`;
      event.error = event.error || {};
      event.error.message = actionErrorToMessage(result);
    } else {
      event.message = `action execution returned unexpected result: ${actionLabel}`;
      event.error = event.error || {};
      event.error.message = 'action execution returned unexpected result';
    }

    eventLogger.logEvent(event);
    return result;
  }

}

exports.ActionExecutor = ActionExecutor;

function actionErrorToMessage(result) {
  let message = result.message || 'unknown error running action';

  if (result.serviceMessage) {
    message = `${message}: ${result.serviceMessage}`;
  }

  if (result.retry instanceof Date) {
    message = `${message}; retry at ${result.retry.toISOString()}`;
  } else if (result.retry) {
    message = `${message}; retry: ${JSON.stringify(result.retry)}`;
  }

  return message;
}