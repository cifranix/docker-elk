"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionsPlugin = exports.EVENT_LOG_ACTIONS = void 0;

var _operators = require("rxjs/operators");

var _types = require("../../licensing/common/types");

var _lib = require("./lib");

var _actions_client = require("./actions_client");

var _action_type_registry = require("./action_type_registry");

var _create_execute_function = require("./create_execute_function");

var _builtin_action_types = require("./builtin_action_types");

var _usage = require("./usage");

var _actions_config = require("./actions_config");

var _routes = require("./routes");

var _task = require("./usage/task");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const EVENT_LOG_PROVIDER = 'actions';
const EVENT_LOG_ACTIONS = {
  execute: 'execute',
  executeViaHttp: 'execute-via-http'
};
exports.EVENT_LOG_ACTIONS = EVENT_LOG_ACTIONS;

class ActionsPlugin {
  constructor(initContext) {
    _defineProperty(this, "kibanaIndex", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "serverBasePath", void 0);

    _defineProperty(this, "adminClient", void 0);

    _defineProperty(this, "taskRunnerFactory", void 0);

    _defineProperty(this, "actionTypeRegistry", void 0);

    _defineProperty(this, "actionExecutor", void 0);

    _defineProperty(this, "licenseState", null);

    _defineProperty(this, "spaces", void 0);

    _defineProperty(this, "eventLogger", void 0);

    _defineProperty(this, "isESOUsingEphemeralEncryptionKey", void 0);

    _defineProperty(this, "telemetryLogger", void 0);

    _defineProperty(this, "createRouteHandlerContext", defaultKibanaIndex => {
      const {
        actionTypeRegistry,
        adminClient,
        isESOUsingEphemeralEncryptionKey
      } = this;
      return async function actionsRouteHandlerContext(context, request) {
        return {
          getActionsClient: () => {
            if (isESOUsingEphemeralEncryptionKey === true) {
              throw new Error(`Unable to create actions client due to the Encrypted Saved Objects plugin using an ephemeral encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in kibana.yml`);
            }

            return new _actions_client.ActionsClient({
              savedObjectsClient: context.core.savedObjects.client,
              actionTypeRegistry: actionTypeRegistry,
              defaultKibanaIndex,
              scopedClusterClient: adminClient.asScoped(request)
            });
          },
          listTypes: actionTypeRegistry.list.bind(actionTypeRegistry)
        };
      };
    });

    _defineProperty(this, "spaceIdToNamespace", spaceId => {
      return this.spaces && spaceId ? this.spaces.spaceIdToNamespace(spaceId) : undefined;
    });

    _defineProperty(this, "getBasePath", spaceId => {
      return this.spaces && spaceId ? this.spaces.getBasePath(spaceId) : this.serverBasePath;
    });

    this.config = initContext.config.create().pipe((0, _operators.first)()).toPromise();
    this.kibanaIndex = initContext.config.legacy.globalConfig$.pipe((0, _operators.first)(), (0, _operators.map)(config => config.kibana.index)).toPromise();
    this.logger = initContext.logger.get('actions');
    this.telemetryLogger = initContext.logger.get('telemetry');
  }

