"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIS_USAGE_TYPE = exports.VIS_TELEMETRY_TASK = exports.PLUGIN_ID = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const PLUGIN_ID = 'oss_telemetry'; // prefix used for registering properties with services from this plugin

exports.PLUGIN_ID = PLUGIN_ID;
const VIS_TELEMETRY_TASK = 'vis_telemetry'; // suffix for the _id of our task instance, which must be `get`-able

exports.VIS_TELEMETRY_TASK = VIS_TELEMETRY_TASK;
const VIS_USAGE_TYPE = 'visualization_types'; // suffix for the properties of data registered with the usage service

exports.VIS_USAGE_TYPE = VIS_USAGE_TYPE;