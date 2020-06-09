"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APMPlugin = void 0;

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _lodash = require("lodash");

var _create_agent_config_index = require("./lib/settings/agent_configuration/create_agent_config_index");

var _create_custom_link_index = require("./lib/settings/custom_link/create_custom_link_index");

var _create_apm_api = require("./routes/create_apm_api");

var _get_apm_indices = require("./lib/settings/apm_indices/get_apm_indices");

var _ = require(".");

var _tutorial = require("./tutorial");

var _get_internal_saved_objects_client = require("./lib/helpers/get_internal_saved_objects_client");

var _register_apm_alerts = require("./lib/alerts/register_apm_alerts");

var _apm_telemetry = require("./lib/apm_telemetry");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class APMPlugin {
  constructor(initContext) {
    this.initContext = initContext;

    _defineProperty(this, "legacySetup$", void 0);

    this.initContext = initContext;
    this.legacySetup$ = new _rxjs.AsyncSubject();
  }

  async setup(core, plugins) {
    const logger = this.initContext.logger.get();
    const config$ = this.initContext.config.create();
    const mergedConfig$ = (0, _rxjs.combineLatest)(plugins.apm_oss.config$, config$).pipe((0, _operators.map)(([apmOssConfig, apmConfig]) => (0, _.mergeConfigs)(apmOssConfig, apmConfig)));

    if (plugins.actions && plugins.alerting) {
      (0, _register_apm_alerts.registerApmAlerts)({
        alerting: plugins.alerting,
        actions: plugins.actions,
        config$: mergedConfig$
      });
    }

    this.legacySetup$.subscribe(__LEGACY => {
      (0, _create_apm_api.createApmApi)().init(core, {
        config$: mergedConfig$,
        logger,
        __LEGACY
      });
    });
    const currentConfig = await mergedConfig$.pipe((0, _operators.take)(1)).toPromise();

    if (plugins.taskManager && plugins.usageCollection && currentConfig['xpack.apm.telemetryCollectionEnabled']) {
      (0, _apm_telemetry.createApmTelemetry)({
        core,
        config$: mergedConfig$,
        usageCollector: plugins.usageCollection,
        taskManager: plugins.taskManager,
        logger
      });
    } // create agent configuration index without blocking setup lifecycle


    (0, _create_agent_config_index.createApmAgentConfigurationIndex)({
      esClient: core.elasticsearch.dataClient,
      config: currentConfig,
      logger
    }); // create custom action index without blocking setup lifecycle

    (0, _create_custom_link_index.createApmCustomLinkIndex)({
      esClient: core.elasticsearch.dataClient,
      config: currentConfig,
      logger
    });
    plugins.home.tutorials.registerTutorial((0, _tutorial.tutorialProvider)({
      isEnabled: currentConfig['xpack.apm.ui.enabled'],
      indexPatternTitle: currentConfig['apm_oss.indexPattern'],
      cloud: plugins.cloud,
      indices: {
        errorIndices: currentConfig['apm_oss.errorIndices'],
        metricsIndices: currentConfig['apm_oss.metricsIndices'],
        onboardingIndices: currentConfig['apm_oss.onboardingIndices'],
        sourcemapIndices: currentConfig['apm_oss.sourcemapIndices'],
        transactionIndices: currentConfig['apm_oss.transactionIndices']
      }
    }));
    return {
      config$: mergedConfig$,
      registerLegacyAPI: (0, _lodash.once)(__LEGACY => {
        this.legacySetup$.next(__LEGACY);
        this.legacySetup$.complete();
      }),
      getApmIndices: async () => (0, _get_apm_indices.getApmIndices)({
        savedObjectsClient: await (0, _get_internal_saved_objects_client.getInternalSavedObjectsClient)(core),
        config: currentConfig
      })
    };
  }

  async start() {}

  stop() {}

}

exports.APMPlugin = APMPlugin;