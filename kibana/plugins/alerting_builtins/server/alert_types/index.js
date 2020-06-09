"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerBuiltInAlertTypes = registerBuiltInAlertTypes;

var _index_threshold = require("./index_threshold");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerBuiltInAlertTypes(params) {
  (0, _index_threshold.register)(params);
}