"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerErrorRateAlertType = registerErrorRateAlertType;

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
  windowSize: _configSchema.schema.number(),
  windowUnit: _configSchema.schema.string(),
  threshold: _configSchema.schema.number()
});

const alertTypeConfig = _alert_types.ALERT_TYPES_CONFIG[_alert_types.AlertType.ErrorRate];

function registerErrorRateAlertType({
  alerting,
  config$
}) {
  alerting.registerType({
    id: _alert_types.AlertType.ErrorRate,
    name: alertTypeConfig.name,
    actionGroups: alertTypeConfig.actionGroups,
    defaultActionGroupId: alertTypeConfig.defaultActionGroupId,
    validate: {
      params: paramsSchema
    },
    actionVariables: {
      context: [{
        description: _i18n.i18n.translate('xpack.apm.registerErrorRateAlertType.variables.serviceName', {
          defaultMessage: 'Service name'
        }),
        name: 'serviceName'
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
        index: indices['apm_oss.errorIndices'],
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
                  [_elasticsearch_fieldnames.PROCESSOR_EVENT]: 'error'
                }
              }, {
                term: {
                  [_elasticsearch_fieldnames.SERVICE_NAME]: alertParams.serviceName
                }
              }]
            }
          },
          track_total_hits: true
        }
      };
      const response = await services.callCluster('search', searchParams);
      const value = response.hits.total.value;

      if (value && value > alertParams.threshold) {
        const alertInstance = services.alertInstanceFactory(_alert_types.AlertType.ErrorRate);
        alertInstance.scheduleActions(alertTypeConfig.defaultActionGroupId, {
          serviceName: alertParams.serviceName
        });
      }

      return {};
    }
  });
}