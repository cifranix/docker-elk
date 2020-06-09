"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskLifecycleResult = exports.TaskStatus = exports.validateTaskDefinition = exports.validateRunResult = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const validateRunResult = _joi.default.object({
  runAt: _joi.default.date().optional(),
  error: _joi.default.object().optional(),
  state: _joi.default.object().optional()
}).optional();

exports.validateRunResult = validateRunResult;

const validateTaskDefinition = _joi.default.object({
  type: _joi.default.string().required(),
  title: _joi.default.string().optional(),
  description: _joi.default.string().optional(),
  timeout: _joi.default.string().default('5m'),
  maxAttempts: _joi.default.number().min(1).optional(),
  createTaskRunner: _joi.default.func().required(),
  getRetry: _joi.default.func().optional()
}).default();
/**
 * A dictionary mapping task types to their definitions.
 */


exports.validateTaskDefinition = validateTaskDefinition;
let TaskStatus;
exports.TaskStatus = TaskStatus;

(function (TaskStatus) {
  TaskStatus["Idle"] = "idle";
  TaskStatus["Claiming"] = "claiming";
  TaskStatus["Running"] = "running";
  TaskStatus["Failed"] = "failed";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));

let TaskLifecycleResult;
exports.TaskLifecycleResult = TaskLifecycleResult;

(function (TaskLifecycleResult) {
  TaskLifecycleResult["NotFound"] = "notFound";
})(TaskLifecycleResult || (exports.TaskLifecycleResult = TaskLifecycleResult = {}));