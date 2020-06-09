"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ACCESS_DENIED_PATH = exports.JOBS_LIST_PATH = exports.ML_PATH = exports.MANAGEMENT_PATH = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MANAGEMENT_PATH = '/management';
exports.MANAGEMENT_PATH = MANAGEMENT_PATH;
var ML_PATH = "".concat(MANAGEMENT_PATH, "/ml");
exports.ML_PATH = ML_PATH;
var JOBS_LIST_PATH = "".concat(ML_PATH, "/jobs_list");
exports.JOBS_LIST_PATH = JOBS_LIST_PATH;
var ACCESS_DENIED_PATH = "".concat(ML_PATH, "/access_denied");
exports.ACCESS_DENIED_PATH = ACCESS_DENIED_PATH;