"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACTION_TYPES = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ACTION_TYPES = {
  EMAIL: 'email',
  WEBHOOK: 'webhook',
  INDEX: 'index',
  LOGGING: 'logging',
  SLACK: 'slack',
  JIRA: 'jira',
  PAGERDUTY: 'pagerduty',
  UNKNOWN: 'unknown/invalid'
};
exports.ACTION_TYPES = ACTION_TYPES;