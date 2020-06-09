"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedObjectMappings = void 0;

var _sources = require("./lib/sources");

var _metrics_explorer_view = require("../common/saved_objects/metrics_explorer_view");

var _inventory_view = require("../common/saved_objects/inventory_view");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const savedObjectMappings = { ..._sources.infraSourceConfigurationSavedObjectMappings,
  ..._metrics_explorer_view.metricsExplorerViewSavedObjectMappings,
  ..._inventory_view.inventoryViewSavedObjectMappings
};
exports.savedObjectMappings = savedObjectMappings;