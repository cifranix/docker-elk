"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initInfraServer = void 0;

var _graphqlTools = require("graphql-tools");

var _ip_to_hostname = require("./routes/ip_to_hostname");

var _graphql = require("./graphql");

var _source_status = require("./graphql/source_status");

var _sources = require("./graphql/sources");

var _log_analysis = require("./routes/log_analysis");

var _metrics_explorer = require("./routes/metrics_explorer");

var _metadata = require("./routes/metadata");

var _snapshot = require("./routes/snapshot");

var _node_details = require("./routes/node_details");

var _log_entries = require("./routes/log_entries");

var _inventory_metadata = require("./routes/inventory_metadata");

var _source = require("./routes/source");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const initInfraServer = libs => {
  const schema = (0, _graphqlTools.makeExecutableSchema)({
    resolvers: [(0, _sources.createSourcesResolvers)(libs), (0, _source_status.createSourceStatusResolvers)(libs)],
    typeDefs: _graphql.schemas
  });
  libs.framework.registerGraphQLEndpoint('/graphql', schema);
  (0, _ip_to_hostname.initIpToHostName)(libs);
  (0, _log_analysis.initGetLogEntryCategoriesRoute)(libs);
  (0, _log_analysis.initGetLogEntryCategoryDatasetsRoute)(libs);
  (0, _log_analysis.initGetLogEntryCategoryExamplesRoute)(libs);
  (0, _log_analysis.initGetLogEntryRateRoute)(libs);
  (0, _snapshot.initSnapshotRoute)(libs);
  (0, _node_details.initNodeDetailsRoute)(libs);
  (0, _source.initSourceRoute)(libs);
  (0, _log_analysis.initValidateLogAnalysisIndicesRoute)(libs);
  (0, _log_entries.initLogEntriesRoute)(libs);
  (0, _log_entries.initLogEntriesHighlightsRoute)(libs);
  (0, _log_entries.initLogEntriesSummaryRoute)(libs);
  (0, _log_entries.initLogEntriesSummaryHighlightsRoute)(libs);
  (0, _log_entries.initLogEntriesItemRoute)(libs);
  (0, _metrics_explorer.initMetricExplorerRoute)(libs);
  (0, _metadata.initMetadataRoute)(libs);
  (0, _inventory_metadata.initInventoryMetaRoute)(libs);
};

exports.initInfraServer = initInfraServer;