"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateHistogramOffset = exports.getMetricsAggregations = exports.metricToAggregation = exports.getMetricsSources = exports.getGroupedNodesSources = exports.getFieldByNodeType = void 0;

var _i18n = require("@kbn/i18n");

var _index = require("../../../common/inventory_models/index");

var _get_interval_in_seconds = require("../../utils/get_interval_in_seconds");

var _types = require("../../../common/inventory_models/types");

var _snapshot_api = require("../../../common/http_api/snapshot_api");

var _network_traffic = require("../../../common/inventory_models/shared/metrics/snapshot/network_traffic");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getFieldByNodeType = options => {
  const inventoryFields = (0, _index.findInventoryFields)(options.nodeType, options.sourceConfiguration.fields);
  return inventoryFields.id;
};

exports.getFieldByNodeType = getFieldByNodeType;

const getGroupedNodesSources = options => {
  const fields = (0, _index.findInventoryFields)(options.nodeType, options.sourceConfiguration.fields);
  const sources = options.groupBy.map(gb => {
    return {
      [`${gb.field}`]: {
        terms: {
          field: gb.field
        }
      }
    };
  });
  sources.push({
    id: {
      terms: {
        field: fields.id
      }
    }
  });
  sources.push({
    name: {
      terms: {
        field: fields.name,
        missing_bucket: true
      }
    }
  });
  return sources;
};

exports.getGroupedNodesSources = getGroupedNodesSources;

const getMetricsSources = options => {
  const fields = (0, _index.findInventoryFields)(options.nodeType, options.sourceConfiguration.fields);
  return [{
    id: {
      terms: {
        field: fields.id
      }
    }
  }];
};

exports.getMetricsSources = getMetricsSources;

const metricToAggregation = (nodeType, metric) => {
  var _inventoryModel$metri;

  const inventoryModel = (0, _index.findInventoryModel)(nodeType);

  if (_snapshot_api.SnapshotCustomMetricInputRT.is(metric)) {
    if (metric.aggregation === 'rate') {
      return (0, _network_traffic.networkTraffic)(metric.type, metric.field);
    }

    return {
      custom: {
        [metric.aggregation]: {
          field: metric.field
        }
      }
    };
  }

  return (_inventoryModel$metri = inventoryModel.metrics.snapshot) === null || _inventoryModel$metri === void 0 ? void 0 : _inventoryModel$metri[metric.type];
};

exports.metricToAggregation = metricToAggregation;

const getMetricsAggregations = options => {
  const aggregation = metricToAggregation(options.nodeType, options.metric);

  if (!_types.SnapshotModelRT.is(aggregation)) {
    throw new Error(_i18n.i18n.translate('xpack.infra.snapshot.missingSnapshotMetricError', {
      defaultMessage: 'The aggregation for {metric} for {nodeType} is not available.',
      values: {
        nodeType: options.nodeType,
        metric: options.metric.type
      }
    }));
  }

  return aggregation;
};

exports.getMetricsAggregations = getMetricsAggregations;

const getDateHistogramOffset = (from, interval) => {
  const fromInSeconds = Math.floor(from / 1000);
  const bucketSizeInSeconds = (0, _get_interval_in_seconds.getIntervalInSeconds)(interval); // negative offset to align buckets with full intervals (e.g. minutes)

  const offset = fromInSeconds % bucketSizeInSeconds - bucketSizeInSeconds;
  return `${offset}s`;
};

exports.getDateHistogramOffset = getDateHistogramOffset;