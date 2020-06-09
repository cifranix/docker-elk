"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alertParamsSchema = exports.alertStateSchema = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _alert_instance = require("./alert_instance");

var _date_from_string = require("./date_from_string");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const alertStateSchema = t.partial({
  alertTypeState: t.record(t.string, t.unknown),
  alertInstances: t.record(t.string, _alert_instance.rawAlertInstance),
  previousStartedAt: t.union([t.null, _date_from_string.DateFromString])
});
exports.alertStateSchema = alertStateSchema;
const alertParamsSchema = t.intersection([t.type({
  alertId: t.string
}), t.partial({
  spaceId: t.string
})]);
exports.alertParamsSchema = alertParamsSchema;