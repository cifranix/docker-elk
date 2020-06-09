"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerApmAlerts = registerApmAlerts;

var _register_transaction_duration_alert_type = require("./register_transaction_duration_alert_type");

var _register_error_rate_alert_type = require("./register_error_rate_alert_type");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function registerApmAlerts(params) {
  (0, _register_transaction_duration_alert_type.registerTransactionDurationAlertType)({
    alerting: params.alerting,
    config$: params.config$
  });
  (0, _register_error_rate_alert_type.registerErrorRateAlertType)({
    alerting: params.alerting,
    config$: params.config$
  });
}