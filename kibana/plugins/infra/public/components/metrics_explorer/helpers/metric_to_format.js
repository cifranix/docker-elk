"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metricToFormat = void 0;

var _lodash = require("lodash");

var _lib = require("../../../lib/lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var metricToFormat = function metricToFormat(metric) {
  if (metric && metric.field) {
    var suffix = (0, _lodash.last)(metric.field.split(/\./));

    if (suffix === 'pct') {
      return _lib.InfraFormatterType.percent;
    }

    if (suffix === 'bytes' && metric.aggregation === 'rate') {
      return _lib.InfraFormatterType.bits;
    }

    if (suffix === 'bytes') {
      return _lib.InfraFormatterType.bytes;
    }
  }

  return _lib.InfraFormatterType.number;
};

exports.metricToFormat = metricToFormat;