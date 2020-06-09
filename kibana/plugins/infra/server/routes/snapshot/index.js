"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSnapshotRoute = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _configSchema = require("@kbn/config-schema");

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _usage_collector = require("../../usage/usage_collector");

var _serialized_query = require("../../utils/serialized_query");

var _snapshot_api = require("../../../common/http_api/snapshot_api");

var _runtime_types = require("../../../common/runtime_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const escapeHatch = _configSchema.schema.object({}, {
  unknowns: 'allow'
});

const initSnapshotRoute = libs => {
  const {
    framework
  } = libs;
  framework.registerRoute({
    method: 'post',
    path: '/api/metrics/snapshot',
    validate: {
      body: escapeHatch
    }
  }, async (requestContext, request, response) => {
    try {
      const {
        filterQuery,
        nodeType,
        groupBy,
        sourceId,
        metric,
        timerange,
        accountId,
        region
      } = (0, _pipeable.pipe)(_snapshot_api.SnapshotRequestRT.decode(request.body), (0, _Either.fold)((0, _runtime_types.throwErrors)(_boom.default.badRequest), _function.identity));
      const source = await libs.sources.getSourceConfiguration(requestContext, sourceId);

      _usage_collector.UsageCollector.countNode(nodeType);

      const options = {
        filterQuery: (0, _serialized_query.parseFilterQuery)(filterQuery),
        accountId,
        region,
        nodeType,
        groupBy,
        sourceConfiguration: source.configuration,
        metric,
        timerange
      };
      const nodesWithInterval = await libs.snapshot.getNodes(requestContext, options);
      return response.ok({
        body: _snapshot_api.SnapshotNodeResponseRT.encode(nodesWithInterval)
      });
    } catch (error) {
      return response.internalError({
        body: error.message
      });
    }
  });
};

exports.initSnapshotRoute = initSnapshotRoute;