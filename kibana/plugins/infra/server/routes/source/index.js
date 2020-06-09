"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSourceRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _source_api = require("../../../common/http_api/source_api");

var _types = require("../../graphql/types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const typeToInfraIndexType = value => {
  switch (value) {
    case 'metrics':
      return _types.InfraIndexType.METRICS;

    case 'logs':
      return _types.InfraIndexType.LOGS;

    default:
      return _types.InfraIndexType.ANY;
  }
};

const initSourceRoute = libs => {
  const {
    framework
  } = libs;
  framework.registerRoute({
    method: 'get',
    path: '/api/metrics/source/{sourceId}/{type?}',
    validate: {
      params: _configSchema.schema.object({
        sourceId: _configSchema.schema.string(),
        type: _configSchema.schema.string()
      })
    }
  }, async (requestContext, request, response) => {
    try {
      const {
        type,
        sourceId
      } = request.params;
      const source = await libs.sources.getSourceConfiguration(requestContext, sourceId);

      if (!source) {
        return response.notFound();
      }

      const status = {
        logIndicesExist: await libs.sourceStatus.hasLogIndices(requestContext, sourceId),
        metricIndicesExist: await libs.sourceStatus.hasMetricIndices(requestContext, sourceId),
        indexFields: await libs.fields.getFields(requestContext, sourceId, typeToInfraIndexType(type))
      };
      return response.ok({
        body: _source_api.SourceResponseRuntimeType.encode({
          source,
          status
        })
      });
    } catch (error) {
      return response.internalError({
        body: error.message
      });
    }
  });
};

exports.initSourceRoute = initSourceRoute;