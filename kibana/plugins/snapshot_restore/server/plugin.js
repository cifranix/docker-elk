"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotRestoreServerPlugin = void 0;

var _operators = require("rxjs/operators");

var _i18n = require("@kbn/i18n");

var _common = require("../common");

var _services = require("./services");

var _routes = require("./routes");

var _lib = require("./lib");

var _elasticsearch_sr = require("./client/elasticsearch_sr");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SnapshotRestoreServerPlugin {
  constructor(context) {
    this.context = context;

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "apiRoutes", void 0);

    _defineProperty(this, "license", void 0);

    const {
      logger
    } = this.context;
    this.logger = logger.get();
    this.apiRoutes = new _routes.ApiRoutes();
    this.license = new _services.License();
  }

  async setup({
    http,
    elasticsearch
  }, {
    licensing,
    security,
    cloud
  }) {
    const pluginConfig = await this.context.config.create().pipe((0, _operators.first)()).toPromise();

    if (!pluginConfig.enabled) {
      return;
    }

    const router = http.createRouter();
    this.license.setup({
      pluginId: _common.PLUGIN.id,
      minimumLicenseType: _common.PLUGIN.minimumLicenseType,
      defaultErrorMessage: _i18n.i18n.translate('xpack.snapshotRestore.licenseCheckErrorMessage', {
        defaultMessage: 'License check failed'
      })
    }, {
      licensing,
      logger: this.logger
    });
    const esClientConfig = {
      plugins: [_elasticsearch_sr.elasticsearchJsPlugin]
    };
    const snapshotRestoreESClient = elasticsearch.createClient('snapshotRestore', esClientConfig);
    http.registerRouteHandlerContext('snapshotRestore', (ctx, request) => {
      return {
        client: snapshotRestoreESClient.asScoped(request)
      };
    });
    this.apiRoutes.setup({
      router,
      license: this.license,
      config: {
        isSecurityEnabled: () => security !== undefined && security.__legacyCompat.license.isEnabled(),
        isCloudEnabled: cloud !== undefined && cloud.isCloudEnabled,
        isSlmEnabled: pluginConfig.slm_ui.enabled
      },
      lib: {
        isEsError: _lib.isEsError,
        wrapEsError: _lib.wrapEsError
      }
    });
  }

  start() {
    this.logger.debug('Starting plugin');
  }

  stop() {
    this.logger.debug('Stopping plugin');
  }

}

exports.SnapshotRestoreServerPlugin = SnapshotRestoreServerPlugin;