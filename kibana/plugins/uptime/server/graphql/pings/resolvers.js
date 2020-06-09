"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPingsResolvers = void 0;

var _saved_objects = require("../../lib/saved_objects");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createPingsResolvers = libs => ({
  Query: {
    async allPings(_resolver, {
      monitorId,
      sort,
      size,
      status,
      dateRangeStart,
      dateRangeEnd,
      location,
      page
    }, {
      APICaller,
      savedObjectsClient
    }) {
      const dynamicSettings = await _saved_objects.savedObjectsAdapter.getUptimeDynamicSettings(savedObjectsClient);
      return await libs.requests.getPings({
        callES: APICaller,
        dynamicSettings,
        dateRangeStart,
        dateRangeEnd,
        monitorId,
        status,
        sort,
        size,
        location,
        page
      });
    }

  }
});

exports.createPingsResolvers = createPingsResolvers;