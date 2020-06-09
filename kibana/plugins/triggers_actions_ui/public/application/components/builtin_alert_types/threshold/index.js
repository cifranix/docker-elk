"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlertType = getAlertType;

var _expression = require("./expression");

var _validation = require("./validation");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getAlertType() {
  return {
    id: '.index-threshold',
    name: 'Index threshold',
    iconClass: 'alert',
    alertParamsExpression: _expression.IndexThresholdAlertTypeExpression,
    validate: _validation.validateExpression
  };
}