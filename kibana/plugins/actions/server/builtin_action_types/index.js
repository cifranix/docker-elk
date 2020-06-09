"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerBuiltInActionTypes = registerBuiltInActionTypes;

var _email = require("./email");

var _es_index = require("./es_index");

var _pagerduty = require("./pagerduty");

var _server_log = require("./server_log");

var _servicenow = require("./servicenow");

var _slack = require("./slack");

var _webhook = require("./webhook");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerBuiltInActionTypes({
  actionsConfigUtils: configurationUtilities,
  actionTypeRegistry,
  logger
}) {
  actionTypeRegistry.register((0, _email.getActionType)({
    logger,
    configurationUtilities
  }));
  actionTypeRegistry.register((0, _es_index.getActionType)({
    logger
  }));
  actionTypeRegistry.register((0, _pagerduty.getActionType)({
    logger,
    configurationUtilities
  }));
  actionTypeRegistry.register((0, _server_log.getActionType)({
    logger
  }));
  actionTypeRegistry.register((0, _servicenow.getActionType)({
    configurationUtilities
  }));
  actionTypeRegistry.register((0, _slack.getActionType)({
    configurationUtilities
  }));
  actionTypeRegistry.register((0, _webhook.getActionType)({
    logger,
    configurationUtilities
  }));
}