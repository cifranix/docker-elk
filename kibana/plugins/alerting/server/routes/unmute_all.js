"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unmuteAllAlertRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _license_api_access = require("../lib/license_api_access");

var _common = require("../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const paramSchema = _configSchema.schema.object({
  id: _configSchema.schema.string()
});

const unmuteAllAlertRoute = (router, licenseState) => {
  router.post({
    path: `${_common.BASE_ALERT_API_PATH}/{id}/_unmute_all`,
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
      id
    } = req.params;
    await alertsClient.unmuteAll({
      id
    });
    return res.noContent();
  }));
};

exports.unmuteAllAlertRoute = unmuteAllAlertRoute;