  async setup(core, plugins) {
    var _plugins$spaces;

    this.licenseState = new _lib.LicenseState(plugins.licensing.license$);
    this.isESOUsingEphemeralEncryptionKey = plugins.encryptedSavedObjects.usingEphemeralEncryptionKey;

    if (this.isESOUsingEphemeralEncryptionKey) {
      this.logger.warn('APIs are disabled due to the Encrypted Saved Objects plugin using an ephemeral encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in kibana.yml.');
    } // Encrypted attributes
    // - `secrets` properties will be encrypted
    // - `config` will be included in AAD
    // - everything else excluded from AAD


    plugins.encryptedSavedObjects.registerType({
      type: 'action',
      attributesToEncrypt: new Set(['secrets']),
      attributesToExcludeFromAAD: new Set(['name'])
    });
    plugins.encryptedSavedObjects.registerType({
      type: 'action_task_params',
      attributesToEncrypt: new Set(['apiKey'])
    });
    plugins.eventLog.registerProviderActions(EVENT_LOG_PROVIDER, Object.values(EVENT_LOG_ACTIONS));
    this.eventLogger = plugins.eventLog.getLogger({
      event: {
        provider: EVENT_LOG_PROVIDER
      }
    });
    const actionExecutor = new _lib.ActionExecutor({
      isESOUsingEphemeralEncryptionKey: this.isESOUsingEphemeralEncryptionKey
    }); // get executions count

    const taskRunnerFactory = new _lib.TaskRunnerFactory(actionExecutor);
    const actionsConfigUtils = (0, _actions_config.getActionsConfigurationUtilities)((await this.config));
    const actionTypeRegistry = new _action_type_registry.ActionTypeRegistry({
      taskRunnerFactory,
      taskManager: plugins.taskManager,
      actionsConfigUtils,
      licenseState: this.licenseState
    });
    this.taskRunnerFactory = taskRunnerFactory;
    this.actionTypeRegistry = actionTypeRegistry;
    this.serverBasePath = core.http.basePath.serverBasePath;
    this.actionExecutor = actionExecutor;
    this.adminClient = core.elasticsearch.adminClient;
    this.spaces = (_plugins$spaces = plugins.spaces) === null || _plugins$spaces === void 0 ? void 0 : _plugins$spaces.spacesService;
    (0, _builtin_action_types.registerBuiltInActionTypes)({
      logger: this.logger,
      actionTypeRegistry,
      actionsConfigUtils
    });
    const usageCollection = plugins.usageCollection;

    if (usageCollection) {
      core.getStartServices().then(async ([coreStart, startPlugins]) => {
        (0, _usage.registerActionsUsageCollector)(usageCollection, startPlugins.taskManager);
        (0, _task.initializeActionsTelemetry)(this.telemetryLogger, plugins.taskManager, core, (await this.kibanaIndex));
      });
    }

    core.http.registerRouteHandlerContext('actions', this.createRouteHandlerContext((await this.kibanaIndex))); // Routes

    const router = core.http.createRouter();
    (0, _routes.createActionRoute)(router, this.licenseState);
    (0, _routes.deleteActionRoute)(router, this.licenseState);
    (0, _routes.getActionRoute)(router, this.licenseState);
    (0, _routes.findActionRoute)(router, this.licenseState);
    (0, _routes.updateActionRoute)(router, this.licenseState);
    (0, _routes.listActionTypesRoute)(router, this.licenseState);
    (0, _routes.executeActionRoute)(router, this.licenseState, actionExecutor);
    return {
      registerType: actionType => {
        if (!(actionType.minimumLicenseRequired in _types.LICENSE_TYPE)) {
          throw new Error(`"${actionType.minimumLicenseRequired}" is not a valid license type`);
        }

        if (_types.LICENSE_TYPE[actionType.minimumLicenseRequired] < _types.LICENSE_TYPE.gold) {
          throw new Error(`Third party action type "${actionType.id}" can only set minimumLicenseRequired to a gold license or higher`);
        }

        actionTypeRegistry.register(actionType);
      }
    };
  }

  start(core, plugins) {
    const {
      logger,
      actionExecutor,
      actionTypeRegistry,
      taskRunnerFactory,
      kibanaIndex,
      adminClient,
      isESOUsingEphemeralEncryptionKey
    } = this;
    actionExecutor.initialize({
      logger,
      eventLogger: this.eventLogger,
      spaces: this.spaces,
      getServices: this.getServicesFactory(core.savedObjects),
      encryptedSavedObjectsPlugin: plugins.encryptedSavedObjects,
      actionTypeRegistry: actionTypeRegistry
    });
    taskRunnerFactory.initialize({
      logger,
      actionTypeRegistry: actionTypeRegistry,
      encryptedSavedObjectsPlugin: plugins.encryptedSavedObjects,
      getBasePath: this.getBasePath,
      spaceIdToNamespace: this.spaceIdToNamespace,
      getScopedSavedObjectsClient: core.savedObjects.getScopedClient
    });
    (0, _task.scheduleActionsTelemetry)(this.telemetryLogger, plugins.taskManager);
    return {
      execute: (0, _create_execute_function.createExecuteFunction)({
        taskManager: plugins.taskManager,
        actionTypeRegistry: actionTypeRegistry,
        getScopedSavedObjectsClient: core.savedObjects.getScopedClient,
        getBasePath: this.getBasePath,
        isESOUsingEphemeralEncryptionKey: isESOUsingEphemeralEncryptionKey
      }),
      isActionTypeEnabled: id => {
        return this.actionTypeRegistry.isActionTypeEnabled(id);
      },

      // Ability to get an actions client from legacy code
      async getActionsClientWithRequest(request) {
        if (isESOUsingEphemeralEncryptionKey === true) {
          throw new Error(`Unable to create actions client due to the Encrypted Saved Objects plugin using an ephemeral encryption key. Please set xpack.encryptedSavedObjects.encryptionKey in kibana.yml`);
        }

        return new _actions_client.ActionsClient({
          savedObjectsClient: core.savedObjects.getScopedClient(request),
          actionTypeRegistry: actionTypeRegistry,
          defaultKibanaIndex: await kibanaIndex,
          scopedClusterClient: adminClient.asScoped(request)
        });
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

exports.ActionsPlugin = ActionsPlugin;