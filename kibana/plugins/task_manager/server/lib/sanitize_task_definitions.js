"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeTaskDefinitions = sanitizeTaskDefinitions;

var _joi = _interopRequireDefault(require("joi"));

var _task = require("../task");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Sanitizes the system's task definitions. Task definitions have optional properties, and
 * this ensures they all are given a reasonable default.
 *
 * @param taskDefinitions - The Kibana task definitions dictionary
 */
function sanitizeTaskDefinitions(taskDefinitions = {}) {
  return Object.keys(taskDefinitions).reduce((acc, type) => {
    const rawDefinition = taskDefinitions[type];
    rawDefinition.type = type;
    acc[type] = _joi.default.attempt(rawDefinition, _task.validateTaskDefinition);
    return acc;
  }, {});
}