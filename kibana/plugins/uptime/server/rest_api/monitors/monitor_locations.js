"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetMonitorLocationsRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _rest_api = require("../../../../../legacy/plugins/uptime/common/constants/rest_api");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createGetMonitorLocationsRoute = libs => ({
  method: 'GET',
  path: _rest_api.API_URLS.MONITOR_LOCATIONS,
  validate: {
    query: _configSchema.schema.object({
      monitorId: _configSchema.schema.string(),
      dateStart: _configSchema.schema.string(),
      dateEnd: _configSchema.schema.string()
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
      monitorId,
      dateStart,
      dateEnd
    } = request.query;
    return response.ok({
      body: { ...(await libs.requests.getMonitorLocations({
          callES,
          dynamicSettings,
          monitorId,
          dateStart,
          dateEnd
        }))
      }
    });
  }
});

exports.createGetMonitorLocationsRoute = createGetMonitorLocationsRoute;