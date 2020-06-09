"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waffleTimeReducer = exports.initialWaffleTimeState = void 0;

var _redux = require("redux");

var _dist = require("typescript-fsa-reducers/dist");

var _actions = require("./actions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initialWaffleTimeState = {
  currentTime: Date.now(),
  updatePolicy: {
    policy: 'manual'
  }
};
exports.initialWaffleTimeState = initialWaffleTimeState;
var currentTimeReducer = (0, _dist.reducerWithInitialState)(initialWaffleTimeState.currentTime).case(_actions.jumpToTime, function (currentTime, targetTime) {
  return targetTime;
});
var updatePolicyReducer = (0, _dist.reducerWithInitialState)(initialWaffleTimeState.updatePolicy).case(_actions.startAutoReload, function () {
  return {
    policy: 'interval',
    interval: 5000
  };
}).case(_actions.stopAutoReload, function () {
  return {
    policy: 'manual'
  };
});
var waffleTimeReducer = (0, _redux.combineReducers)({
  currentTime: currentTimeReducer,
  updatePolicy: updatePolicyReducer
});
exports.waffleTimeReducer = waffleTimeReducer;