"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExecutionHandler = createExecutionHandler;

var _lodash = require("lodash");

var _transform_action_params = require("./transform_action_params");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createExecutionHandler({
  logger,
  alertId,
  alertName,
  tags,
  actionsPlugin,
  actions: alertActions,
  spaceId,
  apiKey,
  alertType
}) {
  const alertTypeActionGroups = new Set((0, _lodash.pluck)(alertType.actionGroups, 'id'));
  return async ({
    actionGroup,
    context,
    state,
    alertInstanceId
  }) => {
    if (!alertTypeActionGroups.has(actionGroup)) {
      logger.error(`Invalid action group "${actionGroup}" for alert "${alertType.id}".`);
      return;
    }

    const actions = alertActions.filter(({
      group
    }) => group === actionGroup).map(action => {
      return { ...action,
        params: (0, _transform_action_params.transformActionParams)({
          alertId,
          alertName,
          spaceId,
          tags,
          alertInstanceId,
          context,
          actionParams: action.params,
          state
        })
      };
    });

    for (const action of actions) {
      if (actionsPlugin.isActionTypeEnabled(action.actionTypeId)) {
        await actionsPlugin.execute({
          id: action.id,
          params: action.params,
          spaceId,
          apiKey
        });
      } else {
        logger.warn(`Alert "${alertId}" skipped scheduling action "${action.id}" because it is disabled`);
      }
    }
  };
}