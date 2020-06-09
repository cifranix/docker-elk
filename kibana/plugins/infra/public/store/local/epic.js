"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLocalEpic = void 0;

var _reduxObservable = require("redux-observable");

var _waffle_time = require("./waffle_time");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createLocalEpic = function createLocalEpic() {
  return (0, _reduxObservable.combineEpics)((0, _waffle_time.createWaffleTimeEpic)());
};

exports.createLocalEpic = createLocalEpic;