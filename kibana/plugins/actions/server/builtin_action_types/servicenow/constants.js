"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTED_SOURCE_FIELDS = exports.ACTION_TYPE_ID = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ACTION_TYPE_ID = '.servicenow';
exports.ACTION_TYPE_ID = ACTION_TYPE_ID;
const SUPPORTED_SOURCE_FIELDS = ['title', 'comments', 'description'];
exports.SUPPORTED_SOURCE_FIELDS = SUPPORTED_SOURCE_FIELDS;