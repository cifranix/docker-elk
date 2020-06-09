"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerBuiltInAlertTypes = registerBuiltInAlertTypes;

var _threshold = require("./threshold");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerBuiltInAlertTypes(_ref) {
  var alertTypeRegistry = _ref.alertTypeRegistry;
  alertTypeRegistry.register((0, _threshold.getAlertType)());
}