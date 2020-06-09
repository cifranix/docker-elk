"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRANSACTION_ALERT_AGGREGATION_TYPES = exports.ALERT_TYPES_CONFIG = exports.AlertType = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let AlertType;
exports.AlertType = AlertType;

(function (AlertType) {
  AlertType["ErrorRate"] = "apm.error_rate";
  AlertType["TransactionDuration"] = "apm.transaction_duration";
})(AlertType || (exports.AlertType = AlertType = {}));

const ALERT_TYPES_CONFIG = {
  [AlertType.ErrorRate]: {
    name: _i18n.i18n.translate('xpack.apm.errorRateAlert.name', {
      defaultMessage: 'Error rate'
    }),
    actionGroups: [{
      id: 'threshold_met',
      name: _i18n.i18n.translate('xpack.apm.errorRateAlert.thresholdMet', {
        defaultMessage: 'Threshold met'
      })
    }],
    defaultActionGroupId: 'threshold_met'
  },
  [AlertType.TransactionDuration]: {
    name: _i18n.i18n.translate('xpack.apm.transactionDurationAlert.name', {
      defaultMessage: 'Transaction duration'
    }),
    actionGroups: [{
      id: 'threshold_met',
      name: _i18n.i18n.translate('xpack.apm.transactionDurationAlert.thresholdMet', {
        defaultMessage: 'Threshold met'
      })
    }],
    defaultActionGroupId: 'threshold_met'
  }
};
exports.ALERT_TYPES_CONFIG = ALERT_TYPES_CONFIG;
const TRANSACTION_ALERT_AGGREGATION_TYPES = {
  avg: _i18n.i18n.translate('xpack.apm.transactionDurationAlert.aggregationType.avg', {
    defaultMessage: 'Average'
  }),
  '95th': _i18n.i18n.translate('xpack.apm.transactionDurationAlert.aggregationType.95th', {
    defaultMessage: '95th percentile'
  }),
  '99th': _i18n.i18n.translate('xpack.apm.transactionDurationAlert.aggregationType.99th', {
    defaultMessage: '99th percentile'
  })
};
exports.TRANSACTION_ALERT_AGGREGATION_TYPES = TRANSACTION_ALERT_AGGREGATION_TYPES;