"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTimeRangeWithInterval = void 0;

var _lodash = require("lodash");

var _query_helpers = require("./query_helpers");

var _calculate_metric_interval = require("../../utils/calculate_metric_interval");

var _types = require("../../../common/inventory_models/types");

var _get_dataset_for_field = require("../../routes/metrics_explorer/lib/get_dataset_for_field");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createTimeRangeWithInterval = async (framework, requestContext, options) => {
  const aggregations = (0, _query_helpers.getMetricsAggregations)(options);
  const modules = await aggregationsToModules(framework, requestContext, aggregations, options);
  const interval = Math.max((await (0, _calculate_metric_interval.calculateMetricInterval)(framework, requestContext, {
    indexPattern: options.sourceConfiguration.metricAlias,
    timestampField: options.sourceConfiguration.fields.timestamp,
    timerange: {
      from: options.timerange.from,
      to: options.timerange.to
    }
  }, modules, options.nodeType)) || 60, 60);
  return {
    interval: `${interval}s`,
    from: options.timerange.to - interval * 5000,
    // We need at least 5 buckets worth of data
    to: options.timerange.to
  };
};

exports.createTimeRangeWithInterval = createTimeRangeWithInterval;

const aggregationsToModules = async (framework, requestContext, aggregations, options) => {
  const uniqueFields = Object.values(aggregations).reduce((fields, agg) => {
    if (_types.SnapshotModelMetricAggRT.is(agg)) {
      return (0, _lodash.uniq)(fields.concat(Object.values(agg).map(a => a === null || a === void 0 ? void 0 : a.field)));
    }

    return fields;
  }, []).filter(v => v);
  const fields = await Promise.all(uniqueFields.map(async field => await (0, _get_dataset_for_field.getDatasetForField)(framework, requestContext, field, options.sourceConfiguration.metricAlias)));
  return fields.filter(f => f);
};