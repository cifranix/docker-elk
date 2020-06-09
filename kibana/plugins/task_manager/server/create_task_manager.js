"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTaskManager = createTaskManager;

var _task_manager = require("./task_manager");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createTaskManager(core, {
  logger,
  config,
  elasticsearch: {
    callAsInternalUser
  },
  savedObjectsRepository,
  savedObjectsSerializer
}) {
  return new _task_manager.TaskManager({
    taskManagerId: core.uuid.getInstanceUuid(),
    config,
    savedObjectsRepository,
    serializer: savedObjectsSerializer,
    callAsInternalUser,
    logger
  });
}