"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexStateFromClusterState = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const checkAllAliases = (indexName, clusterState) => {
  for (const index of Object.values(clusterState.metadata.indices)) {
    var _index$aliases;

    if ((_index$aliases = index.aliases) === null || _index$aliases === void 0 ? void 0 : _index$aliases.some(alias => alias === indexName)) {
      return index.state;
    }
  }

  throw new Error(`${indexName} not found in cluster state!`);
};

const getIndexStateFromClusterState = (indexName, clusterState) => clusterState.metadata.indices[indexName] ? clusterState.metadata.indices[indexName].state : checkAllAliases(indexName, clusterState);

exports.getIndexStateFromClusterState = getIndexStateFromClusterState;