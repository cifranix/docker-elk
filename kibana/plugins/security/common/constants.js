"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESERVED_PRIVILEGES_APPLICATION_WILDCARD = exports.APPLICATION_PREFIX = exports.GLOBAL_RESOURCE = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const GLOBAL_RESOURCE = '*';
exports.GLOBAL_RESOURCE = GLOBAL_RESOURCE;
const APPLICATION_PREFIX = 'kibana-';
exports.APPLICATION_PREFIX = APPLICATION_PREFIX;
const RESERVED_PRIVILEGES_APPLICATION_WILDCARD = 'kibana-*';
exports.RESERVED_PRIVILEGES_APPLICATION_WILDCARD = RESERVED_PRIVILEGES_APPLICATION_WILDCARD;