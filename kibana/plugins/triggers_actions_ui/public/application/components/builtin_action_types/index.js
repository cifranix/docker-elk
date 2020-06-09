"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerBuiltInActionTypes = registerBuiltInActionTypes;

var _server_log = require("./server_log");

var _slack = require("./slack");

var _email = require("./email");

var _es_index = require("./es_index");

var _pagerduty = require("./pagerduty");

var _webhook = require("./webhook");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerBuiltInActionTypes(_ref) {
  var actionTypeRegistry = _ref.actionTypeRegistry;
  actionTypeRegistry.register((0, _server_log.getActionType)());
  actionTypeRegistry.register((0, _slack.getActionType)());
  actionTypeRegistry.register((0, _email.getActionType)());
  actionTypeRegistry.register((0, _es_index.getActionType)());
  actionTypeRegistry.register((0, _pagerduty.getActionType)());
  actionTypeRegistry.register((0, _webhook.getActionType)());
}