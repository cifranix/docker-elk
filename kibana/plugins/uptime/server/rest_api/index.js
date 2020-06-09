"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  restApiRoutes: true,
  createRouteWithAuth: true,
  uptimeRouteWrapper: true
};
Object.defineProperty(exports, "createRouteWithAuth", {
  enumerable: true,
  get: function () {
    return _create_route_with_auth.createRouteWithAuth;
  }
});
Object.defineProperty(exports, "uptimeRouteWrapper", {
  enumerable: true,
  get: function () {
    return _uptime_route_wrapper.uptimeRouteWrapper;
  }
});
exports.restApiRoutes = void 0;

var _overview_filters = require("./overview_filters");

var _pings = require("./pings");

var _dynamic_settings = require("./dynamic_settings");

var _telemetry = require("./telemetry");

var _snapshot = require("./snapshot");

var _monitors = require("./monitors");

var _get_ping_histogram = require("./pings/get_ping_histogram");

var _monitors_durations = require("./monitors/monitors_durations");

var _index_state = require("./index_state");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _create_route_with_auth = require("./create_route_with_auth");

var _uptime_route_wrapper = require("./uptime_route_wrapper");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const restApiRoutes = [_overview_filters.createGetOverviewFilters, _pings.createGetPingsRoute, _index_state.createGetIndexPatternRoute, _index_state.createGetIndexStatusRoute, _dynamic_settings.createGetDynamicSettingsRoute, _dynamic_settings.createPostDynamicSettingsRoute, _monitors.createGetMonitorRoute, _monitors.createGetMonitorDetailsRoute, _monitors.createGetMonitorLocationsRoute, _monitors.createGetStatusBarRoute, _snapshot.createGetSnapshotCount, _telemetry.createLogPageViewRoute, _get_ping_histogram.createGetPingHistogramRoute, _monitors_durations.createGetMonitorDurationRoute];
exports.restApiRoutes = restApiRoutes;