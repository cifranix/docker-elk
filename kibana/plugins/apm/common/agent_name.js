"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAgentName = isAgentName;
exports.isRumAgentName = isRumAgentName;
exports.isJavaAgentName = isJavaAgentName;
exports.AGENT_NAMES = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Agent names can be any string. This list only defines the official agents
 * that we might want to target specifically eg. linking to their documentation
 * & telemetry reporting. Support additional agent types by appending
 * definitions in mappings.json (for telemetry), the AgentName type, and the
 * AGENT_NAMES array.
 */
const AGENT_NAMES = ['java', 'js-base', 'rum-js', 'dotnet', 'go', 'java', 'nodejs', 'python', 'ruby'];
exports.AGENT_NAMES = AGENT_NAMES;

function isAgentName(agentName) {
  return AGENT_NAMES.includes(agentName);
}

function isRumAgentName(agentName) {
  return agentName === 'js-base' || agentName === 'rum-js';
}

function isJavaAgentName(agentName) {
  return agentName === 'java';
}