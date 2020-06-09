"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_RANGE_TYPE = exports.URL_TYPE = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var URL_TYPE = {
  KIBANA_DASHBOARD: 'KIBANA_DASHBOARD',
  KIBANA_DISCOVER: 'KIBANA_DISCOVER',
  OTHER: 'OTHER'
};
exports.URL_TYPE = URL_TYPE;
var TIME_RANGE_TYPE = {
  AUTO: 'auto',
  INTERVAL: 'interval'
};
exports.TIME_RANGE_TYPE = TIME_RANGE_TYPE;