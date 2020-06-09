"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTimeSeriesQueryRoute = createTimeSeriesQueryRoute;
Object.defineProperty(exports, "TimeSeriesQuery", {
  enumerable: true,
  get: function () {
    return _time_series_types.TimeSeriesQuery;
  }
});
Object.defineProperty(exports, "TimeSeriesResult", {
  enumerable: true,
  get: function () {
    return _time_series_types.TimeSeriesResult;
  }
});

var _time_series_types = require("../lib/time_series_types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createTimeSeriesQueryRoute(service, router, baseRoute) {
  const path = `${baseRoute}/_time_series_query`;
  service.logger.debug(`registering indexThreshold route POST ${path}`);
  router.post({
    path,
    validate: {
      body: _time_series_types.TimeSeriesQuerySchema
    }
  }, handler);

  async function handler(ctx, req, res) {
    service.logger.debug(`route ${path} request: ${JSON.stringify(req.body)}`);
    const result = await service.indexThreshold.timeSeriesQuery({
      logger: service.logger,
      callCluster: ctx.core.elasticsearch.dataClient.callAsCurrentUser,
      query: req.body
    });
    service.logger.debug(`route ${path} response: ${JSON.stringify(result)}`);
    return res.ok({
      body: result
    });
  }
}