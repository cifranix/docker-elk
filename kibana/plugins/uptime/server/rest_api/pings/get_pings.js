"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetPingsRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _rest_api = require("../../../../../legacy/plugins/uptime/common/constants/rest_api");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createGetPingsRoute = libs => ({
  method: 'GET',
  path: _rest_api.API_URLS.PINGS,
  validate: {
    query: _configSchema.schema.object({
      dateRangeStart: _configSchema.schema.string(),
      dateRangeEnd: _configSchema.schema.string(),
      location: _configSchema.schema.maybe(_configSchema.schema.string()),
      monitorId: _configSchema.schema.maybe(_configSchema.schema.string()),
      size: _configSchema.schema.maybe(_configSchema.schema.number()),
      sort: _configSchema.schema.maybe(_configSchema.schema.string()),
      status: _configSchema.schema.maybe(_configSchema.schema.string())
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
      dateRangeStart,
      dateRangeEnd,
      location,
      monitorId,
      size,
      sort,
      status
    } = request.query;
    const result = await libs.requests.getPings({
      callES,
      dynamicSettings,
      dateRangeStart,
      dateRangeEnd,
      monitorId,
      status,
      sort,
      size,
      location
    });
    return response.ok({
      body: { ...result
      }
    });
  }
});

exports.createGetPingsRoute = createGetPingsRoute;