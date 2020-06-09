"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertTypeRegistry = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AlertTypeRegistry {
  constructor({
    taskManager,
    taskRunnerFactory
  }) {
    _defineProperty(this, "taskManager", void 0);

    _defineProperty(this, "alertTypes", new Map());

    _defineProperty(this, "taskRunnerFactory", void 0);

    this.taskManager = taskManager;
    this.taskRunnerFactory = taskRunnerFactory;
  }

  has(id) {
    return this.alertTypes.has(id);
  }

  register(alertType) {
    if (this.has(alertType.id)) {
      throw new Error(_i18n.i18n.translate('xpack.alerting.alertTypeRegistry.register.duplicateAlertTypeError', {
        defaultMessage: 'Alert type "{id}" is already registered.',
        values: {
          id: alertType.id
        }
      }));
    }

    alertType.actionVariables = normalizedActionVariables(alertType.actionVariables);
    this.alertTypes.set(alertType.id, { ...alertType
    });
    this.taskManager.registerTaskDefinitions({
      [`alerting:${alertType.id}`]: {
        title: alertType.name,
        type: `alerting:${alertType.id}`,
        createTaskRunner: context => this.taskRunnerFactory.create(alertType, context)
      }
    });
  }

  get(id) {
    if (!this.has(id)) {
      throw _boom.default.badRequest(_i18n.i18n.translate('xpack.alerting.alertTypeRegistry.get.missingAlertTypeError', {
        defaultMessage: 'Alert type "{id}" is not registered.',
        values: {
          id
        }
      }));
    }

    return this.alertTypes.get(id);
  }

  list() {
    return Array.from(this.alertTypes).map(([alertTypeId, alertType]) => ({
      id: alertTypeId,
      name: alertType.name,
      actionGroups: alertType.actionGroups,
      defaultActionGroupId: alertType.defaultActionGroupId,
      actionVariables: alertType.actionVariables
    }));
  }

}

exports.AlertTypeRegistry = AlertTypeRegistry;

function normalizedActionVariables(actionVariables) {
  var _ref, _ref2;

  return {
    context: (_ref = actionVariables === null || actionVariables === void 0 ? void 0 : actionVariables.context) !== null && _ref !== void 0 ? _ref : [],
    state: (_ref2 = actionVariables === null || actionVariables === void 0 ? void 0 : actionVariables.state) !== null && _ref2 !== void 0 ? _ref2 : []
  };
}