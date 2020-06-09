"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerAlertTypes = void 0;

var _register_metric_threshold_alert_type = require("./metric_threshold/register_metric_threshold_alert_type");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const registerAlertTypes = alertingPlugin => {
  if (alertingPlugin) {
    const registerFns = [_register_metric_threshold_alert_type.registerMetricThresholdAlertType];
    registerFns.forEach(fn => {
      fn(alertingPlugin);
    });
  }
};

exports.registerAlertTypes = registerAlertTypes;