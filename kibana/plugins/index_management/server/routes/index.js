"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiRoutes = void 0;

var _indices = require("./api/indices");

var _templates = require("./api/templates");

var _mapping = require("./api/mapping");

var _settings = require("./api/settings");

var _stats = require("./api/stats");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class ApiRoutes {
  setup(dependencies) {
    (0, _indices.registerIndicesRoutes)(dependencies);
    (0, _templates.registerTemplateRoutes)(dependencies);
    (0, _settings.registerSettingsRoutes)(dependencies);
    (0, _stats.registerStatsRoute)(dependencies);
    (0, _mapping.registerMappingRoute)(dependencies);
  }

  start() {}

  stop() {}

}

exports.ApiRoutes = ApiRoutes;