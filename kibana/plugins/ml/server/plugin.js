"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlServerPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _app = require("../common/constants/app");

var _elasticsearch_ml = require("./client/elasticsearch_ml");

var _telemetry = require("./lib/telemetry");

var _log = require("./client/log");

var _sample_data_sets = require("./lib/sample_data_sets");

var _annotations = require("./routes/annotations");

var _calendars = require("./routes/calendars");

var _datafeeds = require("./routes/datafeeds");

var _data_frame_analytics = require("./routes/data_frame_analytics");

var _modules = require("./routes/modules");

var _data_visualizer = require("./routes/data_visualizer");

var _fields_service = require("./routes/fields_service");

var _file_data_visualizer = require("./routes/file_data_visualizer");

var _filters = require("./routes/filters");

var _indices = require("./routes/indices");

var _job_audit_messages = require("./routes/job_audit_messages");

var _anomaly_detectors = require("./routes/anomaly_detectors");

var _job_service = require("./routes/job_service");

var _job_validation = require("./routes/job_validation");

var _notification_settings = require("./routes/notification_settings");

var _results_service = require("./routes/results_service");

var _system = require("./routes/system");

var _license = require("./lib/license");

var _shared_services = require("./shared_services");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MlServerPlugin {
  constructor(ctx) {
    _defineProperty(this, "log", void 0);

    _defineProperty(this, "version", void 0);

    _defineProperty(this, "mlLicense", void 0);

    this.log = ctx.logger.get();
    this.version = ctx.env.packageInfo.branch;
    this.mlLicense = new _license.MlServerLicense();
  }

  setup(coreSetup, plugins) {
    plugins.features.registerFeature({
      id: _app.PLUGIN_ID,
      name: _i18n.i18n.translate('xpack.ml.featureRegistry.mlFeatureName', {
        defaultMessage: 'Machine Learning'
      }),
      icon: _app.PLUGIN_ICON,
      order: 500,
      navLinkId: _app.PLUGIN_ID,
      app: [_app.PLUGIN_ID, 'kibana'],
      catalogue: [_app.PLUGIN_ID],
      privileges: null,
      reserved: {
        privilege: {
          app: [_app.PLUGIN_ID, 'kibana'],
          catalogue: [_app.PLUGIN_ID],
          savedObject: {
            all: [],
            read: []
          },
          ui: []
        },
        description: _i18n.i18n.translate('xpack.ml.feature.reserved.description', {
          defaultMessage: 'To grant users access, you should also assign either the machine_learning_user or machine_learning_admin role.'
        })
      }
    });
    this.mlLicense.setup(plugins.licensing.license$, [mlLicense => (0, _sample_data_sets.initSampleDataSets)(mlLicense, plugins)]); // Can access via router's handler function 'context' parameter - context.ml.mlClient

    const mlClient = coreSetup.elasticsearch.createClient(_app.PLUGIN_ID, {
      plugins: [_elasticsearch_ml.elasticsearchJsPlugin]
    });
    coreSetup.http.registerRouteHandlerContext(_app.PLUGIN_ID, (context, request) => {
      return {
        mlClient: mlClient.asScoped(request)
      };
    });
    const routeInit = {
      router: coreSetup.http.createRouter(),
      mlLicense: this.mlLicense
    };
    (0, _annotations.annotationRoutes)(routeInit, plugins.security);
    (0, _calendars.calendars)(routeInit);
    (0, _datafeeds.dataFeedRoutes)(routeInit);
    (0, _data_frame_analytics.dataFrameAnalyticsRoutes)(routeInit);
    (0, _modules.dataRecognizer)(routeInit);
    (0, _data_visualizer.dataVisualizerRoutes)(routeInit);
    (0, _fields_service.fieldsService)(routeInit);
    (0, _file_data_visualizer.fileDataVisualizerRoutes)(routeInit);
    (0, _filters.filtersRoutes)(routeInit);
    (0, _indices.indicesRoutes)(routeInit);
    (0, _job_audit_messages.jobAuditMessagesRoutes)(routeInit);
    (0, _anomaly_detectors.jobRoutes)(routeInit);
    (0, _job_service.jobServiceRoutes)(routeInit);
    (0, _notification_settings.notificationRoutes)(routeInit);
    (0, _results_service.resultsServiceRoutes)(routeInit);
    (0, _job_validation.jobValidationRoutes)(routeInit, this.version);
    (0, _system.systemRoutes)(routeInit, {
      spaces: plugins.spaces,
      cloud: plugins.cloud
    });
    (0, _log.initMlServerLog)({
      log: this.log
    });
    (0, _telemetry.initMlTelemetry)(coreSetup, plugins.usageCollection);
    return { ...(0, _shared_services.createSharedServices)(this.mlLicense, plugins.spaces, plugins.cloud),
      mlClient
    };
  }

  start() {}

  stop() {
    this.mlLicense.unsubscribe();
  }

}

exports.MlServerPlugin = MlServerPlugin;