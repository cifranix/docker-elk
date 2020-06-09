"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localReducer = exports.initialLocalState = void 0;

var _redux = require("redux");

var _waffle_filter = require("./waffle_filter");

var _waffle_options = require("./waffle_options");

var _waffle_time = require("./waffle_time");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initialLocalState = {
  waffleFilter: _waffle_filter.initialWaffleFilterState,
  waffleTime: _waffle_time.initialWaffleTimeState,
  waffleMetrics: _waffle_options.initialWaffleOptionsState
};
exports.initialLocalState = initialLocalState;
var localReducer = (0, _redux.combineReducers)({
  waffleFilter: _waffle_filter.waffleFilterReducer,
  waffleTime: _waffle_time.waffleTimeReducer,
  waffleMetrics: _waffle_options.waffleOptionsReducer
});
exports.localReducer = localReducer;