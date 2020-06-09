"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerMetricThresholdAlertType = registerMetricThresholdAlertType;

var _i18n = require("@kbn/i18n");

var _uuid = _interopRequireDefault(require("uuid"));

var _configSchema = require("@kbn/config-schema");

var _metric_threshold_executor = require("./metric_threshold_executor");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function registerMetricThresholdAlertType(alertingPlugin) {
  if (!alertingPlugin) {
    throw new Error('Cannot register metric threshold alert type.  Both the actions and alerting plugins need to be enabled.');
  }

  const alertUUID = _uuid.default.v4();

  const baseCriterion = {
    threshold: _configSchema.schema.arrayOf(_configSchema.schema.number()),
    comparator: _configSchema.schema.oneOf([_configSchema.schema.literal('>'), _configSchema.schema.literal('<'), _configSchema.schema.literal('>='), _configSchema.schema.literal('<='), _configSchema.schema.literal('between')]),
    timeUnit: _configSchema.schema.string(),
    timeSize: _configSchema.schema.number()
  };

  const nonCountCriterion = _configSchema.schema.object({ ...baseCriterion,
    metric: _configSchema.schema.string(),
    aggType: _configSchema.schema.oneOf([_configSchema.schema.literal('avg'), _configSchema.schema.literal('min'), _configSchema.schema.literal('max'), _configSchema.schema.literal('rate'), _configSchema.schema.literal('cardinality')])
  });

  const countCriterion = _configSchema.schema.object({ ...baseCriterion,
    aggType: _configSchema.schema.literal('count'),
    metric: _configSchema.schema.never()
  });

  const groupActionVariableDescription = _i18n.i18n.translate('xpack.infra.metrics.alerting.threshold.alerting.groupActionVariableDescription', {
    defaultMessage: 'Name of the group reporting data'
  });

  const valueOfActionVariableDescription = _i18n.i18n.translate('xpack.infra.metrics.alerting.threshold.alerting.valueOfActionVariableDescription', {
    defaultMessage: 'Record of the current value of the watched metric; grouped by condition, i.e valueOf.condition0, valueOf.condition1, etc.'
  });

  const thresholdOfActionVariableDescription = _i18n.i18n.translate('xpack.infra.metrics.alerting.threshold.alerting.thresholdOfActionVariableDescription', {
    defaultMessage: 'Record of the alerting threshold; grouped by condition, i.e thresholdOf.condition0, thresholdOf.condition1, etc.'
  });

  const metricOfActionVariableDescription = _i18n.i18n.translate('xpack.infra.metrics.alerting.threshold.alerting.metricOfActionVariableDescription', {
    defaultMessage: 'Record of the watched metric; grouped by condition, i.e metricOf.condition0, metricOf.condition1, etc.'
  });

  alertingPlugin.registerType({
    id: _types.METRIC_THRESHOLD_ALERT_TYPE_ID,
    name: 'Metric threshold',
    validate: {
      params: _configSchema.schema.object({
        criteria: _configSchema.schema.arrayOf(_configSchema.schema.oneOf([countCriterion, nonCountCriterion])),
        groupBy: _configSchema.schema.maybe(_configSchema.schema.string()),
        filterQuery: _configSchema.schema.maybe(_configSchema.schema.string()),
        sourceId: _configSchema.schema.string()
      })
    },
    defaultActionGroupId: _metric_threshold_executor.FIRED_ACTIONS.id,
    actionGroups: [_metric_threshold_executor.FIRED_ACTIONS],
    executor: (0, _metric_threshold_executor.createMetricThresholdExecutor)(alertUUID),
    actionVariables: {
      context: [{
        name: 'group',
        description: groupActionVariableDescription
      }, {
        name: 'valueOf',
        description: valueOfActionVariableDescription
      }, {
        name: 'thresholdOf',
        description: thresholdOfActionVariableDescription
      }, {
        name: 'metricOf',
        description: metricOfActionVariableDescription
      }]
    }
  });
}