"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchProfilerServerPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _common = require("../common");

var profileRoute = _interopRequireWildcard(require("./routes/profile"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchProfilerServerPlugin {
  constructor({
    logger
  }) {
    _defineProperty(this, "licenseStatus", void 0);

    _defineProperty(this, "log", void 0);

    this.log = logger.get();
    this.licenseStatus = {
      valid: false
    };
  }

  async setup({
    http
  }, {
    licensing,
    elasticsearch
  }) {
    const router = http.createRouter();
    profileRoute.register({
      elasticsearch,
      router,
      getLicenseStatus: () => this.licenseStatus,
      log: this.log
    });
    licensing.license$.subscribe(license => {
      const {
        state,
        message
      } = license.check(_common.PLUGIN.id, _common.PLUGIN.minimumLicenseType);
      const hasRequiredLicense = state === 'valid';

      if (hasRequiredLicense) {
        this.licenseStatus = {
          valid: true
        };
      } else {
        this.licenseStatus = {
          valid: false,
          message: message || // Ensure that there is a message when license check fails
          _i18n.i18n.translate('xpack.searchProfiler.licenseCheckErrorMessage', {
            defaultMessage: 'License check failed'
          })
        };

        if (message) {
          this.log.info(message);
        }
      }
    });
  }

  start() {}

  stop() {}

}

exports.SearchProfilerServerPlugin = SearchProfilerServerPlugin;