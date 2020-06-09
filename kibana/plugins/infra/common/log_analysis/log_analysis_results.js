"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareDatasetsByMaximumAnomalyScore = exports.getFriendlyNameForPartitionId = exports.formatAnomalyScore = exports.getSeverityCategoryForScore = exports.ML_SEVERITY_COLORS = exports.ML_SEVERITY_SCORES = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ML_SEVERITY_SCORES = {
  warning: 3,
  minor: 25,
  major: 50,
  critical: 75
};
exports.ML_SEVERITY_SCORES = ML_SEVERITY_SCORES;
const ML_SEVERITY_COLORS = {
  critical: 'rgb(228, 72, 72)',
  major: 'rgb(229, 113, 0)',
  minor: 'rgb(255, 221, 0)',
  warning: 'rgb(125, 180, 226)'
};
exports.ML_SEVERITY_COLORS = ML_SEVERITY_COLORS;

const getSeverityCategoryForScore = score => {
  if (score >= ML_SEVERITY_SCORES.critical) {
    return 'critical';
  } else if (score >= ML_SEVERITY_SCORES.major) {
    return 'major';
  } else if (score >= ML_SEVERITY_SCORES.minor) {
    return 'minor';
  } else if (score >= ML_SEVERITY_SCORES.warning) {
    return 'warning';
  } else {
    // Category is too low to include
    return undefined;
  }
};

exports.getSeverityCategoryForScore = getSeverityCategoryForScore;

const formatAnomalyScore = score => {
  return Math.round(score);
};

exports.formatAnomalyScore = formatAnomalyScore;

const getFriendlyNameForPartitionId = partitionId => {
  return partitionId !== '' ? partitionId : 'unknown';
};

exports.getFriendlyNameForPartitionId = getFriendlyNameForPartitionId;

const compareDatasetsByMaximumAnomalyScore = (firstDataset, secondDataset) => firstDataset.maximumAnomalyScore - secondDataset.maximumAnomalyScore;

exports.compareDatasetsByMaximumAnomalyScore = compareDatasetsByMaximumAnomalyScore;