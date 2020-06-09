"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.podMemoryUsage = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const podMemoryUsage = (timeField, indexPattern, interval) => ({
  id: 'podMemoryUsage',
  requires: ['kubernetes.pod'],
  index_pattern: indexPattern,
  interval,
  time_field: timeField,
  type: 'timeseries',
  series: [{
    id: 'memory',
    split_mode: 'everything',
    metrics: [{
      field: 'kubernetes.pod.memory.usage.node.pct',
      id: 'avg-memory-usage',
      type: 'avg'
    }]
  }]
});

exports.podMemoryUsage = podMemoryUsage;