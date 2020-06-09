"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTransactionDurationAlertType = registerTransactionDurationAlertType;

var _configSchema = require("@kbn/config-schema");

var _operators = require("rxjs/operators");

var _i18n = require("@kbn/i18n");

var _alert_types = require("../../../common/alert_types");

var _elasticsearch_fieldnames = require("../../../common/elasticsearch_fieldnames");

var _get_apm_indices = require("../settings/apm_indices/get_apm_indices");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const paramsSchema = _configSchema.schema.object({
  serviceName: _configSchema.schema.string(),
  transactionType: _configSchema.schema.string(),
  windowSize: _configSchema.schema.number(),
  windowUnit: _configSchema.schema.string(),
  threshold: _configSchema.schema.number(),
  aggregationType: _configSchema.schema.oneOf([_configSchema.schema.literal('avg'), _configSchema.schema.literal('95th'), _configSchema.schema.literal('99th')])
});

const alertTypeConfig = _alert_types.ALERT_TYPES_CONFIG[_alert_types.AlertType.TransactionDuration];

function registerTransactionDurationAlertType({
  alerting,
  config$
}) {
  alerting.registerType({
    id: _alert_types.AlertType.TransactionDuration,
    name: alertTypeConfig.name,
    actionGroups: alertTypeConfig.actionGroups,
    defaultActionGroupId: alertTypeConfig.defaultActionGroupId,
    validate: {
      params: paramsSchema
    },
    actionVariables: {
      context: [{
        description: _i18n.i18n.translate('xpack.apm.registerTransactionDurationAlertType.variables.serviceName', {
          defaultMessage: 'Service name'
        }),
        name: 'serviceName'
      }, {
        description: _i18n.i18n.translate('xpack.apm.registerTransactionDurationAlertType.variables.transactionType', {
          defaultMessage: 'Transaction type'
        }),
        name: 'transactionType'
      }]
    },
    executor: async ({
      services,
      params
    }) => {
      const config = await config$.pipe((0, _operators.take)(1)).toPromise();
      const alertParams = params;
      const indices = await (0, _get_apm_indices.getApmIndices)({
        config,
        savedObjectsClient: services.savedObjectsClient
      });
      const searchParams = {
        index: indices['apm_oss.transactionIndices'],
        size: 0,
        body: {
          query: {
            bool: {
              filter: [{
                range: {
                  '@timestamp': {
                    gte: `now-${alertParams.windowSize}${alertParams.windowUnit}`
                  }
                }
              }, {
                term: {
                  [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'transaction'
                }
              }, {
                term: {
                  [_elasticsearch_fieldnames.SERVICE_NAME]: alertParams.serviceName
                }
              }, {
                term: {
                  [_elasticsearch_fieldnames.TRANSACTION_TYPE]: alertParams.transactionType
                }
              }]
            }
          },
          aggs: {
            agg: alertParams.aggregationType === 'avg' ? {
              avg: {
                field: _elasticsearch_fieldnames.TRANSACTION_DURATION
              }
            } : {
              percentiles: {
                field: _elasticsearch_fieldnames.TRANSACTION_DURATION,
                percents: [alertParams.aggregationType === '95th' ? 95 : 99]
              }
            }
          }
        }
      };
      const response = await services.callCluster('search', searchParams);

      if (!response.aggregations) {
        return;
      }

      const {
        agg
      } = response.aggregations;
      const value = 'values' in agg ? agg.values[0] : agg.value;

      if (value && value > alertParams.threshold * 1000) {
        const alertInstance = services.alertInstanceFactory(_alert_types.AlertType.TransactionDuration);
        alertInstance.scheduleActions(alertTypeConfig.defaultActionGroupId, {
          transactionType: alertParams.transactionType,
          serviceName: alertParams.serviceName
        });
      }

      return {};
    }
  });
}