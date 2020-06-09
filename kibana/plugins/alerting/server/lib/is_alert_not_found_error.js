"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAlertSavedObjectNotFoundError = isAlertSavedObjectNotFoundError;

var _server = require("../../../../../src/core/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isAlertSavedObjectNotFoundError(err, alertId) {
  return _server.SavedObjectsErrorHelpers.isNotFoundError(err) && `${err}`.includes(alertId);
}