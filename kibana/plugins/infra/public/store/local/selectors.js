"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waffleOptionsSelectors = exports.waffleTimeSelectors = exports.waffleFilterSelectors = void 0;

var _typed_redux = require("../../utils/typed_redux");

var _waffle_filter = require("./waffle_filter");

var _waffle_options = require("./waffle_options");

var _waffle_time = require("./waffle_time");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var waffleFilterSelectors = (0, _typed_redux.globalizeSelectors)(function (state) {
  return state.waffleFilter;
}, _waffle_filter.waffleFilterSelectors);
exports.waffleFilterSelectors = waffleFilterSelectors;
var waffleTimeSelectors = (0, _typed_redux.globalizeSelectors)(function (state) {
  return state.waffleTime;
}, _waffle_time.waffleTimeSelectors);
exports.waffleTimeSelectors = waffleTimeSelectors;
var waffleOptionsSelectors = (0, _typed_redux.globalizeSelectors)(function (state) {
  return state.waffleMetrics;
}, _waffle_options.waffleOptionsSelectors);
exports.waffleOptionsSelectors = waffleOptionsSelectors;