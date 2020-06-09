"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilteredMetrics = void 0;

var _metrics = require("../../../../common/inventory_models/metrics");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getFilteredMetrics = function getFilteredMetrics(requiredMetrics, metadata) {
  var metricMetadata = metadata.filter(function (data) {
    return data && data.source === 'metrics';
  }).map(function (data) {
    return data && data.name;
  });
  return requiredMetrics.filter(function (metric) {
    var metricModelCreator = _metrics.metrics.tsvb[metric]; // We just need to get a dummy version of the model so we can filter
    // using the `requires` attribute.

    var metricModel = metricModelCreator('@timestamp', 'test', '>=1m');
    return metricMetadata.some(function (m) {
      return m && metricModel.requires.includes(m);
    });
  });
};

exports.getFilteredMetrics = getFilteredMetrics;