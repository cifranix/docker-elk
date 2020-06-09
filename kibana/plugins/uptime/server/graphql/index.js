"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DEFAULT_GRAPHQL_PATH", {
  enumerable: true,
  get: function () {
    return _constants.DEFAULT_GRAPHQL_PATH;
  }
});
exports.typeDefs = exports.resolvers = void 0;

var _monitor_states = require("./monitor_states");

var _pings = require("./pings");

var _unsigned_int_scalar = require("./unsigned_int_scalar");

var _constants = require("./constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const resolvers = [_monitor_states.createMonitorStatesResolvers, _pings.createPingsResolvers, _unsigned_int_scalar.unsignedIntegerResolverFunctions];
exports.resolvers = resolvers;
const typeDefs = [_pings.pingsSchema, _unsigned_int_scalar.unsignedIntegerSchema, _monitor_states.monitorStatesSchema];
exports.typeDefs = typeDefs;