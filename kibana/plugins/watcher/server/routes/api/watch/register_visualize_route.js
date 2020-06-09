"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerVisualizeRoute = registerVisualizeRoute;

var _configSchema = require("@kbn/config-schema");

var _is_es_error = require("../../../lib/is_es_error");

var _license_pre_routing_factory = require("../../../lib/license_pre_routing_factory");

var _index = require("../../../models/watch/index");

var _index2 = require("../../../models/visualize_options/index");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
const bodySchema = _configSchema.schema.object({
  watch: _configSchema.schema.object({}, {
    unknowns: 'allow'
  }),
  options: _configSchema.schema.object({}, {
    unknowns: 'allow'
  })
});

function fetchVisualizeData(dataClient, index, body) {
  const params = {
    index,
    body,
    ignoreUnavailable: true,
    allowNoIndices: true,
    ignore: [404]
  };
  return dataClient.callAsCurrentUser('search', params);
}

function registerVisualizeRoute(deps) {
  deps.router.post({
    path: '/api/watcher/watch/visualize',
    validate: {
      body: bodySchema
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(deps, async (ctx, request, response) => {
    const watch = _index.Watch.fromDownstreamJson(request.body.watch);

    const options = _index2.VisualizeOptions.fromDownstreamJson(request.body.options);

    const body = watch.getVisualizeQuery(options);

    try {
      const hits = await fetchVisualizeData(ctx.watcher.client, watch.index, body);
      const visualizeData = watch.formatVisualizeData(hits);
      return response.ok({
        body: {
          visualizeData
        }
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