"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialLoadingState = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var initialLoadingState = {
  current: {
    progress: 'idle'
  },
  last: {
    result: 'uninitialized'
  },
  policy: {
    policy: 'manual'
  }
};
exports.initialLoadingState = initialLoadingState;