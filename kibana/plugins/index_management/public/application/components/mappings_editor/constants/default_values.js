"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STANDARD = exports.INDEX_DEFAULT = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * When we want to set a parameter value to the index "default" in a Select option
 * we will use this constant to define it. We will then strip this placeholder value
 * and let Elasticsearch handle it.
 */
var INDEX_DEFAULT = 'index_default';
exports.INDEX_DEFAULT = INDEX_DEFAULT;
var STANDARD = 'standard';
exports.STANDARD = STANDARD;