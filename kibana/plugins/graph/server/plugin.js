"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphPlugin = void 0;

var _license_state = require("./lib/license_state");

var _search = require("./routes/search");

var _explore = require("./routes/explore");

var _sample_data = require("./sample_data");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GraphPlugin {
  constructor() {
    _defineProperty(this, "licenseState", null);
  }

  async setup(core, {
    licensing,
    home
  }) {
    const licenseState = new _license_state.LicenseState();
    licenseState.start(licensing.license$);
    this.licenseState = licenseState;

    if (home) {
      (0, _sample_data.registerSampleData)(home.sampleData, licenseState);
    }

    const router = core.http.createRouter();
    (0, _search.registerSearchRoute)({
      licenseState,
      router
    });
    (0, _explore.registerExploreRoute)({
      licenseState,
      router
    });
  }

  start() {}

  stop() {
    if (this.licenseState) {
      this.licenseState.stop();
    }
  }

}

exports.GraphPlugin = GraphPlugin;