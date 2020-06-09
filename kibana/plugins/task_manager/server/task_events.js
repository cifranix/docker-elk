"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asTaskMarkRunningEvent = asTaskMarkRunningEvent;
exports.asTaskRunEvent = asTaskRunEvent;
exports.asTaskClaimEvent = asTaskClaimEvent;
exports.asTaskRunRequestEvent = asTaskRunRequestEvent;
exports.isTaskMarkRunningEvent = isTaskMarkRunningEvent;
exports.isTaskRunEvent = isTaskRunEvent;
exports.isTaskClaimEvent = isTaskClaimEvent;
exports.isTaskRunRequestEvent = isTaskRunRequestEvent;
exports.TaskEventType = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let TaskEventType;
exports.TaskEventType = TaskEventType;

(function (TaskEventType) {
  TaskEventType["TASK_CLAIM"] = "TASK_CLAIM";
  TaskEventType["TASK_MARK_RUNNING"] = "TASK_MARK_RUNNING";
  TaskEventType["TASK_RUN"] = "TASK_RUN";
  TaskEventType["TASK_RUN_REQUEST"] = "TASK_RUN_REQUEST";
})(TaskEventType || (exports.TaskEventType = TaskEventType = {}));

function asTaskMarkRunningEvent(id, event) {
  return {
    id,
    type: TaskEventType.TASK_MARK_RUNNING,
    event
  };
}

function asTaskRunEvent(id, event) {
  return {
    id,
    type: TaskEventType.TASK_RUN,
    event
  };
}

function asTaskClaimEvent(id, event) {
  return {
    id,
    type: TaskEventType.TASK_CLAIM,
    event
  };
}

function asTaskRunRequestEvent(id, // we only emit a TaskRunRequest event when it fails
event) {
  return {
    id,
    type: TaskEventType.TASK_RUN_REQUEST,
    event
  };
}

function isTaskMarkRunningEvent(taskEvent) {
  return taskEvent.type === TaskEventType.TASK_MARK_RUNNING;
}

function isTaskRunEvent(taskEvent) {
  return taskEvent.type === TaskEventType.TASK_RUN;
}

function isTaskClaimEvent(taskEvent) {
  return taskEvent.type === TaskEventType.TASK_CLAIM;
}

function isTaskRunRequestEvent(taskEvent) {
  return taskEvent.type === TaskEventType.TASK_RUN_REQUEST;
}