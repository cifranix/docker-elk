"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertingPlugin = void 0;

var _operators = require("rxjs/operators");

var _alert_type_registry = require("./alert_type_registry");

var _task_runner = require("./task_runner");

var _alerts_client_factory = require("./alerts_client_factory");

var _license_state = require("./lib/license_state");

var _routes = require("./routes");

var _usage = require("./usage");

var _task = require("./usage/task");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AlertingPlugin {
  constructor(initializerContext) {
    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "alertTypeRegistry", void 0);

    _defineProperty(this, "taskRunnerFactory", void 0);

    _defineProperty(this, "adminClient", void 0);

    _defineProperty(this, "serverBasePath", void 0);

    _defineProperty(this, "licenseState", null);

    _defineProperty(this, "isESOUsingEphemeralEncryptionKey", void 0);

    _defineProperty(this, "spaces", void 0);

    _defineProperty(this, "security", void 0);

    _defineProperty(this, "alertsClientFactory", void 0);

    _defineProperty(this, "telemetryLogger", void 0);

    _defineProperty(this, "kibanaIndex", void 0);

    _defineProperty(this, "createRouteHandlerContext", () => {
      const {
        alertTypeRegistry,
        alertsClientFactory
      } = this;
      return async function alertsRouteHandlerContext(context, request) {
        return {
          getAlertsClient: () => {
            return alertsClientFactory.create(request, context.core.savedObjects.client);
          },
          listTypes: alertTypeRegistry.list.bind(alertTypeRegistry)
        };
      };
    });

    _defineProperty(this, "spaceIdToNamespace", spaceId => {
      return this.spaces && spaceId ? this.spaces.spaceIdToNamespace(spaceId) : undefined;
    });

    _defineProperty(this, "getBasePath", spaceId => {
      return this.spaces && spaceId ? this.spaces.getBasePath(spaceId) : this.serverBasePath;
    });

    this.logger = initializerContext.logger.get('plugins', 'alerting');
    this.taskRunnerFactory = new _task_runner.TaskRunnerFactory();
    this.alertsClientFactory = new _alerts_client_factory.AlertsClientFactory();
    this.telemetryLogger = initializerContext.logger.get('telemetry');
    this.kibanaIndex = initializerContext.config.legacy.globalConfig$.pipe((0, _operators.first)(), (0, _operators.map)(config => config.kibana.index)).toPromise();
  }

  async setup(core, plugins) {
    var _plugins$spaces;

    this.adminClient = core.elasticsearch.adminClient;
    this.licenseState = new _license_state.LicenseState(plugins.licensing.license$);
    this.spaces = (_plugins$spaces = plugins.spaces) === null || _plugins$spaces === void 0 ? void 0 : _plugins$spaces.spacesService;
    this.security = plugins.security;
    this.isESOUsingEphemeralEncryptionKey = plugins.encryptedSavedObjects.usingEphemeralEncryptionKey;

    if (this.isESOUsingEphemeralEncryptionKey) {
      this.logger.warn('APIs are disabled due to the Encrypted Saved Objects plugin using an ephemeral encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in kibana.yml.');
    } // Encrypted attributes


    plugins.encryptedSavedObjects.registerType({
      type: 'alert',
      attributesToEncrypt: new Set(['apiKey']),
      attributesToExcludeFromAAD: new Set(['scheduledTaskId', 'muteAll', 'mutedInstanceIds', 'updatedBy'])
    });
    const alertTypeRegistry = new _alert_type_registry.AlertTypeRegistry({
      taskManager: plugins.taskManager,
      taskRunnerFactory: this.taskRunnerFactory
    });
    this.alertTypeRegistry = alertTypeRegistry;
    this.serverBasePath = core.http.basePath.serverBasePath;
    const usageCollection = plugins.usageCollection;

    if (usageCollection) {
      core.getStartServices().then(async ([coreStart, startPlugins]) => {
        (0, _usage.registerAlertsUsageCollector)(usageCollection, startPlugins.taskManager);
        (0, _task.initializeAlertingTelemetry)(this.telemetryLogger, core, plugins.taskManager, (await this.kibanaIndex));
      });
    }

    core.http.registerRouteHandlerContext('alerting', this.createRouteHandlerContext()); // Routes

    const router = core.http.createRouter(); // Register routes

    (0, _routes.createAlertRoute)(router, this.licenseState);
    (0, _routes.deleteAlertRoute)(router, this.licenseState);
    (0, _routes.findAlertRoute)(router, this.licenseState);
    (0, _routes.getAlertRoute)(router, this.licenseState);
    (0, _routes.getAlertStateRoute)(router, this.licenseState);
    (0, _routes.listAlertTypesRoute)(router, this.licenseState);
    (0, _routes.updateAlertRoute)(router, this.licenseState);
    (0, _routes.enableAlertRoute)(router, this.licenseState);
    (0, _routes.disableAlertRoute)(router, this.licenseState);
    (0, _routes.updateApiKeyRoute)(router, this.licenseState);
    (0, _routes.muteAllAlertRoute)(router, this.licenseState);
    (0, _routes.unmuteAllAlertRoute)(router, this.licenseState);
    (0, _routes.muteAlertInstanceRoute)(router, this.licenseState);
    (0, _routes.unmuteAlertInstanceRoute)(router, this.licenseState);
    (0, _routes.healthRoute)(router, this.licenseState, plugins.encryptedSavedObjects);
    return {
      registerType: alertTypeRegistry.register.bind(alertTypeRegistry)
    };
  }

  start(core, plugins) {
    const {
      spaces,
      isESOUsingEphemeralEncryptionKey,
      logger,
      taskRunnerFactory,
      alertTypeRegistry,
      alertsClientFactory,
      security
    } = this;
    alertsClientFactory.initialize({
      alertTypeRegistry: alertTypeRegistry,
      logger,
      taskManager: plugins.taskManager,
      securityPluginSetup: security,
      encryptedSavedObjectsPlugin: plugins.encryptedSavedObjects,
      spaceIdToNamespace: this.spaceIdToNamespace,

      getSpaceId(request) {
        return spaces === null || spaces === void 0 ? void 0 : spaces.getSpaceId(request);
      }

    });
    taskRunnerFactory.initialize({
      logger,
      getServices: this.getServicesFactory(core.savedObjects),
      spaceIdToNamespace: this.spaceIdToNamespace,
      actionsPlugin: plugins.actions,
      encryptedSavedObjectsPlugin: plugins.encryptedSavedObjects,
      getBasePath: this.getBasePath
    });
    (0, _task.scheduleAlertingTelemetry)(this.telemetryLogger, plugins.taskManager);
    return {
      listTypes: alertTypeRegistry.list.bind(this.alertTypeRegistry),

      // Ability to get an alerts client from legacy code
      getAlertsClientWithRequest(request) {
        if (isESOUsingEphemeralEncryptionKey === true) {
          throw new Error(`Unable to create alerts client due to the Encrypted Saved Objects plugin using an ephemeral encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in kibana.yml`);
        }

        return alertsClientFactory.create(request, core.savedObjects.getScopedClient(request));
      }

    };
  }

  getServicesFactory(savedObjects) {
    const {
      adminClient
    } = this;
    return request => ({
      callCluster: adminClient.asScoped(request).callAsCurrentUser,
      savedObjectsClient: savedObjects.getScopedClient(request)
    });
  }

  stop() {
    if (this.licenseState) {
      this.licenseState.clean();
    }
  }

}

exports.AlertingPlugin = AlertingPlugin;