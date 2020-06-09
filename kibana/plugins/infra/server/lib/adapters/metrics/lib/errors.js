"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidNodeError = void 0;

var _apolloServerErrors = require("apollo-server-errors");

var _errors = require("../../../../../common/errors");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class InvalidNodeError extends _apolloServerErrors.ApolloError {
  constructor(message) {
    super(message, _errors.InfraMetricsErrorCodes.invalid_node);
    Object.defineProperty(this, 'name', {
      value: 'InvalidNodeError'
    });
  }

}

exports.InvalidNodeError = InvalidNodeError;