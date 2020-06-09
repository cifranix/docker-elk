"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "mlInMemoryTableBasicFactory", {
  enumerable: true,
  get: function get() {
    return _ml_in_memory_table.mlInMemoryTableBasicFactory;
  }
});
exports.SORT_DIRECTION = exports.useRequest = exports.XJsonMode = exports.expandLiteralStrings = void 0;

var _ml_in_memory_table = require("../../../ml/public/application/components/ml_in_memory_table");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var expandLiteralStrings = jest.fn();
exports.expandLiteralStrings = expandLiteralStrings;
var XJsonMode = jest.fn();
exports.XJsonMode = XJsonMode;
var useRequest = jest.fn(function () {
  return {
    isLoading: false,
    error: null,
    data: undefined
  };
});
exports.useRequest = useRequest;
var SORT_DIRECTION = {
  ASC: 'asc'
};
exports.SORT_DIRECTION = SORT_DIRECTION;