"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexMgmtServerPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _common = require("../common");

var _routes = require("./routes");

var _services = require("./services");

var _is_es_error = require("./lib/is_es_error");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class IndexMgmtServerPlugin {
  constructor(initContext) {
    _defineProperty(this, "apiRoutes", void 0);

    _defineProperty(this, "license", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "indexDataEnricher", void 0);

    this.logger = initContext.logger.get();
    this.apiRoutes = new _routes.ApiRoutes();
    this.license = new _services.License();
    this.indexDataEnricher = new _services.IndexDataEnricher();
  }

  setup({
    http
  }, {
    licensing
  }) {
    const router = http.createRouter();
    this.license.setup({
      pluginId: _common.PLUGIN.id,
      minimumLicenseType: _common.PLUGIN.minimumLicenseType,
      defaultErrorMessage: _i18n.i18n.translate('xpack.idxMgmt.licenseCheckErrorMessage', {
        defaultMessage: 'License check failed'
      })
    }, {
      licensing,
      logger: this.logger
    });
    this.apiRoutes.setup({
      router,
      license: this.license,
      indexDataEnricher: this.indexDataEnricher,
      lib: {
        isEsError: _is_es_error.isEsError
      }
    });
    return {
      indexDataEnricher: {
        add: this.indexDataEnricher.add.bind(this.indexDataEnricher)
      }
    };
  }

  start() {}

  stop() {}

}

exports.IndexMgmtServerPlugin = IndexMgmtServerPlugin;