"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerLogLevelOptions = exports.SeverityActionOptions = exports.EventActionOptions = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EventActionOptions;
exports.EventActionOptions = EventActionOptions;

(function (EventActionOptions) {
  EventActionOptions["TRIGGER"] = "trigger";
  EventActionOptions["RESOLVE"] = "resolve";
  EventActionOptions["ACKNOWLEDGE"] = "acknowledge";
})(EventActionOptions || (exports.EventActionOptions = EventActionOptions = {}));

var SeverityActionOptions;
exports.SeverityActionOptions = SeverityActionOptions;

(function (SeverityActionOptions) {
  SeverityActionOptions["CRITICAL"] = "critical";
  SeverityActionOptions["ERROR"] = "error";
  SeverityActionOptions["WARNING"] = "warning";
  SeverityActionOptions["INFO"] = "info";
})(SeverityActionOptions || (exports.SeverityActionOptions = SeverityActionOptions = {}));

var ServerLogLevelOptions;
exports.ServerLogLevelOptions = ServerLogLevelOptions;

(function (ServerLogLevelOptions) {
  ServerLogLevelOptions["TRACE"] = "trace";
  ServerLogLevelOptions["DEBUG"] = "debug";
  ServerLogLevelOptions["INFO"] = "info";
  ServerLogLevelOptions["WARN"] = "warn";
  ServerLogLevelOptions["ERROR"] = "error";
  ServerLogLevelOptions["FATAL"] = "fatal";
})(ServerLogLevelOptions || (exports.ServerLogLevelOptions = ServerLogLevelOptions = {}));