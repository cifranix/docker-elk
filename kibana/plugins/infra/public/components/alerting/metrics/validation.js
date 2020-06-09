"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateMetricThreshold = validateMetricThreshold;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function validateMetricThreshold(_ref) {
  var criteria = _ref.criteria;
  var validationResult = {
    errors: {}
  };
  var errors = {};
  validationResult.errors = errors;

  if (!criteria || !criteria.length) {
    return validationResult;
  }

  criteria.forEach(function (c, idx) {
    // Create an id for each criteria, so we can map errors to specific criteria.
    var id = idx.toString();
    errors[id] = errors[id] || {
      aggField: [],
      timeSizeUnit: [],
      timeWindowSize: [],
      threshold0: [],
      threshold1: [],
      metric: []
    };

    if (!c.aggType) {
      errors[id].aggField.push(_i18n.i18n.translate('xpack.infra.metrics.alertFlyout.error.aggregationRequired', {
        defaultMessage: 'Aggreation is required.'
      }));
    }

    if (!c.threshold || !c.threshold.length) {
      errors[id].threshold0.push(_i18n.i18n.translate('xpack.infra.metrics.alertFlyout.error.thresholdRequired', {
        defaultMessage: 'Threshold is required.'
      }));
    }

    if (c.comparator === 'between' && (!c.threshold || c.threshold.length < 2)) {
      errors[id].threshold1.push(_i18n.i18n.translate('xpack.infra.metrics.alertFlyout.error.thresholdRequired', {
        defaultMessage: 'Threshold is required.'
      }));
    }

    if (!c.timeSize) {
      errors[id].timeWindowSize.push(_i18n.i18n.translate('xpack.infra.metrics.alertFlyout.error.timeRequred', {
        defaultMessage: 'Time size is Required.'
      }));
    }

    if (!c.metric && c.aggType !== 'count') {
      errors[id].metric.push(_i18n.i18n.translate('xpack.infra.metrics.alertFlyout.error.metricRequired', {
        defaultMessage: 'Metric is required.'
      }));
    }
  });
  return validationResult;
}