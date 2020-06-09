"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerListFieldsRoute = registerListFieldsRoute;

var _configSchema = require("@kbn/config-schema");

var _is_es_error = require("../../lib/is_es_error");

var _index = require("../../models/fields/index");

var _license_pre_routing_factory = require("../../lib/license_pre_routing_factory");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const bodySchema = _configSchema.schema.object({
  indexes: _configSchema.schema.arrayOf(_configSchema.schema.string())
});

function fetchFields(dataClient, indexes) {
  const params = {
    index: indexes,
    fields: ['*'],
    ignoreUnavailable: true,
    allowNoIndices: true,
    ignore: 404
  };
  return dataClient.callAsCurrentUser('fieldCaps', params);
}

function registerListFieldsRoute(deps) {
  deps.router.post({
    path: '/api/watcher/fields',
    validate: {
      body: bodySchema
    }
  }, (0, _license_pre_routing_factory.licensePreRoutingFactory)(deps, async (ctx, request, response) => {
    const {
      indexes
    } = request.body;

    try {
      const fieldsResponse = await fetchFields(ctx.watcher.client, indexes);
      const json = fieldsResponse.status === 404 ? {
        fields: []
      } : fieldsResponse;

      const fields = _index.Fields.fromUpstreamJson(json);

      return response.ok({
        body: fields.downstreamJson
      });
    } catch (e) {
      // Case: Error from Elasticsearch JS client
      if ((0, _is_es_error.isEsError)(e)) {
        return response.customError({
          statusCode: e.statusCode,
          body: {
            message: e.message
          }
        });
      } // Case: default


      return response.internalError({
        body: e
      });
    }
  }));
}