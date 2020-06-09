"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TelemetryCollectionXpackPlugin = void 0;

var _server = require("../../../../src/plugins/telemetry/server");

var _telemetry_collection = require("./telemetry_collection");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class TelemetryCollectionXpackPlugin {
  constructor(initializerContext) {}

  setup(core, {
    telemetryCollectionManager
  }) {
    telemetryCollectionManager.setCollection({
      esCluster: core.elasticsearch.dataClient,
      title: 'local_xpack',
      priority: 1,
      statsGetter: _telemetry_collection.getStatsWithXpack,
      clusterDetailsGetter: _server.getClusterUuids,
      licenseGetter: _server.getLocalLicense
    });
  }

  start(core) {}

}

exports.TelemetryCollectionXpackPlugin = TelemetryCollectionXpackPlugin;