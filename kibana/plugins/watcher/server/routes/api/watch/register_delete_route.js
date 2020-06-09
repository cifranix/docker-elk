"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerDeleteRoute = registerDeleteRoute;

var _configSchema = require("@kbn/config-schema");

var _is_es_error = require("../../../lib/is_es_error");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const paramsSchema = _configSchema.schema.object({
  watchId: _configSchema.schema.string()
});

function deleteWatch(dataClient, watchId) {
  return dataClient.callAsCurrentUser('watcher.deleteWatch', {
    id: watchId
  });
}

function registerDeleteRoute(deps) {
  deps.router.delete({
    path: '/api/watcher/watch/{watchId}',
    validate: {
      params: paramsSchema
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(deps, async (ctx, request, response) => {
    const {
      watchId
    } = request.params;

    try {
      return response.ok({
        body: await deleteWatch(ctx.watcher.client, watchId)
      });
    } catch (e) {
      // Case: Error from Elasticsearch JS client
      if ((0, _is_es_error.isEsError)(e)) {
        const body = e.statusCode === 404 ? `Watch with id = ${watchId} not found` : e;
        return response.customError({
          statusCode: e.statusCode,
          body
        });
      } // Case: default


      return response.internalError({
        body: e
      });
    }
  }));
}