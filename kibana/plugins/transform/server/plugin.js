"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformServerPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _elasticsearch_transform = require("./client/elasticsearch_transform");

var _routes = require("./routes");

var _services = require("./services");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const basicLicense = 'basic';
const PLUGIN = {
  id: 'transform',
  minimumLicenseType: basicLicense,
  getI18nName: () => _i18n.i18n.translate('xpack.transform.appTitle', {
    defaultMessage: 'Transforms'
  })
};

class TransformServerPlugin {
  constructor(initContext) {
    _defineProperty(this, "apiRoutes", void 0);

    _defineProperty(this, "license", void 0);

    _defineProperty(this, "logger", void 0);

    this.logger = initContext.logger.get();
    this.apiRoutes = new _routes.ApiRoutes();
    this.license = new _services.License();
  }

  setup({
    elasticsearch,
    http
  }, {
    licensing
  }) {
    const router = http.createRouter();
    this.license.setup({
      pluginId: PLUGIN.id,
      minimumLicenseType: PLUGIN.minimumLicenseType,
      defaultErrorMessage: _i18n.i18n.translate('xpack.transform.licenseCheckErrorMessage', {
        defaultMessage: 'License check failed'
      })
    }, {
      licensing,
      logger: this.logger
    });
    this.apiRoutes.setup({
      router,
      license: this.license
    }); // Can access via new platform router's handler function 'context' parameter - context.transform.client

    const transformClient = elasticsearch.createClient('transform', {
      plugins: [_elasticsearch_transform.elasticsearchJsPlugin]
    });
    http.registerRouteHandlerContext('transform', (context, request) => {
      return {
        dataClient: transformClient.asScoped(request)
      };
    });
    return {};
  }

  start() {}

  stop() {}

}

exports.TransformServerPlugin = TransformServerPlugin;