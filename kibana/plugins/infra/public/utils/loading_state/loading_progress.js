"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRunningProgressReducer = exports.createIdleProgressReducer = exports.isRunningLoadingProgress = exports.isIdleLoadingProgress = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isIdleLoadingProgress = function isIdleLoadingProgress(loadingProgress) {
  return loadingProgress.progress === 'idle';
};

exports.isIdleLoadingProgress = isIdleLoadingProgress;

var isRunningLoadingProgress = function isRunningLoadingProgress(loadingProgress) {
  return loadingProgress.progress === 'running';
};

exports.isRunningLoadingProgress = isRunningLoadingProgress;

var createIdleProgressReducer = function createIdleProgressReducer() {
  return function (state) {
    return {
      progress: 'idle'
    };
  };
};

exports.createIdleProgressReducer = createIdleProgressReducer;

var createRunningProgressReducer = function createRunningProgressReducer() {
  return function (state, parameters) {
    return {
      parameters: parameters,
      progress: 'running',
      time: Date.now()
    };
  };
};

exports.createRunningProgressReducer = createRunningProgressReducer;