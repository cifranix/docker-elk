"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeConfigs = mergeConfigs;
Object.defineProperty(exports, "APMPlugin", {
  enumerable: true,
  get: function () {
    return _plugin.APMPlugin;
  }
});
Object.defineProperty(exports, "APMPluginContract", {
  enumerable: true,
  get: function () {
    return _plugin.APMPluginContract;
  }
});
exports.plugin = exports.config = void 0;

var _configSchema = require("@kbn/config-schema");

var _plugin = require("./plugin");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const config = {
  exposeToBrowser: {
    serviceMapEnabled: true,
    ui: true
  },
  schema: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    }),
    serviceMapEnabled: _configSchema.schema.boolean({
      defaultValue: true
    }),
    serviceMapFingerprintBucketSize: _configSchema.schema.number({
      defaultValue: 100
    }),
    serviceMapTraceIdBucketSize: _configSchema.schema.number({
      defaultValue: 65
    }),
    serviceMapFingerprintGlobalBucketSize: _configSchema.schema.number({
      defaultValue: 1000
    }),
    serviceMapTraceIdGlobalBucketSize: _configSchema.schema.number({
      defaultValue: 6
    }),
    serviceMapMaxTracesPerRequest: _configSchema.schema.number({
      defaultValue: 50
    }),
    autocreateApmIndexPattern: _configSchema.schema.boolean({
      defaultValue: true
    }),
    ui: _configSchema.schema.object({
      enabled: _configSchema.schema.boolean({
        defaultValue: true
      }),
      transactionGroupBucketSize: _configSchema.schema.number({
        defaultValue: 100
      }),
      maxTraceItems: _configSchema.schema.number({
        defaultValue: 1000
      })
    }),
    telemetryCollectionEnabled: _configSchema.schema.boolean({
      defaultValue: true
    })
  })
};
exports.config = config;

function mergeConfigs(apmOssConfig, apmConfig) {
  return {
    'apm_oss.transactionIndices': apmOssConfig.transactionIndices,
    'apm_oss.spanIndices': apmOssConfig.spanIndices,
    'apm_oss.errorIndices': apmOssConfig.errorIndices,
    'apm_oss.metricsIndices': apmOssConfig.metricsIndices,
    'apm_oss.sourcemapIndices': apmOssConfig.sourcemapIndices,
    'apm_oss.onboardingIndices': apmOssConfig.onboardingIndices,
    'apm_oss.indexPattern': apmOssConfig.indexPattern,
    'xpack.apm.serviceMapEnabled': apmConfig.serviceMapEnabled,
    'xpack.apm.serviceMapFingerprintBucketSize': apmConfig.serviceMapFingerprintBucketSize,
    'xpack.apm.serviceMapTraceIdBucketSize': apmConfig.serviceMapTraceIdBucketSize,
    'xpack.apm.serviceMapFingerprintGlobalBucketSize': apmConfig.serviceMapFingerprintGlobalBucketSize,
    'xpack.apm.serviceMapTraceIdGlobalBucketSize': apmConfig.serviceMapTraceIdGlobalBucketSize,
    'xpack.apm.serviceMapMaxTracesPerRequest': apmConfig.serviceMapMaxTracesPerRequest,
    'xpack.apm.ui.enabled': apmConfig.ui.enabled,
    'xpack.apm.ui.maxTraceItems': apmConfig.ui.maxTraceItems,
    'xpack.apm.ui.transactionGroupBucketSize': apmConfig.ui.transactionGroupBucketSize,
    'xpack.apm.autocreateApmIndexPattern': apmConfig.autocreateApmIndexPattern,
    'xpack.apm.telemetryCollectionEnabled': apmConfig.telemetryCollectionEnabled
  };
}

const plugin = initContext => new _plugin.APMPlugin(initContext);

exports.plugin = plugin;