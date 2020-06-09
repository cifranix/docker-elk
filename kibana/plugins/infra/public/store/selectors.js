"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waffleOptionsSelectors = exports.waffleTimeSelectors = exports.waffleFilterSelectors = void 0;

var _typed_redux = require("../utils/typed_redux");

var _local = require("./local");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * local selectors
 */
var selectLocal = function selectLocal(state) {
  return state.local;
};

var waffleFilterSelectors = (0, _typed_redux.globalizeSelectors)(selectLocal, _local.waffleFilterSelectors);
exports.waffleFilterSelectors = waffleFilterSelectors;
var waffleTimeSelectors = (0, _typed_redux.globalizeSelectors)(selectLocal, _local.waffleTimeSelectors);
exports.waffleTimeSelectors = waffleTimeSelectors;
var waffleOptionsSelectors = (0, _typed_redux.globalizeSelectors)(selectLocal, _local.waffleOptionsSelectors);
exports.waffleOptionsSelectors = waffleOptionsSelectors;