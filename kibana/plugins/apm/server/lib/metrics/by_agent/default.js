"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultMetricsCharts = getDefaultMetricsCharts;

var _cpu = require("./shared/cpu");

var _memory = require("./shared/memory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getDefaultMetricsCharts(setup, serviceName) {
  const charts = await Promise.all([(0, _cpu.getCPUChartData)(setup, serviceName), (0, _memory.getMemoryChartData)(setup, serviceName)]);
  return {
    charts
  };
}