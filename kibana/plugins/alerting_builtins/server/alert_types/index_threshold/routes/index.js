"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoutes = registerRoutes;

var _time_series_query = require("./time_series_query");

var _fields = require("./fields");

var _indices = require("./indices");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerRoutes(params) {
  const {
    service,
    router,
    baseRoute
  } = params;
  (0, _time_series_query.createTimeSeriesQueryRoute)(service, router, baseRoute);
  (0, _fields.createFieldsRoute)(service, router, baseRoute);
  (0, _indices.createIndicesRoute)(service, router, baseRoute);
}