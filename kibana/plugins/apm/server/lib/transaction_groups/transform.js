"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionGroupsTransformer = transactionGroupsTransformer;

var _moment = _interopRequireDefault(require("moment"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function calculateRelativeImpacts(transactionGroups) {
  const values = transactionGroups.map(({
    impact
  }) => impact).filter(value => value !== null);
  const max = Math.max(...values);
  const min = Math.min(...values);
  return transactionGroups.map(bucket => ({ ...bucket,
    impact: bucket.impact !== null ? (bucket.impact - min) / (max - min) * 100 || 0 : 0
  }));
}

const getBuckets = response => {
  if (response.aggregations) {
    return (0, _lodash.sortByOrder)(response.aggregations.transaction_groups.buckets, ['sum.value'], ['desc']);
  }

  return [];
};

function getTransactionGroup(bucket, minutes) {
  const averageResponseTime = bucket.avg.value;
  const transactionsPerMinute = bucket.doc_count / minutes;
  const impact = bucket.sum.value;
  const sample = bucket.sample.hits.hits[0]._source;
  return {
    name: bucket.key.transaction,
    sample,
    p95: bucket.p95.values['95.0'],
    averageResponseTime,
    transactionsPerMinute,
    impact
  };
}

function transactionGroupsTransformer({
  response,
  start,
  end
}) {
  const buckets = getBuckets(response);

  const duration = _moment.default.duration(end - start);

  const minutes = duration.asMinutes();
  const transactionGroups = buckets.map(bucket => getTransactionGroup(bucket, minutes));
  return calculateRelativeImpacts(transactionGroups);
}