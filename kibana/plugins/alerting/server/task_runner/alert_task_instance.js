"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskInstanceToAlertTaskInstance = taskInstanceToAlertTaskInstance;

var t = _interopRequireWildcard(require("io-ts"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _common = require("../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const enumerateErrorFields = e => `${e.map(({
  context
}) => context.map(({
  key
}) => key).join('.'))}`;

function taskInstanceToAlertTaskInstance(taskInstance, alert) {
  return { ...taskInstance,
    params: (0, _pipeable.pipe)(_common.alertParamsSchema.decode(taskInstance.params), (0, _Either.fold)(e => {
      throw new Error(`Task "${taskInstance.id}" ${alert ? `(underlying Alert "${alert.id}") ` : ''}has an invalid param at ${enumerateErrorFields(e)}`);
    }, t.identity)),
    state: (0, _pipeable.pipe)(_common.alertStateSchema.decode(taskInstance.state), (0, _Either.fold)(e => {
      throw new Error(`Task "${taskInstance.id}" ${alert ? `(underlying Alert "${alert.id}") ` : ''}has invalid state at ${enumerateErrorFields(e)}`);
    }, t.identity))
  };
}