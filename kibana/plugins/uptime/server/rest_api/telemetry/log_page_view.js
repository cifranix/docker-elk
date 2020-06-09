"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogPageViewRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _telemetry = require("../../lib/adapters/telemetry");

var _constants = require("../../../../../legacy/plugins/uptime/common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createLogPageViewRoute = () => ({
  method: 'POST',
  path: _constants.API_URLS.LOG_PAGE_VIEW,
  validate: {
    body: _configSchema.schema.object({
      page: _configSchema.schema.string(),
      dateStart: _configSchema.schema.string(),
      dateEnd: _configSchema.schema.string(),
      autoRefreshEnabled: _configSchema.schema.boolean(),
      autorefreshInterval: _configSchema.schema.number(),
      refreshTelemetryHistory: _configSchema.schema.maybe(_configSchema.schema.boolean())
    })
  },
  handler: async ({
    savedObjectsClient,
    callES,
    dynamicSettings
  }, _context, request, response) => {
    await _telemetry.KibanaTelemetryAdapter.countNoOfUniqueMonitorAndLocations(callES, savedObjectsClient);

    const pageViewResult = _telemetry.KibanaTelemetryAdapter.countPageView(request.body);

    return response.ok({
      body: pageViewResult
    });
  },
  options: {
    tags: ['access:uptime-read']
  }
});

exports.createLogPageViewRoute = createLogPageViewRoute;