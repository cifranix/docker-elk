"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_TREE_DEPTH = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Prevent recursive data structures from blowing up the JS call stack.
var MAX_TREE_DEPTH = 40;
exports.MAX_TREE_DEPTH = MAX_TREE_DEPTH;