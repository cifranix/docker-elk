"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTaskIfItExists = deleteTaskIfItExists;

var _server = require("../../../../../src/core/server");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function deleteTaskIfItExists(taskManager, taskId) {
  try {
    await taskManager.remove(taskId);
  } catch (err) {
    if (!_server.SavedObjectsErrorHelpers.isNotFoundError(err)) {
      throw err;
    }
  }
}