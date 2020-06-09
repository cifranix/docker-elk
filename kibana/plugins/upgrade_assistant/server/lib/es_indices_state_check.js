"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.esIndicesStateCheck = void 0;

var _get_index_state_from_cluster_state = require("../../common/get_index_state_from_cluster_state");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const esIndicesStateCheck = async (callAsUser, indices) => {
  // According to https://www.elastic.co/guide/en/elasticsearch/reference/7.6/cluster-state.html
  // The response from this call is considered internal and subject to change. We have an API
  // integration test for asserting that the current ES version still returns what we expect.
  // This lives in x-pack/test/upgrade_assistant_integration
  const clusterState = await callAsUser('cluster.state', {
    index: indices,
    metric: 'metadata'
  });
  const result = {};
  indices.forEach(index => {
    result[index] = (0, _get_index_state_from_cluster_state.getIndexStateFromClusterState)(index, clusterState);
  });
  return result;
};

exports.esIndicesStateCheck = esIndicesStateCheck;