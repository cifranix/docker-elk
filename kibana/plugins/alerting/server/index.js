"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PluginSetupContract", {
  enumerable: true,
  get: function () {
    return _plugin.PluginSetupContract;
  }
});
Object.defineProperty(exports, "PluginStartContract", {
  enumerable: true,
  get: function () {
    return _plugin.PluginStartContract;
  }
});
Object.defineProperty(exports, "AlertType", {
  enumerable: true,
  get: function () {
    return _types.AlertType;
  }
});
Object.defineProperty(exports, "ActionGroup", {
  enumerable: true,
  get: function () {
    return _types.ActionGroup;
  }
});
Object.defineProperty(exports, "AlertingPlugin", {
  enumerable: true,
  get: function () {
    return _types.AlertingPlugin;
  }
});
Object.defineProperty(exports, "AlertExecutorOptions", {
  enumerable: true,
  get: function () {
    return _types.AlertExecutorOptions;
  }
});
Object.defineProperty(exports, "AlertActionParams", {
  enumerable: true,
  get: function () {
    return _types.AlertActionParams;
  }
});
Object.defineProperty(exports, "AlertServices", {
  enumerable: true,
  get: function () {
    return _types.AlertServices;
  }
});
Object.defineProperty(exports, "State", {
  enumerable: true,
  get: function () {
    return _types.State;
  }
});
Object.defineProperty(exports, "PartialAlert", {
  enumerable: true,
  get: function () {
    return _types.PartialAlert;
  }
});
Object.defineProperty(exports, "FindOptions", {
  enumerable: true,
  get: function () {
    return _alerts_client.FindOptions;
  }
});
Object.defineProperty(exports, "FindResult", {
  enumerable: true,
  get: function () {
    return _alerts_client.FindResult;
  }
});
Object.defineProperty(exports, "AlertInstance", {
  enumerable: true,
  get: function () {
    return _alert_instance.AlertInstance;
  }
});
Object.defineProperty(exports, "parseDuration", {
  enumerable: true,
  get: function () {
    return _lib.parseDuration;
  }
});
exports.plugin = void 0;

var _plugin = require("./plugin");

var _types = require("./types");

var _alerts_client = require("./alerts_client");

var _alert_instance = require("./alert_instance");

var _lib = require("./lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const plugin = initContext => new _plugin.AlertingPlugin(initContext);

exports.plugin = plugin;