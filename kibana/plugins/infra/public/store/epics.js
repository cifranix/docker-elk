"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRootEpic = void 0;

var _reduxObservable = require("redux-observable");

var _local = require("./local");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createRootEpic = function createRootEpic() {
  return (0, _reduxObservable.combineEpics)((0, _local.createLocalEpic)());
};

exports.createRootEpic = createRootEpic;