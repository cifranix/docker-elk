"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndicesPrivileges = getIndicesPrivileges;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getIndicesPrivileges(setup) {
  const {
    client,
    indices
  } = setup;
  const response = await client.hasPrivileges({
    index: [{
      names: [indices['apm_oss.errorIndices'], indices['apm_oss.metricsIndices'], indices['apm_oss.transactionIndices'], indices['apm_oss.spanIndices']],
      privileges: ['read']
    }]
  });
  return response.index;
}