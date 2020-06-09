"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uptimeRouteWrapper = void 0;

var _saved_objects = require("../lib/saved_objects");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const uptimeRouteWrapper = uptimeRoute => {
  return { ...uptimeRoute,
    handler: async (context, request, response) => {
      const {
        callAsCurrentUser: callES
      } = context.core.elasticsearch.dataClient;
      const {
        client: savedObjectsClient
      } = context.core.savedObjects;
      const dynamicSettings = await _saved_objects.savedObjectsAdapter.getUptimeDynamicSettings(savedObjectsClient);
      return await uptimeRoute.handler({
        callES,
        savedObjectsClient,
        dynamicSettings
      }, context, request, response);
    }
  };
};

exports.uptimeRouteWrapper = uptimeRouteWrapper;