"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmuteAlertInstanceRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _license_api_access = require("../lib/license_api_access");

var _common = require("../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const paramSchema = _configSchema.schema.object({
  alertId: _configSchema.schema.string(),
  alertInstanceId: _configSchema.schema.string()
});

const unmuteAlertInstanceRoute = (router, licenseState) => {
  router.post({
    path: `${_common.BASE_ALERT_API_PATH}/{alertId}/alert_instance/{alertInstanceId}/_unmute`,
    validate: {
      params: paramSchema
    },
    options: {
      tags: ['access:alerting-all']
    }
  }, router.handleLegacyErrors(async function (context, req, res) {
    (0, _license_api_access.verifyApiAccess)(licenseState);

    if (!context.alerting) {
      return res.badRequest({
        body: 'RouteHandlerContext is not registered for alerting'
      });
    }

    const alertsClient = context.alerting.getAlertsClient();
    const {
      alertId,
      alertInstanceId
    } = req.params;
    await alertsClient.unmuteInstance({
      alertId,
      alertInstanceId
    });
    return res.noContent();
  }));
};

exports.unmuteAlertInstanceRoute = unmuteAlertInstanceRoute;