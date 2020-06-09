"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodeMetrics = exports.getNodeMetricsForLookup = exports.getNodePath = exports.getIPFromBucket = exports.isIPv4 = void 0;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _get_interval_in_seconds = require("../../utils/get_interval_in_seconds");

var _inventory_models = require("../../../common/inventory_models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const isIPv4 = subject => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(subject);

exports.isIPv4 = isIPv4;

const getIPFromBucket = (nodeType, bucket) => {
  const inventoryModel = (0, _inventory_models.findInventoryModel)(nodeType);

  if (!inventoryModel.fields.ip) {
    return null;
  }

  const ip = (0, _lodash.get)(bucket, `ip.hits.hits[0]._source.${inventoryModel.fields.ip}`, null);

  if (Array.isArray(ip)) {
    return ip.find(isIPv4) || null;
  } else if (typeof ip === 'string') {
    return ip;
  }

  return null;
};

exports.getIPFromBucket = getIPFromBucket;

const getNodePath = (groupBucket, options) => {
  const node = groupBucket.key;
  const path = options.groupBy.map(gb => {
    return {
      value: node[`${gb.field}`],
      label: node[`${gb.field}`]
    };
  });
  const ip = getIPFromBucket(options.nodeType, groupBucket);
  path.push({
    value: node.id,
    label: node.name || node.id,
    ip
  });
  return path;
};

exports.getNodePath = getNodePath;

const getNodeMetricsForLookup = metrics => {
  return metrics.reduce((acc, metric) => {
    acc[`${metric.key.id}`] = metric.histogram.buckets;
    return acc;
  }, {});
}; // In the returned object,
// value contains the value from the last bucket spanning a full interval
// max and avg are calculated from all buckets returned for the timerange


exports.getNodeMetricsForLookup = getNodeMetricsForLookup;

const getNodeMetrics = (nodeBuckets, options) => {
  if (!nodeBuckets) {
    return {
      name: options.metric.type,
      value: null,
      max: null,
      avg: null
    };
  }

  const lastBucket = findLastFullBucket(nodeBuckets, options);
  const result = {
    name: options.metric.type,
    value: getMetricValueFromBucket(options.metric.type, lastBucket),
    max: calculateMax(nodeBuckets, options.metric.type),
    avg: calculateAvg(nodeBuckets, options.metric.type)
  };
  return result;
};

exports.getNodeMetrics = getNodeMetrics;

const findLastFullBucket = (buckets, options) => {
  const to = _moment.default.utc(options.timerange.to);

  const bucketSize = (0, _get_interval_in_seconds.getIntervalInSeconds)(options.timerange.interval);
  return buckets.reduce((current, item) => {
    const itemKey = (0, _lodash.isNumber)(item.key) ? item.key : parseInt(item.key, 10);

    const date = _moment.default.utc(itemKey + bucketSize * 1000);

    if (!date.isAfter(to) && item.doc_count > 0) {
      return item;
    }

    return current;
  }, (0, _lodash.last)(buckets));
};

const getMetricValueFromBucket = (type, bucket) => {
  const metric = bucket[type];
  return metric && (metric.normalized_value || metric.value) || 0;
};

function calculateMax(buckets, type) {
  return (0, _lodash.max)(buckets.map(bucket => getMetricValueFromBucket(type, bucket))) || 0;
}

function calculateAvg(buckets, type) {
  return (0, _lodash.sum)(buckets.map(bucket => getMetricValueFromBucket(type, bucket))) / buckets.length || 0;
}