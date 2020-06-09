"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServices = getServices;

var _lodash = require("lodash");

var _has_historical_agent_data = require("./has_historical_agent_data");

var _get_legacy_data_status = require("./get_legacy_data_status");

var _get_services_items = require("./get_services_items");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getServices(setup) {
  const [items, hasLegacyData] = await Promise.all([(0, _get_services_items.getServicesItems)(setup), (0, _get_legacy_data_status.getLegacyDataStatus)(setup)]);
  const noDataInCurrentTimeRange = (0, _lodash.isEmpty)(items);
  const hasHistoricalData = noDataInCurrentTimeRange ? await (0, _has_historical_agent_data.hasHistoricalAgentData)(setup) : true;
  return {
    items,
    hasHistoricalData,
    hasLegacyData
  };
}