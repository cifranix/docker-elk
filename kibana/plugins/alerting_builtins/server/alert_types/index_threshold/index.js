"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getService = getService;
exports.register = register;
exports.DEFAULT_GROUPS = exports.MAX_GROUPS = exports.MAX_INTERVALS = void 0;

var _time_series_query = require("./lib/time_series_query");

var _alert_type = require("./alert_type");

var _routes = require("./routes");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// future enhancement: make these configurable?
const MAX_INTERVALS = 1000;
exports.MAX_INTERVALS = MAX_INTERVALS;
const MAX_GROUPS = 1000;
exports.MAX_GROUPS = MAX_GROUPS;
const DEFAULT_GROUPS = 100;
exports.DEFAULT_GROUPS = DEFAULT_GROUPS;

function getService() {
  return {
    timeSeriesQuery: _time_series_query.timeSeriesQuery
  };
}

function register(params) {
  const {
    service,
    router,
    alerting,
    baseRoute
  } = params;
  alerting.registerType((0, _alert_type.getAlertType)(service));
  const baseBuiltInRoute = `${baseRoute}/index_threshold`;
  (0, _routes.registerRoutes)({
    service,
    router,
    baseRoute: baseBuiltInRoute
  });
}