"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlertType = getAlertType;
exports.getInvalidComparatorMessage = getInvalidComparatorMessage;
exports.ComparatorFnNames = exports.ID = void 0;

var _i18n = require("@kbn/i18n");

var _alert_type_params = require("./alert_type_params");

var _action_context = require("./action_context");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ID = '.index-threshold';
exports.ID = ID;
const ActionGroupId = 'threshold met';
const ComparatorFns = getComparatorFns();
const ComparatorFnNames = new Set(ComparatorFns.keys());
exports.ComparatorFnNames = ComparatorFnNames;

function getAlertType(service) {
  const {
    logger
  } = service;

  const alertTypeName = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.alertTypeTitle', {
    defaultMessage: 'Index threshold'
  });

  const actionGroupName = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.actionGroupThresholdMetTitle', {
    defaultMessage: 'Threshold Met'
  });

  const actionVariableContextGroupLabel = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.actionVariableContextGroupLabel', {
    defaultMessage: 'The group that exceeded the threshold.'
  });

  const actionVariableContextDateLabel = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.actionVariableContextDateLabel', {
    defaultMessage: 'The date the alert exceeded the threshold.'
  });

  const actionVariableContextValueLabel = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.actionVariableContextValueLabel', {
    defaultMessage: 'The value that exceeded the threshold.'
  });

  const actionVariableContextMessageLabel = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.actionVariableContextMessageLabel', {
    defaultMessage: 'A pre-constructed message for the alert.'
  });

  const actionVariableContextTitleLabel = _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.actionVariableContextTitleLabel', {
    defaultMessage: 'A pre-constructed title for the alert.'
  });

  return {
    id: ID,
    name: alertTypeName,
    actionGroups: [{
      id: ActionGroupId,
      name: actionGroupName
    }],
    defaultActionGroupId: ActionGroupId,
    validate: {
      params: _alert_type_params.ParamsSchema
    },
    actionVariables: {
      context: [{
        name: 'message',
        description: actionVariableContextMessageLabel
      }, {
        name: 'title',
        description: actionVariableContextTitleLabel
      }, {
        name: 'group',
        description: actionVariableContextGroupLabel
      }, {
        name: 'date',
        description: actionVariableContextDateLabel
      }, {
        name: 'value',
        description: actionVariableContextValueLabel
      }]
    },
    executor
  };

  async function executor(options) {
    const {
      alertId,
      name,
      services
    } = options;
    const params = options.params;
    const compareFn = ComparatorFns.get(params.thresholdComparator);

    if (compareFn == null) {
      throw new Error(getInvalidComparatorMessage(params.thresholdComparator));
    }

    const callCluster = services.callCluster;
    const date = new Date().toISOString(); // the undefined values below are for config-schema optional types

    const queryParams = {
      index: params.index,
      timeField: params.timeField,
      aggType: params.aggType,
      aggField: params.aggField,
      groupBy: params.groupBy,
      termField: params.termField,
      termSize: params.termSize,
      dateStart: date,
      dateEnd: date,
      timeWindowSize: params.timeWindowSize,
      timeWindowUnit: params.timeWindowUnit,
      interval: undefined
    }; // console.log(`index_threshold: query: ${JSON.stringify(queryParams, null, 4)}`);

    const result = await service.indexThreshold.timeSeriesQuery({
      logger,
      callCluster,
      query: queryParams
    });
    logger.debug(`alert ${ID}:${alertId} "${name}" query result: ${JSON.stringify(result)}`);
    const groupResults = result.results || []; // console.log(`index_threshold: response: ${JSON.stringify(groupResults, null, 4)}`);

    for (const groupResult of groupResults) {
      const instanceId = groupResult.group;
      const value = groupResult.metrics[0][1];
      const met = compareFn(value, params.threshold);
      if (!met) continue;
      const baseContext = {
        date,
        group: instanceId,
        value
      };
      const actionContext = (0, _action_context.addMessages)(options, baseContext, params);
      const alertInstance = options.services.alertInstanceFactory(instanceId);
      alertInstance.scheduleActions(ActionGroupId, actionContext);
      logger.debug(`scheduled actionGroup: ${JSON.stringify(actionContext)}`);
    }
  }
}

function getInvalidComparatorMessage(comparator) {
  return _i18n.i18n.translate('xpack.alertingBuiltins.indexThreshold.invalidComparatorErrorMessage', {
    defaultMessage: 'invalid thresholdComparator specified: {comparator}',
    values: {
      comparator
    }
  });
}

function getComparatorFns() {
  const fns = {
    '<': (value, threshold) => value < threshold[0],
    '<=': (value, threshold) => value <= threshold[0],
    '>=': (value, threshold) => value >= threshold[0],
    '>': (value, threshold) => value > threshold[0],
    between: (value, threshold) => value >= threshold[0] && value <= threshold[1],
    notBetween: (value, threshold) => value < threshold[0] || value > threshold[1]
  };
  const result = new Map();

  for (const key of Object.keys(fns)) {
    result.set(key, fns[key]);
  }

  return result;
}