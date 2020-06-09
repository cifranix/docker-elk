"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBasePath = void 0;

var _common = require("../../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const addBasePath = uri => _common.API_BASE_PATH + uri;

exports.addBasePath = addBasePath;