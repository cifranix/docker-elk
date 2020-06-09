"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerVisualizationsCollector = registerVisualizationsCollector;

var _get_usage_collector = require("./get_usage_collector");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerVisualizationsCollector(collectorSet, taskManager) {
  const collector = collectorSet.makeUsageCollector((0, _get_usage_collector.getUsageCollector)(taskManager));
  collectorSet.registerCollector(collector);
}