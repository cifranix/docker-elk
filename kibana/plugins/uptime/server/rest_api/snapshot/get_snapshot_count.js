"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetSnapshotCount = void 0;

var _configSchema = require("@kbn/config-schema");

var _rest_api = require("../../../../../legacy/plugins/uptime/common/constants/rest_api");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createGetSnapshotCount = libs => ({
  method: 'GET',
  path: _rest_api.API_URLS.SNAPSHOT_COUNT,
  validate: {
    query: _configSchema.schema.object({
      dateRangeStart: _configSchema.schema.string(),
      dateRangeEnd: _configSchema.schema.string(),
      filters: _configSchema.schema.maybe(_configSchema.schema.string()),
      statusFilter: _configSchema.schema.maybe(_configSchema.schema.string())
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
      filters,
      statusFilter
    } = request.query;
    const result = await libs.requests.getSnapshotCount({
      callES,
      dynamicSettings,
      dateRangeStart,
      dateRangeEnd,
      filters,
      statusFilter
    });
    return response.ok({
      body: { ...result
      }
    });
  }
});

exports.createGetSnapshotCount = createGetSnapshotCount;