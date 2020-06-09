"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetIndexPatternRoute = void 0;

var _rest_api = require("../../../../../legacy/plugins/uptime/common/constants/rest_api");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createGetIndexPatternRoute = libs => ({
  method: 'GET',
  path: _rest_api.API_URLS.INDEX_PATTERN,
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
        body: { ...(await libs.requests.getIndexPattern({
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

exports.createGetIndexPatternRoute = createGetIndexPatternRoute;