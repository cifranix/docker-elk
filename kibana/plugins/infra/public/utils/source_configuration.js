"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTimestampLogColumnConfiguration = exports.isMessageLogColumnConfiguration = exports.isFieldLogColumnConfiguration = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isFieldLogColumnConfiguration = function isFieldLogColumnConfiguration(logColumnConfiguration) {
  return logColumnConfiguration != null && 'fieldColumn' in logColumnConfiguration;
};

exports.isFieldLogColumnConfiguration = isFieldLogColumnConfiguration;

var isMessageLogColumnConfiguration = function isMessageLogColumnConfiguration(logColumnConfiguration) {
  return logColumnConfiguration != null && 'messageColumn' in logColumnConfiguration;
};

exports.isMessageLogColumnConfiguration = isMessageLogColumnConfiguration;

var isTimestampLogColumnConfiguration = function isTimestampLogColumnConfiguration(logColumnConfiguration) {
  return logColumnConfiguration != null && 'timestampColumn' in logColumnConfiguration;
};

exports.isTimestampLogColumnConfiguration = isTimestampLogColumnConfiguration;