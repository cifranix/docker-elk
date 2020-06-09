"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetIndexStatusRoute = void 0;

var _constants = require("../../../../../legacy/plugins/uptime/common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createGetIndexStatusRoute = libs => ({
  method: 'GET',
  path: _constants.API_URLS.INDEX_STATUS,
  validate: false,
  options: {
    tags: ['access:uptime-read']
  },
  handler: async ({
    callES,
    dynamicSettings
  }, _context, _request, response) => {
    try {
      return response.ok({
        body: { ...(await libs.requests.getIndexStatus({
            callES,
            dynamicSettings
          }))
        }
      });
    } catch (e) {
      return response.internalError({
        body: {
          message: e.message
        }
      });
    }
  }
});

exports.createGetIndexStatusRoute = createGetIndexStatusRoute;