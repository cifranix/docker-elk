"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldShowTelemetryOptIn = shouldShowTelemetryOptIn;
Object.defineProperty(exports, "TelemetryPluginSetup", {
  enumerable: true,
  get: function get() {
    return _public.TelemetryPluginSetup;
  }
});
Object.defineProperty(exports, "OptInExampleFlyout", {
  enumerable: true,
  get: function get() {
    return _components.OptInExampleFlyout;
  }
});
Object.defineProperty(exports, "PRIVACY_STATEMENT_URL", {
  enumerable: true,
  get: function get() {
    return _constants.PRIVACY_STATEMENT_URL;
  }
});

var _public = require("../../../../../../src/plugins/telemetry/public");

var _components = require("../../../../../../src/plugins/telemetry_management_section/public/components");

var _constants = require("../../../../../../src/plugins/telemetry/common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function shouldShowTelemetryOptIn(telemetry) {
  if (telemetry) {
    var telemetryService = telemetry.telemetryService;
    var isOptedIn = telemetryService.getIsOptedIn();
    var canChangeOptInStatus = telemetryService.getCanChangeOptInStatus();
    return canChangeOptInStatus && !isOptedIn;
  }

  return false;
}