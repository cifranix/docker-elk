"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatsWithXpack = void 0;

var _server = require("../../../../../src/plugins/telemetry/server");

var _get_xpack = require("./get_xpack");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getStatsWithXpack = async function (clustersDetails, config, context) {
  const {
    callCluster
  } = config;
  const clustersLocalStats = await (0, _server.getLocalStats)(clustersDetails, config, context);
  const xpack = await (0, _get_xpack.getXPackUsage)(callCluster).catch(() => undefined); // We want to still report something (and do not lose the license) even when this method fails.

  return clustersLocalStats.map(localStats => {
    if (xpack) {
      return { ...localStats,
        stack_stats: { ...localStats.stack_stats,
          xpack
        }
      };
    }

    return localStats;
  });
};

exports.getStatsWithXpack = getStatsWithXpack;