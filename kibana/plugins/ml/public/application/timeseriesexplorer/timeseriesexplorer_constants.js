"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_FIELD_NAME = exports.MAX_SCHEDULED_EVENTS = exports.CHARTS_POINT_TARGET = exports.APP_STATE_ACTION = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Contains values for ML time series explorer.
 */
var APP_STATE_ACTION = {
  CLEAR: 'CLEAR',
  SET_DETECTOR_INDEX: 'SET_DETECTOR_INDEX',
  SET_ENTITIES: 'SET_ENTITIES',
  SET_FORECAST_ID: 'SET_FORECAST_ID',
  SET_ZOOM: 'SET_ZOOM',
  UNSET_ZOOM: 'UNSET_ZOOM'
};
exports.APP_STATE_ACTION = APP_STATE_ACTION;
var CHARTS_POINT_TARGET = 500; // Max number of scheduled events displayed per bucket.

exports.CHARTS_POINT_TARGET = CHARTS_POINT_TARGET;
var MAX_SCHEDULED_EVENTS = 10;
exports.MAX_SCHEDULED_EVENTS = MAX_SCHEDULED_EVENTS;
var TIME_FIELD_NAME = 'timestamp';
exports.TIME_FIELD_NAME = TIME_FIELD_NAME;