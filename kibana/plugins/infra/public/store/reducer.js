"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialState = void 0;

var _redux = require("redux");

var _local = require("./local");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initialState = {
  local: _local.initialLocalState
};
exports.initialState = initialState;
var reducer = (0, _redux.combineReducers)({
  local: _local.localReducer
});
exports.reducer = reducer;