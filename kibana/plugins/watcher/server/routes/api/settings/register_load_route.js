"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerLoadRoute = registerLoadRoute;

var _is_es_error = require("../../../lib/is_es_error");

var _index = require("../../../models/settings/index");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
function fetchClusterSettings(client) {
  return client.callAsInternalUser('cluster.getSettings', {
    includeDefaults: true,
    filterPath: '**.xpack.notification'
  });
}

function registerLoadRoute(deps) {
  deps.router.get({
    path: '/api/watcher/settings',
    validate: false
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(deps, async (ctx, request, response) => {
    try {
      const settings = await fetchClusterSettings(ctx.watcher.client);
      return response.ok({
        body: _index.Settings.fromUpstreamJson(settings).downstreamJson
      });
    } catch (e) {
      // Case: Error from Elasticsearch JS client
      if ((0, _is_es_error.isEsError)(e)) {
        return response.customError({
          statusCode: e.statusCode,
          body: e
        });
      } // Case: default


      return response.internalError({
        body: e
      });
    }
  }));
}