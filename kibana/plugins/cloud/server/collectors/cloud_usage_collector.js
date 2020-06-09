"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCloudUsageCollector = createCloudUsageCollector;
exports.registerCloudUsageCollector = registerCloudUsageCollector;

var _constants = require("../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createCloudUsageCollector(usageCollection, config) {
  const {
    isCloudEnabled
  } = config;
  return usageCollection.makeUsageCollector({
    type: _constants.KIBANA_CLOUD_STATS_TYPE,
    isReady: () => true,
    fetch: () => {
      return {
        isCloudEnabled
      };
    }
  });
}

function registerCloudUsageCollector(usageCollection, config) {
  if (!usageCollection) {
    return;
  }

  const collector = createCloudUsageCollector(usageCollection, config);
  usageCollection.registerCollector(collector);
}