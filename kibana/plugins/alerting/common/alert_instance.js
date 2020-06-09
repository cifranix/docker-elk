"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rawAlertInstance = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _date_from_string = require("./date_from_string");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const metaSchema = t.partial({
  lastScheduledActions: t.type({
    group: t.string,
    date: _date_from_string.DateFromString
  })
});
const stateSchema = t.record(t.string, t.unknown);
const rawAlertInstance = t.partial({
  state: stateSchema,
  meta: metaSchema
});
exports.rawAlertInstance = rawAlertInstance;