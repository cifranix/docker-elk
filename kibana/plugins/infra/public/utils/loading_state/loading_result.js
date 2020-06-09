"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFailureResultReducer = exports.createFailureResult = exports.createSuccessResultReducer = exports.createSuccessResult = exports.getTimeOrDefault = exports.isExhaustedLoadingResult = exports.isFailureLoadingResult = exports.isSuccessLoadingResult = exports.isUninitializedLoadingResult = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isUninitializedLoadingResult = function isUninitializedLoadingResult(loadingResult) {
  return loadingResult.result === 'uninitialized';
};

exports.isUninitializedLoadingResult = isUninitializedLoadingResult;

var isSuccessLoadingResult = function isSuccessLoadingResult(loadingResult) {
  return loadingResult.result === 'success';
};

exports.isSuccessLoadingResult = isSuccessLoadingResult;

var isFailureLoadingResult = function isFailureLoadingResult(loadingResult) {
  return loadingResult.result === 'failure';
};

exports.isFailureLoadingResult = isFailureLoadingResult;

var isExhaustedLoadingResult = function isExhaustedLoadingResult(loadingResult) {
  return isSuccessLoadingResult(loadingResult) && loadingResult.isExhausted;
};

exports.isExhaustedLoadingResult = isExhaustedLoadingResult;

var getTimeOrDefault = function getTimeOrDefault(loadingResult, defaultValue) {
  return isUninitializedLoadingResult(loadingResult) ? defaultValue || null : loadingResult.time;
};

exports.getTimeOrDefault = getTimeOrDefault;

var createSuccessResult = function createSuccessResult(parameters, isExhausted) {
  return {
    isExhausted: isExhausted,
    parameters: parameters,
    result: 'success',
    time: Date.now()
  };
};

exports.createSuccessResult = createSuccessResult;

var createSuccessResultReducer = function createSuccessResultReducer(isExhausted) {
  return function (state, _ref) {
    var params = _ref.params,
        result = _ref.result;
    return createSuccessResult(params, isExhausted(params, result));
  };
};

exports.createSuccessResultReducer = createSuccessResultReducer;

var createFailureResult = function createFailureResult(parameters, reason) {
  return {
    parameters: parameters,
    reason: reason,
    result: 'failure',
    time: Date.now()
  };
};

exports.createFailureResult = createFailureResult;

var createFailureResultReducer = function createFailureResultReducer() {
  var convertErrorToString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (error) {
    return "".concat(error);
  };
  return function (state, _ref2) {
    var params = _ref2.params,
        error = _ref2.error;
    return createFailureResult(params, convertErrorToString(error));
  };
};

exports.createFailureResultReducer = createFailureResultReducer;