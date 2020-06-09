"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapError = wrapError;
exports.wrapIntoCustomErrorResponse = wrapIntoCustomErrorResponse;
exports.getErrorStatusCode = getErrorStatusCode;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function wrapError(error) {
  return _boom.default.boomify(error, {
    statusCode: getErrorStatusCode(error)
  });
}
/**
 * Wraps error into error suitable for Core's custom error response.
 * @param error Any error instance.
 */


function wrapIntoCustomErrorResponse(error) {
  const wrappedError = wrapError(error);
  return {
    body: wrappedError,
    headers: wrappedError.output.headers,
    statusCode: wrappedError.output.statusCode
  };
}
/**
 * Extracts error code from Boom and Elasticsearch "native" errors.
 * @param error Error instance to extract status code from.
 */


function getErrorStatusCode(error) {
  return _boom.default.isBoom(error) ? error.output.statusCode : error.statusCode || error.status;
}