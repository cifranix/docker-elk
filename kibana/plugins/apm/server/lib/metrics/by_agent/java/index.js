"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJavaMetricsCharts = getJavaMetricsCharts;

var _heap_memory = require("./heap_memory");

var _non_heap_memory = require("./non_heap_memory");

var _thread_count = require("./thread_count");

var _cpu = require("../shared/cpu");

var _memory = require("../shared/memory");

var _get_gc_rate_chart = require("./gc/get_gc_rate_chart");

var _get_gc_time_chart = require("./gc/get_gc_time_chart");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getJavaMetricsCharts(setup, serviceName, serviceNodeName) {
  const charts = await Promise.all([(0, _cpu.getCPUChartData)(setup, serviceName, serviceNodeName), (0, _memory.getMemoryChartData)(setup, serviceName, serviceNodeName), (0, _heap_memory.getHeapMemoryChart)(setup, serviceName, serviceNodeName), (0, _non_heap_memory.getNonHeapMemoryChart)(setup, serviceName, serviceNodeName), (0, _thread_count.getThreadCountChart)(setup, serviceName, serviceNodeName), (0, _get_gc_rate_chart.getGcRateChart)(setup, serviceName, serviceNodeName), (0, _get_gc_time_chart.getGcTimeChart)(setup, serviceName, serviceNodeName)]);
  return {
    charts
  };
}