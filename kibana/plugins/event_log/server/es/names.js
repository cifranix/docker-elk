"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEsNames = getEsNames;

var _package = _interopRequireDefault(require("../../../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const EVENT_LOG_NAME_SUFFIX = `-event-log`;
const EVENT_LOG_VERSION_SUFFIX = `-${_package.default.version}`;

function getEsNames(baseName) {
  const eventLogName = `${baseName}${EVENT_LOG_NAME_SUFFIX}`;
  const eventLogNameWithVersion = `${eventLogName}${EVENT_LOG_VERSION_SUFFIX}`;
  return {
    base: baseName,
    alias: eventLogNameWithVersion,
    ilmPolicy: `${eventLogName}-policy`,
    indexPattern: `${eventLogName}-*`,
    indexPatternWithVersion: `${eventLogNameWithVersion}-*`,
    initialIndex: `${eventLogNameWithVersion}-000001`,
    indexTemplate: `${eventLogNameWithVersion}-template`
  };
}