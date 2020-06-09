"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCustomMetrics = exports.selectRegion = exports.selectAccountId = exports.selectAutoBounds = exports.selectBoundsOverride = exports.selectView = exports.selectNodeType = exports.selectCustomOptions = exports.selectGroupBy = exports.selectMetric = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectMetric = function selectMetric(state) {
  return state.metric;
};

exports.selectMetric = selectMetric;

var selectGroupBy = function selectGroupBy(state) {
  return state.groupBy;
};

exports.selectGroupBy = selectGroupBy;

var selectCustomOptions = function selectCustomOptions(state) {
  return state.customOptions;
};

exports.selectCustomOptions = selectCustomOptions;

var selectNodeType = function selectNodeType(state) {
  return state.nodeType;
};

exports.selectNodeType = selectNodeType;

var selectView = function selectView(state) {
  return state.view;
};

exports.selectView = selectView;

var selectBoundsOverride = function selectBoundsOverride(state) {
  return state.boundsOverride;
};

exports.selectBoundsOverride = selectBoundsOverride;

var selectAutoBounds = function selectAutoBounds(state) {
  return state.autoBounds;
};

exports.selectAutoBounds = selectAutoBounds;

var selectAccountId = function selectAccountId(state) {
  return state.accountId;
};

exports.selectAccountId = selectAccountId;

var selectRegion = function selectRegion(state) {
  return state.region;
};

exports.selectRegion = selectRegion;

var selectCustomMetrics = function selectCustomMetrics(state) {
  return state.customMetrics;
};

exports.selectCustomMetrics = selectCustomMetrics;