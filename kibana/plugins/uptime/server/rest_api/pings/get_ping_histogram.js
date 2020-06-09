"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetPingHistogramRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _rest_api = require("../../../../../legacy/plugins/uptime/common/constants/rest_api");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createGetPingHistogramRoute = libs => ({
  method: 'GET',
  path: _rest_api.API_URLS.PING_HISTOGRAM,
  validate: {
    query: _configSchema.schema.object({
      dateStart: _configSchema.schema.string(),
      dateEnd: _configSchema.schema.string(),
      monitorId: _configSchema.schema.maybe(_configSchema.schema.string()),
      statusFilter: _configSchema.schema.maybe(_configSchema.schema.string()),
      filters: _configSchema.schema.maybe(_configSchema.schema.string())
    })
  },
  options: {
    tags: ['access:uptime-read']
  },
  handler: async ({
    callES,
    dynamicSettings
  }, _context, request, response) => {
    const {
      dateStart,
      dateEnd,
      statusFilter,
      monitorId,
      filters
    } = request.query;
    const result = await libs.requests.getPingHistogram({
      callES,
      dynamicSettings,
      from: dateStart,
      to: dateEnd,
      monitorId,
      statusFilter,
      filters
    });
    return response.ok({
      body: { ...result
      }
    });
  }
});

exports.createGetPingHistogramRoute = createGetPingHistogramRoute;