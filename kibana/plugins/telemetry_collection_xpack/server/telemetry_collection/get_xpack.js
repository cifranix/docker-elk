"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getXPackUsage = getXPackUsage;

var _constants = require("./constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Get the cluster stats from the connected cluster.
 *
 * This is the equivalent of GET /_xpack/usage?master_timeout=${TIMEOUT}
 *
 * Like any X-Pack related API, X-Pack must installed for this to work.
 */
function getXPackUsage(callCluster) {
  return callCluster('transport.request', {
    method: 'GET',
    path: '/_xpack/usage',
    query: {
      master_timeout: _constants.TIMEOUT
    }
  });
}