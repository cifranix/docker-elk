"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFormatterForMetric = void 0;

var _formatters = require("../../../utils/formatters");

var _lib = require("../../../lib/lib");

var _metric_to_format = require("./metric_to_format");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createFormatterForMetric = function createFormatterForMetric(metric) {
  if (metric && metric.field) {
    var format = (0, _metric_to_format.metricToFormat)(metric);

    if (format === _lib.InfraFormatterType.bits && metric.aggregation === 'rate') {
      return (0, _formatters.createFormatter)(_lib.InfraFormatterType.bits, '{{value}}/s');
    }

    return (0, _formatters.createFormatter)(format);
  }

  return (0, _formatters.createFormatter)(_lib.InfraFormatterType.number);
};

exports.createFormatterForMetric = createFormatterForMetric;