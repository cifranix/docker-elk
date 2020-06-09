"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasDeleteActionsCapability = exports.hasDeleteAlertsCapability = exports.hasSaveActionsCapability = exports.hasSaveAlertsCapability = exports.hasShowActionsCapability = exports.hasShowAlertsCapability = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * NOTE: Applications that want to show the alerting UIs will need to add
 * check against their features here until we have a better solution. This
 * will possibly go away with https://github.com/elastic/kibana/issues/52300.
 */
var apps = ['apm', 'siem', 'uptime', 'infrastructure'];

function hasCapability(capabilities, capability) {
  return apps.some(function (app) {
    var _capabilities$app;

    return (_capabilities$app = capabilities[app]) === null || _capabilities$app === void 0 ? void 0 : _capabilities$app[capability];
  });
}

function createCapabilityCheck(capability) {
  return function (capabilities) {
    return hasCapability(capabilities, capability);
  };
}

var hasShowAlertsCapability = createCapabilityCheck('alerting:show');
exports.hasShowAlertsCapability = hasShowAlertsCapability;
var hasShowActionsCapability = createCapabilityCheck('actions:show');
exports.hasShowActionsCapability = hasShowActionsCapability;
var hasSaveAlertsCapability = createCapabilityCheck('alerting:save');
exports.hasSaveAlertsCapability = hasSaveAlertsCapability;
var hasSaveActionsCapability = createCapabilityCheck('actions:save');
exports.hasSaveActionsCapability = hasSaveActionsCapability;
var hasDeleteAlertsCapability = createCapabilityCheck('alerting:delete');
exports.hasDeleteAlertsCapability = hasDeleteAlertsCapability;
var hasDeleteActionsCapability = createCapabilityCheck('actions:delete');
exports.hasDeleteActionsCapability = hasDeleteActionsCapability;