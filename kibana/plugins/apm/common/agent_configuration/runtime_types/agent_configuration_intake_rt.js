"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agentConfigurationIntakeRt = exports.settingsRt = exports.serviceRt = void 0;

var t = _interopRequireWildcard(require("io-ts"));

var _setting_definitions = require("../setting_definitions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// retrieve validation from config definitions settings and validate on the server
const knownSettings = _setting_definitions.settingDefinitions.reduce((acc, {
  key,
  validation
}) => {
  acc[key] = validation;
  return acc;
}, {});

const serviceRt = t.partial({
  name: t.string,
  environment: t.string
});
exports.serviceRt = serviceRt;
const settingsRt = t.intersection([t.record(t.string, t.string), t.partial(knownSettings)]);
exports.settingsRt = settingsRt;
const agentConfigurationIntakeRt = t.intersection([t.partial({
  agent_name: t.string
}), t.type({
  service: serviceRt,
  settings: settingsRt
})]);
exports.agentConfigurationIntakeRt = agentConfigurationIntakeRt;