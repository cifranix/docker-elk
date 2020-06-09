"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waffleOptionsReducer = exports.initialWaffleOptionsState = void 0;

var _redux = require("redux");

var _typescriptFsaReducers = require("typescript-fsa-reducers");

var _actions = require("./actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initialWaffleOptionsState = {
  metric: {
    type: 'cpu'
  },
  groupBy: [],
  nodeType: 'host',
  view: 'map',
  customOptions: [],
  boundsOverride: {
    max: 1,
    min: 0
  },
  autoBounds: true,
  accountId: '',
  region: '',
  customMetrics: []
};
exports.initialWaffleOptionsState = initialWaffleOptionsState;
var currentMetricReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.metric).case(_actions.changeMetric, function (current, target) {
  return target;
});
var currentCustomOptionsReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.customOptions).case(_actions.changeCustomOptions, function (current, target) {
  return target;
});
var currentGroupByReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.groupBy).case(_actions.changeGroupBy, function (current, target) {
  return target;
});
var currentNodeTypeReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.nodeType).case(_actions.changeNodeType, function (current, target) {
  return target;
});
var currentViewReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.view).case(_actions.changeView, function (current, target) {
  return target;
});
var currentBoundsOverrideReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.boundsOverride).case(_actions.changeBoundsOverride, function (current, target) {
  return target;
});
var currentAutoBoundsReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.autoBounds).case(_actions.changeAutoBounds, function (current, target) {
  return target;
});
var currentAccountIdReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.accountId).case(_actions.changeAccount, function (current, target) {
  return target;
});
var currentRegionReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.region).case(_actions.changeRegion, function (current, target) {
  return target;
});
var currentCustomMetricsReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialWaffleOptionsState.customMetrics).case(_actions.changeCustomMetrics, function (current, target) {
  return target;
});
var waffleOptionsReducer = (0, _redux.combineReducers)({
  metric: currentMetricReducer,
  groupBy: currentGroupByReducer,
  nodeType: currentNodeTypeReducer,
  view: currentViewReducer,
  customOptions: currentCustomOptionsReducer,
  boundsOverride: currentBoundsOverrideReducer,
  autoBounds: currentAutoBoundsReducer,
  accountId: currentAccountIdReducer,
  region: currentRegionReducer,
  customMetrics: currentCustomMetricsReducer
});
exports.waffleOptionsReducer = waffleOptionsReducer;