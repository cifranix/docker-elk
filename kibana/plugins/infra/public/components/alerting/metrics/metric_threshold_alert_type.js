"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlertType = getAlertType;

var _i18n = require("@kbn/i18n");

var _expression = require("./expression");

var _validation = require("./validation");

var _types = require("../../../../server/lib/alerting/metric_threshold/types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
function getAlertType() {
  return {
    id: _types.METRIC_THRESHOLD_ALERT_TYPE_ID,
    name: _i18n.i18n.translate('xpack.infra.metrics.alertFlyout.alertName', {
      defaultMessage: 'Metric threshold'
    }),
    iconClass: 'bell',
    alertParamsExpression: _expression.Expressions,
    validate: _validation.validateMetricThreshold,
    defaultActionMessage: _i18n.i18n.translate('xpack.infra.metrics.alerting.threshold.defaultActionMessage', {
      defaultMessage: "\\{\\{alertName\\}\\} - \\{\\{context.group\\}\\}\n\n\\{\\{context.metricOf.condition0\\}\\} has crossed a threshold of \\{\\{context.thresholdOf.condition0\\}\\}\nCurrent value is \\{\\{context.valueOf.condition0\\}\\}\n"
    })
  };
}