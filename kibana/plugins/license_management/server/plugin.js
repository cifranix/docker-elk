"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicenseManagementServerPlugin = void 0;

var _routes = require("./routes");

var _is_es_error = require("./lib/is_es_error");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class LicenseManagementServerPlugin {
  constructor() {
    _defineProperty(this, "apiRoutes", new _routes.ApiRoutes());
  }

  setup({
    http
  }, {
    licensing,
    security
  }) {
    const router = http.createRouter();
    this.apiRoutes.setup({
      router,
      plugins: {
        licensing
      },
      lib: {
        isEsError: _is_es_error.isEsError
      },
      config: {
        isSecurityEnabled: security !== undefined
      }
    });
  }

  start() {}

  stop() {}

}

exports.LicenseManagementServerPlugin = LicenseManagementServerPlugin;