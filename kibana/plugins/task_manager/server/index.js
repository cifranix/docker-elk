"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TaskManager", {
  enumerable: true,
  get: function () {
    return _plugin.TaskManagerPlugin;
  }
});
Object.defineProperty(exports, "TaskManagerSetupContract", {
  enumerable: true,
  get: function () {
    return _plugin.TaskManagerSetupContract;
  }
});
Object.defineProperty(exports, "TaskManagerStartContract", {
  enumerable: true,
  get: function () {
    return _plugin.TaskManagerStartContract;
  }
});
Object.defineProperty(exports, "TaskInstance", {
  enumerable: true,
  get: function () {
    return _task.TaskInstance;
  }
});
Object.defineProperty(exports, "ConcreteTaskInstance", {
  enumerable: true,
  get: function () {
    return _task.ConcreteTaskInstance;
  }
});
Object.defineProperty(exports, "TaskRunCreatorFunction", {
  enumerable: true,
  get: function () {
    return _task.TaskRunCreatorFunction;
  }
});
Object.defineProperty(exports, "TaskStatus", {
  enumerable: true,
  get: function () {
    return _task.TaskStatus;
  }
});
Object.defineProperty(exports, "RunContext", {
  enumerable: true,
  get: function () {
    return _task.RunContext;
  }
});
exports.config = exports.plugin = void 0;

var _plugin = require("./plugin");

var _config = require("./config");

var _task = require("./task");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin = initContext => new _plugin.TaskManagerPlugin(initContext);

exports.plugin = plugin;
const config = {
  schema: _config.configSchema
};
exports.config = config;