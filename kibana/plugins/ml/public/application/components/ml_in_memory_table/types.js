"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlInMemoryTableBasicFactory = mlInMemoryTableBasicFactory;
exports.SORT_DIRECTION = void 0;

var _eui = require("@elastic/eui");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SORT_DIRECTION;
exports.SORT_DIRECTION = SORT_DIRECTION;

(function (SORT_DIRECTION) {
  SORT_DIRECTION["ASC"] = "asc";
  SORT_DIRECTION["DESC"] = "desc";
})(SORT_DIRECTION || (exports.SORT_DIRECTION = SORT_DIRECTION = {}));

function mlInMemoryTableBasicFactory() {
  return _eui.EuiInMemoryTable;
}