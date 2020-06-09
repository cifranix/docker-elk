"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApmApi = void 0;

var _index_pattern = require("./index_pattern");

var _errors = require("./errors");

var _services = require("./services");

var _agent_configuration = require("./settings/agent_configuration");

var _apm_indices = require("./settings/apm_indices");

var _metrics = require("./metrics");

var _service_nodes = require("./service_nodes");

var _traces = require("./traces");

var _transaction = require("./transaction");

var _transaction_groups = require("./transaction_groups");

var _ui_filters = require("./ui_filters");

var _create_api = require("./create_api");

var _service_map = require("./service_map");

var _security = require("./security");

var _custom_link = require("./settings/custom_link");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createApmApi = () => {
  const api = (0, _create_api.createApi)() // index pattern
  .add(_index_pattern.staticIndexPatternRoute).add(_index_pattern.dynamicIndexPatternRoute) // Errors
  .add(_errors.errorDistributionRoute).add(_errors.errorGroupsRoute).add(_errors.errorsRoute) // Services
  .add(_services.serviceAgentNameRoute).add(_services.serviceTransactionTypesRoute).add(_services.servicesRoute).add(_services.serviceNodeMetadataRoute).add(_services.serviceAnnotationsRoute) // Agent configuration
  .add(_agent_configuration.getSingleAgentConfigurationRoute).add(_agent_configuration.agentConfigurationAgentNameRoute).add(_agent_configuration.agentConfigurationRoute).add(_agent_configuration.agentConfigurationSearchRoute).add(_agent_configuration.deleteAgentConfigurationRoute).add(_agent_configuration.listAgentConfigurationEnvironmentsRoute).add(_agent_configuration.listAgentConfigurationServicesRoute).add(_agent_configuration.createOrUpdateAgentConfigurationRoute) // APM indices
  .add(_apm_indices.apmIndexSettingsRoute).add(_apm_indices.apmIndicesRoute).add(_apm_indices.saveApmIndicesRoute) // Metrics
  .add(_metrics.metricsChartsRoute).add(_service_nodes.serviceNodesRoute) // Traces
  .add(_traces.tracesRoute).add(_traces.tracesByIdRoute) // Transaction groups
  .add(_transaction_groups.transactionGroupsBreakdownRoute).add(_transaction_groups.transactionGroupsChartsRoute).add(_transaction_groups.transactionGroupsDistributionRoute).add(_transaction_groups.transactionGroupsRoute).add(_transaction_groups.transactionGroupsAvgDurationByBrowser).add(_transaction_groups.transactionGroupsAvgDurationByCountry) // UI filters
  .add(_ui_filters.errorGroupsLocalFiltersRoute).add(_ui_filters.metricsLocalFiltersRoute).add(_ui_filters.servicesLocalFiltersRoute).add(_ui_filters.tracesLocalFiltersRoute).add(_ui_filters.transactionGroupsLocalFiltersRoute).add(_ui_filters.transactionsLocalFiltersRoute).add(_ui_filters.serviceNodesLocalFiltersRoute).add(_ui_filters.uiFiltersEnvironmentsRoute) // Transaction
  .add(_transaction.transactionByTraceIdRoute) // Service map
  .add(_service_map.serviceMapRoute).add(_service_map.serviceMapServiceNodeRoute) // security
  .add(_security.indicesPrivilegesRoute) // Custom links
  .add(_custom_link.createCustomLinkRoute).add(_custom_link.updateCustomLinkRoute).add(_custom_link.deleteCustomLinkRoute).add(_custom_link.listCustomLinksRoute).add(_custom_link.customLinkTransactionRoute);
  return api;
};

exports.createApmApi = createApmApi;