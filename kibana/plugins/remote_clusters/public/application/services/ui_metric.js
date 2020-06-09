"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.trackUserRequest = trackUserRequest;
exports.METRIC_TYPE = exports.trackUiMetric = void 0;

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var trackUiMetric;
exports.trackUiMetric = trackUiMetric;
var METRIC_TYPE;
exports.METRIC_TYPE = METRIC_TYPE;

function init(usageCollection) {
  exports.trackUiMetric = trackUiMetric = usageCollection.reportUiStats.bind(usageCollection, _constants.UIM_APP_NAME);
  exports.METRIC_TYPE = METRIC_TYPE = usageCollection.METRIC_TYPE;
}
/**
 * Transparently return provided request Promise, while allowing us to track
 * a successful completion of the request.
 */


function trackUserRequest(request, eventName) {
  // Only track successful actions.
  return request.then(function (response) {
    trackUiMetric(METRIC_TYPE.COUNT, eventName); // We return the response immediately without waiting for the tracking request to resolve,
    // to avoid adding additional latency.

    return response;
  });
}