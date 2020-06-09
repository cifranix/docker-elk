"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCollectors = registerCollectors;

var _register_usage_collector = require("./visualizations/register_usage_collector");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerCollectors(usageCollection, taskManager) {
  (0, _register_usage_collector.registerVisualizationsCollector)(usageCollection, taskManager);
}