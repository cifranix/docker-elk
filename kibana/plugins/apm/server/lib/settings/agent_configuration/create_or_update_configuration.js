"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrUpdateConfiguration = createOrUpdateConfiguration;

var _objectHash = _interopRequireDefault(require("object-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function createOrUpdateConfiguration({
  configurationId,
  configurationIntake,
  setup
}) {
  const {
    internalClient,
    indices
  } = setup;
  const params = {
    refresh: true,
    index: indices.apmAgentConfigurationIndex,
    body: {
      agent_name: configurationIntake.agent_name,
      service: {
        name: configurationIntake.service.name,
        environment: configurationIntake.service.environment
      },
      settings: configurationIntake.settings,
      '@timestamp': Date.now(),
      applied_by_agent: false,
      etag: (0, _objectHash.default)(configurationIntake)
    }
  }; // by specifying an id elasticsearch will delete the previous doc and insert the updated doc

  if (configurationId) {
    params.id = configurationId;
  }

  return internalClient.index(params);
}