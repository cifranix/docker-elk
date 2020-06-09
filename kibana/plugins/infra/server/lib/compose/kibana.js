"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;

var _framework_fields_adapter = require("../adapters/fields/framework_fields_adapter");

var _kibana_framework_adapter = require("../adapters/framework/kibana_framework_adapter");

var _kibana_log_entries_adapter = require("../adapters/log_entries/kibana_log_entries_adapter");

var _kibana_metrics_adapter = require("../adapters/metrics/kibana_metrics_adapter");

var _source_status = require("../adapters/source_status");

var _fields_domain = require("../domains/fields_domain");

var _log_entries_domain = require("../domains/log_entries_domain");

var _metrics_domain = require("../domains/metrics_domain");

var _log_analysis = require("../log_analysis");

var _snapshot = require("../snapshot");

var _source_status2 = require("../source_status");

var _sources = require("../sources");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function compose(core, config, plugins) {
  const framework = new _kibana_framework_adapter.KibanaFramework(core, config, plugins);
  const sources = new _sources.InfraSources({
    config
  });
  const sourceStatus = new _source_status2.InfraSourceStatus(new _source_status.InfraElasticsearchSourceStatusAdapter(framework), {
    sources
  });
  const snapshot = new _snapshot.InfraSnapshot({
    sources,
    framework
  });
  const logEntryCategoriesAnalysis = new _log_analysis.LogEntryCategoriesAnalysis({
    framework
  });
  const logEntryRateAnalysis = new _log_analysis.LogEntryRateAnalysis({
    framework
  }); // TODO: separate these out individually and do away with "domains" as a temporary group

  const domainLibs = {
    fields: new _fields_domain.InfraFieldsDomain(new _framework_fields_adapter.FrameworkFieldsAdapter(framework), {
      sources
    }),
    logEntries: new _log_entries_domain.InfraLogEntriesDomain(new _kibana_log_entries_adapter.InfraKibanaLogEntriesAdapter(framework), {
      sources
    }),
    metrics: new _metrics_domain.InfraMetricsDomain(new _kibana_metrics_adapter.KibanaMetricsAdapter(framework))
  };
  const libs = {
    configuration: config,
    // NP_TODO: Do we ever use this anywhere?
    framework,
    logEntryCategoriesAnalysis,
    logEntryRateAnalysis,
    snapshot,
    sources,
    sourceStatus,
    ...domainLibs
  };
  return libs;
}