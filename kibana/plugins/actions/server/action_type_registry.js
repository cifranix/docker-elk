"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypeRegistry = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _i18n = require("@kbn/i18n");

var _lib = require("./lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ActionTypeRegistry {
  constructor(constructorParams) {
    _defineProperty(this, "taskManager", void 0);

    _defineProperty(this, "actionTypes", new Map());

    _defineProperty(this, "taskRunnerFactory", void 0);

    _defineProperty(this, "actionsConfigUtils", void 0);

    _defineProperty(this, "licenseState", void 0);

    this.taskManager = constructorParams.taskManager;
    this.taskRunnerFactory = constructorParams.taskRunnerFactory;
    this.actionsConfigUtils = constructorParams.actionsConfigUtils;
    this.licenseState = constructorParams.licenseState;
  }
  /**
   * Returns if the action type registry has the given action type registered
   */


  has(id) {
    return this.actionTypes.has(id);
  }
  /**
   * Throws error if action type is not enabled.
   */


  ensureActionTypeEnabled(id) {
    this.actionsConfigUtils.ensureActionTypeEnabled(id);
    this.licenseState.ensureLicenseForActionType(this.get(id));
  }
  /**
   * Returns true if action type is enabled in the config and a valid license is used.
   */


  isActionTypeEnabled(id) {
    return this.actionsConfigUtils.isActionTypeEnabled(id) && this.licenseState.isLicenseValidForActionType(this.get(id)).isValid === true;
  }
  /**
   * Registers an action type to the action type registry
   */


  register(actionType) {
    if (this.has(actionType.id)) {
      throw new Error(_i18n.i18n.translate('xpack.actions.actionTypeRegistry.register.duplicateActionTypeErrorMessage', {
        defaultMessage: 'Action type "{id}" is already registered.',
        values: {
          id: actionType.id
        }
      }));
    }

    this.actionTypes.set(actionType.id, { ...actionType
    });
    this.taskManager.registerTaskDefinitions({
      [`actions:${actionType.id}`]: {
        title: actionType.name,
        type: `actions:${actionType.id}`,
        maxAttempts: actionType.maxAttempts || 1,

        getRetry(attempts, error) {
          if (error instanceof _lib.ExecutorError) {
            return error.retry == null ? false : error.retry;
          } // Don't retry other kinds of errors


          return false;
        },

        createTaskRunner: context => this.taskRunnerFactory.create(context)
      }
    });
  }
  /**
   * Returns an action type, throws if not registered
   */


  get(id) {
    if (!this.has(id)) {
      throw _boom.default.badRequest(_i18n.i18n.translate('xpack.actions.actionTypeRegistry.get.missingActionTypeErrorMessage', {
        defaultMessage: 'Action type "{id}" is not registered.',
        values: {
          id
        }
      }));
    }

    return this.actionTypes.get(id);
  }
  /**
   * Returns a list of registered action types [{ id, name, enabled }]
   */


  list() {
    return Array.from(this.actionTypes).map(([actionTypeId, actionType]) => ({
      id: actionTypeId,
      name: actionType.name,
      minimumLicenseRequired: actionType.minimumLicenseRequired,
      enabled: this.isActionTypeEnabled(actionTypeId),
      enabledInConfig: this.actionsConfigUtils.isActionTypeEnabled(actionTypeId),
      enabledInLicense: this.licenseState.isLicenseValidForActionType(actionType).isValid === true
    }));
  }

}

exports.ActionTypeRegistry = ActionTypeRegistry;