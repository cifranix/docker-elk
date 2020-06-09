"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initUptimeServer = void 0;

var _graphqlTools = require("graphql-tools");

var _graphql = require("./graphql");

var _rest_api = require("./rest_api");

var _alerts = require("./lib/alerts");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const initUptimeServer = (server, libs, plugins) => {
  _rest_api.restApiRoutes.forEach(route => libs.framework.registerRoute((0, _rest_api.uptimeRouteWrapper)((0, _rest_api.createRouteWithAuth)(libs, route))));

  _alerts.uptimeAlertTypeFactories.forEach(alertTypeFactory => plugins.alerting.registerType(alertTypeFactory(server, libs)));

  const graphQLSchema = (0, _graphqlTools.makeExecutableSchema)({
    resolvers: _graphql.resolvers.map(createResolversFn => createResolversFn(libs)),
    typeDefs: _graphql.typeDefs
  });
  libs.framework.registerGraphQLEndpoint(_graphql.DEFAULT_GRAPHQL_PATH, graphQLSchema);
};

exports.initUptimeServer = initUptimeServer;