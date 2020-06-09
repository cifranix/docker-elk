"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionVariablesFromAlertType = actionVariablesFromAlertType;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// return a "flattened" list of action variables for an alertType
function actionVariablesFromAlertType(alertType) {
  var alwaysProvidedVars = getAlwaysProvidedActionVariables();
  var contextVars = prefixKeys(alertType.actionVariables.context, 'context.');
  var stateVars = prefixKeys(alertType.actionVariables.state, 'state.');
  return alwaysProvidedVars.concat(contextVars, stateVars);
}

function prefixKeys(actionVariables, prefix) {
  return actionVariables.map(function (actionVariable) {
    return {
      name: "".concat(prefix).concat(actionVariable.name),
      description: actionVariable.description
    };
  });
} // this list should be the same as in:
//   x-pack/plugins/alerting/server/task_runner/transform_action_params.ts


function getAlwaysProvidedActionVariables() {
  var result = [];
  result.push({
    name: 'alertId',
    description: _i18n.i18n.translate('xpack.triggersActionsUI.actionVariables.alertIdLabel', {
      defaultMessage: 'The id of the alert.'
    })
  });
  result.push({
    name: 'alertName',
    description: _i18n.i18n.translate('xpack.triggersActionsUI.actionVariables.alertNameLabel', {
      defaultMessage: 'The name of the alert.'
    })
  });
  result.push({
    name: 'spaceId',
    description: _i18n.i18n.translate('xpack.triggersActionsUI.actionVariables.spaceIdLabel', {
      defaultMessage: 'The spaceId of the alert.'
    })
  });
  result.push({
    name: 'tags',
    description: _i18n.i18n.translate('xpack.triggersActionsUI.actionVariables.tagsLabel', {
      defaultMessage: 'The tags of the alert.'
    })
  });
  result.push({
    name: 'alertInstanceId',
    description: _i18n.i18n.translate('xpack.triggersActionsUI.actionVariables.alertInstanceIdLabel', {
      defaultMessage: 'The alert instance id that scheduled actions for the alert.'
    })
  });
  return result;
}